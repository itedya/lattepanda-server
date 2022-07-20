import {ArduinoConfigurationEntity} from "@/app/entities/arduino-configuration.entity";
import {ArduinoSessionEntity} from "@/app/entities/arduino-session.entity";
import {eventBus} from "@/app/event-bus";
import {SerialPort} from "serialport";
import _ from "lodash";

export class ArduinoSessionsService {
    private static instance: ArduinoSessionsService;

    public static getInstance(): ArduinoSessionsService {
        if (!this.instance) this.instance = new ArduinoSessionsService();
        return this.instance;
    }

    private constructor() {
    }

    private sessions: Array<ArduinoSessionEntity> = [];

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
