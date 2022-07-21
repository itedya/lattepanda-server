import {SchedulePinoutEntity} from "@/app/entities/pinout.entity";

export class ArduinoConfigurationEntity {
    public uuid: string;
    public name: string;
    public serialportPath: string;
    public pinouts: Array<SchedulePinoutEntity>
}
