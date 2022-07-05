import express from 'express';
import {
    createArduinoConfiguration, deleteArduinoConfiguration, getArduinoConfigurations,
} from "../controllers/arduino-configurations.js";
import createArduinoConfigurationValidation from "../validation/arduino-configurations/create.js";
import updateArduinoConfigurationValidation from "../validation/arduino-configurations/update.js";
import deleteArduinoConfigurationValidation from "../validation/arduino-configurations/delete";

const router = express.Router();

router.get('/', getArduinoConfigurations);
router.post('/', createArduinoConfigurationValidation, createArduinoConfiguration);
router.put('/', updateArduinoConfigurationValidation, updateArduinoConfiguration);
router.delete('/', deleteArduinoConfigurationValidation, deleteArduinoConfiguration);

export default router;
