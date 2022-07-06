import {getArduinoConfigurations} from "../../services/arduino-configurations.js";
import Validator from "validatorjs";
import * as arduinoConfigurationsService from "../../services/arduino-configurations.js";

const updateArduinoConfigurationValidation = async (req, res, next) => {
    const serialports = await arduinoConfigurationsService.getAvailableSerialPorts()
        .then(res => res.map(ele => ele.path));

    const uuids = await getArduinoConfigurations()
        .then(res => res.map(ele => ele.uuid));

    const validation = new Validator(req.body, {
        uuid: 'required|string|min:36|max:36|in:' + uuids.join(','),
        name: "required|string|min:3|max:64",
        serialport: 'required|string|min:4|max:36|in:' + serialports.join(',')
    });

    if (validation.fails()) {
        return res.json(validation.errors.all())
            .status(400);
    }

    next();
}

export default updateArduinoConfigurationValidation;
