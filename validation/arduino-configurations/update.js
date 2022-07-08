import {getArduinoConfigurations} from "../../services/arduino-configurations.js";
import Validator from "validatorjs";
import * as arduinoConfigurationsService from "../../services/arduino-configurations.js";

const updateArduinoConfigurationValidation = async (req, res, next) => {
    const uuids = await getArduinoConfigurations()
        .then(res => res.map(ele => ele.uuid));

    let validation = new Validator(req.body, {
        uuid: 'required|string|min:36|max:36|in:' + uuids.join(','),
        name: "required|string|min:3|max:64",
        pinouts: 'required|array',
        'pinouts.*.type': 'required|string|in:SCHEDULE,SENSOR',
        'pinouts.*.valves': 'present|array',
        'pinouts.*.valves.*': 'required|integer|min:1|max:99',
        'pinouts.*.sensors': 'present|array',
        'pinouts.*.sensors.*': 'required|integer|min:1|max:99'
    });

    if (validation.fails()) {
        return res.json(validation.errors.all())
            .status(400);
    }

    const serialports = await arduinoConfigurationsService.getAvailableSerialPorts()
        .then(res => res.map(ele => ele.path));

    await arduinoConfigurationsService.getArduinoConfigurationByUuid(req.body.uuid)
        .then(config => serialports.push(config.serialport));

    validation = new Validator(req.body, {
        serialport: 'required|string|min:4|max:36|in:' + serialports.join(','),
    });

    if (validation.fails()) {
        return res.json(validation.errors.all())
            .status(400);
    }

    next();
}

export default updateArduinoConfigurationValidation;
