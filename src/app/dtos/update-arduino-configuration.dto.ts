import {UpdatePinoutDto} from "@/app/dtos/update-pinout.dto";
import {IsNotEmpty, IsObject, IsString, IsUUID, Length, ValidateNested} from "class-validator";
import {IsFreeSerialport} from "@/app/validators/is-serialport.validator";
import {IsConfigurationUuid} from "@/app/validators/is-configuration-uuid.validator";
import {Type} from "class-transformer";

export class UpdateArduinoConfigurationDto {
    @IsNotEmpty()
    @IsUUID()
    @IsConfigurationUuid()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 64)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @IsFreeSerialport(true)
    public serialportPath: string;

    @IsNotEmpty()
    @IsObject()
    @Type(() => UpdatePinoutDto)
    @ValidateNested()
    public pinout: UpdatePinoutDto;
}
