import PinoutType from "@/app/enums/pinout-type.enum";
import {IsArray, IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import PinoutTypeEnum from "@/app/enums/pinout-type.enum";

export class UpdatePinoutDto {
    @IsNotEmpty()
    @IsEnum(PinoutTypeEnum)
    type: PinoutType;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    sensors: number[];

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    valves: number[];
}
