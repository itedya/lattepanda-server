import {ArduinoConfigurationEntity} from "@/app/entities/arduino-configuration.entity";
import {SerialPort} from "serialport";

export class ArduinoSessionEntity {
    public configuration: ArduinoConfigurationEntity;
    public connection: SerialPort;
}
