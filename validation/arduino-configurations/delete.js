import * as arduinoConfigurationsService from "../../services/arduino-configurations.js";
import yup from "yup";

const deleteArduinoConfigurationValidation = async (req, res, next) => {
    const uuids = await arduinoConfigurationsService.getArduinoConfigurations()
        .then(res => res.map(ele => ele.uuid));

    const schema = yup.object().shape({
        uuid: yup.string().required()
            .matches(new RegExp(`^${uuids.join('|')}$`), {excludeEmptyString: true}),
    });

    const validated = await schema.validate(req.query)
        .then(() => req.body)
        .catch(err => {
            res.json(err.errors);
            return false;
        });

    if (!validated) return;

    req.validated = validated;

    next();
}

export default deleteArduinoConfigurationValidation;
