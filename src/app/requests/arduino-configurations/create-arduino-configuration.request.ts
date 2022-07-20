import FormRequest from "@/app/requests/form-request";
import {plainToInstance} from "class-transformer";
import {CreateArduinoConfigurationDto} from "@/app/dtos/create-arduino-configuration.dto";
import {validateOrReject, ValidationError} from "class-validator";

export class CreateArduinoConfigurationRequest extends FormRequest {
    public async validate() {
        const {body} = this.req;
        const instance = plainToInstance(CreateArduinoConfigurationDto, body);

        return validateOrReject(instance)
            .then(() => {
                this.req.validated = instance;
                return true;
            })
            .catch((error: ValidationError[]) => {
                this.res
                    .json(error)
                    .status(400);
                return false;
            });
    }
}
