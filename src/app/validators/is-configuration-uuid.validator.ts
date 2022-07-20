import {registerDecorator, ValidationOptions} from "class-validator";
import {ArduinoConfigurationsService} from "@/app/services/arduino-configurations.service";

export function IsConfigurationUuid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: "isConfigurationUuid",
            validator: {
                defaultMessage(): string {
                    return propertyName + " must be valid arduino configuration uuid";
                },

                async validate(value: any) {
                    if (typeof value !== "string") return false;

                    const service = ArduinoConfigurationsService.getInstance();

                    return !!service.getByUuid(value);
                }
            },
        });
    };
}
