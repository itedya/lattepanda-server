class ArduinoSession {
    #config;
    #serialport;

    constructor(config, serialport) {
    }

    getConfig() {
        return this.#config;
    }

    getSerialport() {
        return this.#serialport;
    }
}

export default ArduinoSession;
