import express from 'express';
import * as controller from "../controllers/arduino-configurations.js";
import createArduinoConfigurationValidation from "../validation/arduino-configurations/create.js";
import updateArduinoConfigurationValidation from "../validation/arduino-configurations/update.js";
import deleteArduinoConfigurationValidation from "../validation/arduino-configurations/delete.js";

const router = express.Router();

router.get('/', controller.getArduinoConfigurations);
router.post('/', createArduinoConfigurationValidation, controller.createArduinoConfiguration);
router.put('/', updateArduinoConfigurationValidation, controller.updateArduinoConfiguration);
router.delete('/', deleteArduinoConfigurationValidation, controller.deleteArduinoConfiguration);

export default router;
