import * as arduinoConfigurationsService from "../../services/arduino-configurations.js";
import Validator from 'validatorjs';

const createArduinoConfigurationValidation = async (req, res, next) => {
    const serialports = await arduinoConfigurationsService.getAvailableSerialPorts()
        .then(res => res.map(ele => ele.path));

    const validation = new Validator(req.body, {
        name: 'required|string|min:3|max:64',
        serialport: 'required|string|min:4|max:36|in:' + serialports.join(','),
        pinouts: 'present|array',
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

    next();
}

export default createArduinoConfigurationValidation;
