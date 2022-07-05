class ArduinoConfigurationDto {
    uuid;
    name;
    serialport;

    constructor(data) {
        if (data.uuid) this.uuid = data.uuid;
        if (data.name) this.name = data.name;
        if (data.serialport) this.serialport = data.serialport;
    }
}

export default ArduinoConfigurationDto;
