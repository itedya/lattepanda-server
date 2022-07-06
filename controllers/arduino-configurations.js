import * as arduinoConfigurationsService from "../services/arduino-configurations.js";
import ArduinoConfigurationDto from "../dtos/arduino-configuration.js";

const getArduinoConfigurations = async (req, res) => {
    const configs = await arduinoConfigurationsService.getArduinoConfigurations();

    res.json(configs)
        .status(200);
}

const createArduinoConfiguration = async (req, res) => {
    const dto = new ArduinoConfigurationDto(req.body);

    const result = await arduinoConfigurationsService.createConfiguration(dto);

    res.json(result)
        .status(201);
}

const deleteArduinoConfiguration = async (req, res) => {
    const {uuid} = req.body;

    await arduinoConfigurationsService.deleteArduinoConfigurationByUuid(uuid);

    res.send().status(200);
}

const updateArduinoConfiguration = async (req, res) => {
    const dto = new ArduinoConfigurationDto(req.body);

    const result = await arduinoConfigurationsService.updateArduinoConfiguration(dto);

    res.json(result)
        .status(200);
}

export {
    createArduinoConfiguration,
    deleteArduinoConfiguration,
    getArduinoConfigurations,
    updateArduinoConfiguration
}
