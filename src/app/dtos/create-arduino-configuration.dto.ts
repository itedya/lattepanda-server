import {IsArray, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {IsFreeSerialport} from "@/app/validators/is-serialport.validator";
import {CreatePinoutDto, CreateSchedulePinoutDto} from "@/app/dtos/create-pinout.dto";
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
    @IsArray()
    @ValidateNested()
    @Type(() => CreatePinoutDto, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: "type",
            subTypes: [
                {name: "SCHEDULE", value: CreateSchedulePinoutDto}
            ]
        }
    })
    pinouts: CreateSchedulePinoutDto[];
}
