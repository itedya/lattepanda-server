import _ from "lodash";
import DatabaseService from "@/app/services/database.service";
import {CreateArduinoConfigurationDto} from "@/app/dtos/create-arduino-configuration.dto";
import {ArduinoConfigurationEntity} from "@/app/entities/arduino-configuration.entity";
import {UpdateArduinoConfigurationDto} from "@/app/dtos/update-arduino-configuration.dto";
import {SerialPort} from "serialport";
import {PortInfo} from "@serialport/bindings-cpp";
import {v4} from "uuid";

export class ArduinoConfigurationsService {
    // singleton pattern
    private static instance: ArduinoConfigurationsService;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ArduinoConfigurationsService();
        }

        return this.instance;
    }

    private db: DatabaseService;

    // code
    private constructor() {
        this.db = DatabaseService.getInstance();
    }

    async getAvailableSerialPorts(): Promise<PortInfo[]> {
        const list = await SerialPort.list();

        return list.filter(ele => {
            const searchedConfguration = this.db.data.arduinoConfigurations.find((arduinoConfiguration) => {
                return arduinoConfiguration.serialportPath === ele.path;
            });

            return searchedConfguration === undefined;
        });
    }

    all(): ArduinoConfigurationEntity[] {
        return this.db.data.arduinoConfigurations;
    }

    getByUuid(uuid: string): ArduinoConfigurationEntity | undefined {
        return this.db.data.arduinoConfigurations.find(ele => ele.uuid === uuid);
    }

    create(createDto: CreateArduinoConfigurationDto): ArduinoConfigurationEntity {
        const entity = ArduinoConfigurationEntity.fromCreateDto(createDto);
        entity.uuid = v4();

        this.db.data.arduinoConfigurations.push(entity);

        this.db.write();

        return entity;
    }

    delete(uuid: string): void {
        _.remove(this.db.data.arduinoConfigurations, (ele) => {
            return ele.uuid === uuid;
        });

        this.db.write();
    }

    update(dto: UpdateArduinoConfigurationDto): ArduinoConfigurationEntity {
        const index = _.findIndex(this.db.data.arduinoConfigurations, {uuid: dto.uuid});

        const entity = ArduinoConfigurationEntity.fromUpdateDto(dto);

        this.db.data.arduinoConfigurations.splice(index, 1, entity);

        this.db.write();

        return entity;
    }
}
