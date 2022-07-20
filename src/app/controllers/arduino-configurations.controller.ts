import {Request} from "@/interfaces/request";
import {Response} from "express";
import {ArduinoConfigurationsService} from "@/app/services/arduino-configurations.service";
import {CreateArduinoConfigurationDto} from "@/app/dtos/create-arduino-configuration.dto";
import {ArduinoSessionsService} from "@/app/services/arduino-sessions.service";
import {UpdateArduinoConfigurationDto} from "@/app/dtos/update-arduino-configuration.dto";

export class ArduinoConfigurationsController {
    private static instance: ArduinoConfigurationsController;

    public static getInstance(): ArduinoConfigurationsController {
        if (!ArduinoConfigurationsController.instance) {
            ArduinoConfigurationsController.instance = new ArduinoConfigurationsController();
        }

        return ArduinoConfigurationsController.instance;
    }

    private arduinoConfigurationsService: ArduinoConfigurationsService;
    private arduinoSessionsService: ArduinoSessionsService;

    private constructor() {
        this.arduinoConfigurationsService = ArduinoConfigurationsService.getInstance();
        this.arduinoSessionsService = ArduinoSessionsService.getInstance();
    }

    async getSerialports(req: Request, res: Response) {
        res.json(await this.arduinoConfigurationsService.getAvailableSerialPorts())
            .status(200);
    }

    async get(req: Request, res: Response) {
        const configs = this.arduinoConfigurationsService.all();

        res.json(configs)
            .status(200);
    }

    async create(req: Request, res: Response) {
        const validated: CreateArduinoConfigurationDto = req.validated;

        const result = await this.arduinoConfigurationsService.create(validated);

        this.arduinoSessionsService.create(result)
            .catch(err => console.error(err));

        res.json(result)
            .status(201);
    }

    async delete(req: Request, res: Response) {
        const {uuid} = req.validated;

        await this.arduinoSessionsService.close(uuid)
            .catch(err => console.error(err));

        this.arduinoConfigurationsService.delete(uuid);

        res.send().status(204);
    }

    async update(req: Request, res: Response) {
        const dto: UpdateArduinoConfigurationDto = req.validated;

        const result = await this.arduinoConfigurationsService.update(dto);

        await this.arduinoSessionsService.close(result.uuid)
            .catch(err => console.error(err));
        this.arduinoSessionsService.create(result)
            .catch(err => console.error(err));

        res.json(result)
            .status(200);
    }
}
