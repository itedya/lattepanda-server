import * as arduinoConfigurationsService from "../services/arduino-configurations.js";
import * as arduinoServicesService from "../services/arduino-sessions.js";
import ArduinoConfigurationDto from "../dtos/arduino-configuration.js";

const getArduinoConfigurations = async (req, res) => {
    const configs = await arduinoConfigurationsService.getArduinoConfigurations();

    res.json(configs)
        .status(200);
}

const createArduinoConfiguration = async (req, res) => {
    const dto = new ArduinoConfigurationDto(req.body);

    const result = await arduinoConfigurationsService.createConfiguration(dto);

    arduinoServicesService.createArduinoSession(result);

    res.json(result)
        .status(201);
}

const deleteArduinoConfiguration = async (req, res) => {
    const {uuid} = req.body;

    await arduinoServicesService.closeArduinoSession(uuid);

    await arduinoConfigurationsService.deleteArduinoConfigurationByUuid(uuid);

    res.send().status(204);
}

const updateArduinoConfiguration = async (req, res) => {
    const dto = new ArduinoConfigurationDto(req.body);

    const result = await arduinoConfigurationsService.updateArduinoConfiguration(dto);

    await arduinoServicesService.closeArduinoSession(result);
    arduinoServicesService.createArduinoSession(result);

    res.json(result)
        .status(200);
}

export {
    createArduinoConfiguration,
    deleteArduinoConfiguration,
    getArduinoConfigurations,
    updateArduinoConfiguration
}
