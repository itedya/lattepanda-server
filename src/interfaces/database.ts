import {ArduinoConfigurationEntity} from "@/app/entities/arduino-configuration.entity";

export default interface Database {
    arduinoConfigurations: ArduinoConfigurationEntity[];
}
