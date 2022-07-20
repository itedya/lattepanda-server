import FormRequest from "@/app/requests/form-request";
import {plainToInstance} from "class-transformer";
import {DeleteArduinoConfigurationDto} from "@/app/dtos/delete-arduino-configuration.dto";
import {validateOrReject, ValidationError} from "class-validator";

export class DeleteArduinoConfigurationRequest extends FormRequest {
    async validate(): Promise<boolean> {
        const {body} = this.req;
        const dto = plainToInstance(DeleteArduinoConfigurationDto, body);

        return validateOrReject(dto)
            .then(() => {
                this.req.validated = dto;
                return true;
            })
            .catch((errors: ValidationError[]) => {
                this.res
                    .json(errors)
                    .status(400);
                return false;
            });
    }
}
