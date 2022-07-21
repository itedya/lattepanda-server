import {ArduinoConfigurationEntity} from "@/app/entities/arduino-configuration.entity";
import {SerialPort} from "serialport";
import {Job} from "node-schedule";

export class ArduinoSessionEntity {
    public configuration: ArduinoConfigurationEntity;
    public connection: SerialPort;
    public jobs: Job[];
}
