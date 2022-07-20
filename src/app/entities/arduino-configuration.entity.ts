import {PinoutEntity} from "@/app/entities/pinout.entity";
import {UpdateArduinoConfigurationDto} from "@/app/dtos/update-arduino-configuration.dto";
import {CreateArduinoConfigurationDto} from "@/app/dtos/create-arduino-configuration.dto";

export class ArduinoConfigurationEntity {
    public uuid: string;
    public name: string;
    public serialportPath: string;
    public pinout: PinoutEntity;

    public static fromCreateDto(createDto: CreateArduinoConfigurationDto): ArduinoConfigurationEntity {
        const dto = new ArduinoConfigurationEntity();
        dto.name = createDto.name;
        dto.serialportPath = createDto.serialportPath;
        dto.pinout = PinoutEntity.fromCreateDto(createDto.pinout);
        return dto;
    }

    public static fromUpdateDto(updateDto: UpdateArduinoConfigurationDto): ArduinoConfigurationEntity {
        const dto = new ArduinoConfigurationEntity();
        dto.uuid = updateDto.uuid;
        dto.name = updateDto.name;
        dto.serialportPath = updateDto.serialportPath;
        dto.pinout = PinoutEntity.fromUpdateDto(updateDto.pinout);
        return dto;
    }
}
