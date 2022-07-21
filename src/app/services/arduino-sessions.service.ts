import {ArduinoConfigurationEntity} from "@/app/entities/arduino-configuration.entity";
import {ArduinoSessionEntity} from "@/app/entities/arduino-session.entity";
import {eventBus} from "@/app/event-bus";
import {ReadlineParser, SerialPort} from "serialport";
import _ from "lodash";
import {ArduinoConfigurationsService} from "@/app/services/arduino-configurations.service";
import {JobSchedulerService} from "@/app/services/job-scheduler.service";

export class ArduinoSessionsService {
    private static instance: ArduinoSessionsService;

    public static getInstance(): ArduinoSessionsService {
        if (!this.instance) this.instance = new ArduinoSessionsService();
        return this.instance;
    }

    private arduinoConfigurationsService: ArduinoConfigurationsService
    private jobSchedulerService: JobSchedulerService;

    private constructor() {
        this.arduinoConfigurationsService = ArduinoConfigurationsService.getInstance();
        this.jobSchedulerService = JobSchedulerService.getInstance();
    }

    private sessions: Array<ArduinoSessionEntity> = [];

    async initializeSessions() {
        for (const config of this.arduinoConfigurationsService.all()) {
            const session = await this.create(config);

            for (const pinout of config.pinouts) {
                if (pinout.type === "SCHEDULE") {
                    await this.jobSchedulerService.scheduleJobsForSession(session);
                } else {
                    console.error("Unknown pinout type!");
                }
            }
        }
    }

    async create(config: ArduinoConfigurationEntity): Promise<ArduinoSessionEntity> {
        return new Promise((resolve, reject) => {
            const serialport = new SerialPort({
                path: config.serialportPath,
                baudRate: 9600,
                autoOpen: false
            }, (error) => {
                const dto = new ArduinoSessionEntity();
                dto.configuration = config;
                dto.connection = serialport;

                this.assignReadPipe(dto);
                this.jobSchedulerService.scheduleJobsForSession(dto);

                this.sessions.push(dto);

                if (error) {
                    eventBus.emit('arduino-sessions.connection-failure', dto);
                    console.log("Connection failure to serialport " + serialport.path + "!", error);
                    reject(error);
                }

                eventBus.emit('arduino-sessions.connection-success', dto);
                resolve(dto);
            });
        });
    }

    private assignReadPipe(dto: ArduinoSessionEntity) {
        const parser = dto.connection.pipe(new ReadlineParser({delimiter: '\r\n'}));

        parser.on('data', (data) => {
            eventBus.emit('arduino-sessions.raw-read', {}, data, dto);
        });
    }

    getByConfigUuid(configUuid: string): ArduinoSessionEntity | null {
        const index = _.findIndex(this.sessions, (ele) => {
            return ele.configuration.uuid === configUuid;
        })

        if (index == -1) return null;

        return this.sessions[index];
    }

    // todo: this func should throw custom-made error
    async close(configUuid: string): Promise<void> {
        const session = this.getByConfigUuid(configUuid);

        if (session == null) {
            throw new Error("Sesison with this config uuid does not exist!");
        }

        if (session.connection.isOpen) {
            await new Promise((resolve, reject) => {
                session.connection.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(null);
                    }
                });
            });
        }
    }
}
