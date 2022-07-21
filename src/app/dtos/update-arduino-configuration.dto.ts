import {UpdatePinoutDto} from "@/app/dtos/update-pinout.dto";
import {IsArray, IsNotEmpty, IsString, IsUUID, Length, ValidateNested} from "class-validator";
import {IsFreeSerialport} from "@/app/validators/is-serialport.validator";
import {IsConfigurationUuid} from "@/app/validators/is-configuration-uuid.validator";
import {Type} from "class-transformer";
import {UpdateSchedulePinoutDto} from "@/app/dtos/update-pinout.dto";

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
    @IsArray()
    @ValidateNested()
    @Type(() => UpdatePinoutDto, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: "type",
            subTypes: [
                {name: "SCHEDULE", value: UpdateSchedulePinoutDto}
            ]
        }
    })
    pinouts: UpdateSchedulePinoutDto[];
}
