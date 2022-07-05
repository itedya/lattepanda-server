import * as arduinoConfigurationsService from "../../services/arduino-configurations.js";
import yup from "yup";

const createArduinoConfigurationValidation = async (req, res, next) => {
    const serialports = await arduinoConfigurationsService.getAvailableSerialPorts()
        .then(res => res.map(ele => ele.path));

    let schema = yup.object().shape({
        name: yup.string().required(),
        serialport: yup.string().required()
            .matches(new RegExp(`^${serialports.join('|')}$`), {excludeEmptyString: true}),
    });

    const validated = await schema.validate(req.body)
        .then(() => req.body)
        .catch(err => {
            res.json(err.errors);
            return false;
        });

    if (!validated) return;

    req.validated = validated;

    next();
}

export default createArduinoConfigurationValidation;
