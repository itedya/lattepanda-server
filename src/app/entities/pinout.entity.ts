import PinoutType from "@/app/enums/pinout-type.enum";
import {UpdatePinoutDto} from "@/app/dtos/update-pinout.dto";
import {CreatePinoutDto} from "@/app/dtos/create-pinout.dto";

export class PinoutEntity {
    public type: PinoutType;
    public valves: number[];
    public sensors: number[];

    public static fromCreateDto(createDto: CreatePinoutDto) {
        const dto = new PinoutEntity();
        dto.type = createDto.type;
        dto.valves = createDto.valves;
        dto.sensors = createDto.sensors;
        return dto;
    }

    public static fromUpdateDto(updateDto: UpdatePinoutDto): PinoutEntity {
        const dto = new PinoutEntity();
        dto.type = updateDto.type;
        dto.valves = updateDto.valves;
        dto.sensors = updateDto.sensors;
        return dto;
    }
}
