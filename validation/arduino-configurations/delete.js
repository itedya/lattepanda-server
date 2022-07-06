import * as arduinoConfigurationsService from "../../services/arduino-configurations.js";
import Validator from "validatorjs";

const deleteArduinoConfigurationValidation = async (req, res, next) => {
    const uuids = await arduinoConfigurationsService.getArduinoConfigurations()
        .then(res => res.map(ele => ele.uuid));

    const validation = new Validator(req.body, {
        uuid: "required|string|min:36|max:36|in:" + uuids.join(',')
    });

    if (validation.fails()) {
        return res.json(validation.errors.all())
            .status(400);
    }

    next();
}

export default deleteArduinoConfigurationValidation;
