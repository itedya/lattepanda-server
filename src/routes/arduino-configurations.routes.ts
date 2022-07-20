import express from 'express';
import {ArduinoConfigurationsController} from "@/app/controllers/arduino-configurations.controller";
import formRequestHandler from "@/app/requests/form-request-handler";
import {
    CreateArduinoConfigurationRequest
} from "@/app/requests/arduino-configurations/create-arduino-configuration.request";
import {
    DeleteArduinoConfigurationRequest
} from "@/app/requests/arduino-configurations/delete-arduino-configuration.request";
import {
    UpdateArduinoConfigurationRequest
} from "@/app/requests/arduino-configurations/update-arduino-configuration.request";

const controller = ArduinoConfigurationsController.getInstance();
const router = express.Router();

router.get('/serialports',
    (req, res) => controller.getSerialports(req, res));

router.get('/', (req, res) => controller.get(req, res));

router.post('/', formRequestHandler(CreateArduinoConfigurationRequest),
    (req, res) => controller.create(req, res));

router.put('/', formRequestHandler(UpdateArduinoConfigurationRequest),
    (req, res) => controller.update(req, res));

router.delete('/', formRequestHandler(DeleteArduinoConfigurationRequest),
    (req, res) => controller.delete(req, res));

export default router;
