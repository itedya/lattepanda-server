import FormRequest from "@/app/requests/form-request";
import {plainToInstance} from "class-transformer";
import {UpdateArduinoConfigurationDto} from "@/app/dtos/update-arduino-configuration.dto";
import {validateOrReject, ValidationError} from "class-validator";

export class UpdateArduinoConfigurationRequest extends FormRequest {
    async validate(): Promise<boolean> {
        const {body} = this.req;
        const dto = plainToInstance(UpdateArduinoConfigurationDto, body);

        return validateOrReject(dto)
            .then(() => {
                this.req.validated = dto;
                this.next();
                return true;
            })
            .catch((errors: ValidationError[]) => {
                this.res.json(errors).status(400);
                return false;
            });
    }
}
