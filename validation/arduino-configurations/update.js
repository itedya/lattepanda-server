import {getArduinoConfigurations} from "../../services/arduino-configurations.js";
import yup from "yup";

const updateArduinoConfigurationValidation = async (req, res, next) => {
    const uuids = await getArduinoConfigurations()
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

    next();
}

export default updateArduinoConfigurationValidation;
