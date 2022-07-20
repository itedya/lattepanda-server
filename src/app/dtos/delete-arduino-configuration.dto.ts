import {IsNotEmpty, IsUUID} from "class-validator";
import {IsConfigurationUuid} from "@/app/validators/is-configuration-uuid.validator";

export class DeleteArduinoConfigurationDto {
    @IsNotEmpty()
    @IsUUID()
    @IsConfigurationUuid()
    uuid: string;
}
