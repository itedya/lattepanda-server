import {
    registerDecorator,
    ValidationArguments, ValidationOptions,
} from "class-validator";
import {ArduinoConfigurationsService} from "@/app/services/arduino-configurations.service";

export function IsFreeSerialport(checkUuid?: boolean, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [checkUuid],
            name: "isFreeSerialport",
            validator: {
                defaultMessage(): string {
                    return propertyName + " must be a name of free serialport";
                },
                async validate(value: any, args: ValidationArguments) {
                    if (typeof value !== "string") return false;

                    const service = ArduinoConfigurationsService.getInstance();

                    const availableSerialports = await service.getAvailableSerialPorts();

                    if (args.constraints[0]) {
                        const uuid = (args.object as any)['uuid'];

                        const config = service.getByUuid(uuid);
                        if (!config) return false;

                        if (availableSerialports.map(ele => ele.path).includes(value)) return false;

                        return config.serialportPath === value;
                    }

                    return availableSerialports.map(ele => ele.path).includes(value);
                }
            }
        });
    };
}
