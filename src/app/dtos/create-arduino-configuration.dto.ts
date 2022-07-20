import {CreatePinoutDto} from "@/app/dtos/create-pinout.dto";
import {IsNotEmpty, IsObject, IsString, ValidateNested} from "class-validator";
import {IsFreeSerialport} from "@/app/validators/is-serialport.validator";
import {Type} from "class-transformer";

export class CreateArduinoConfigurationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsFreeSerialport()
    serialportPath: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => CreatePinoutDto)
    pinout: CreatePinoutDto;
}
