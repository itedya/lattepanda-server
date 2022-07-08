class ArduinoSession {
    #config;
    #serialport;

    constructor(config, serialport) {
        this.#config = config;
        this.#serialport = serialport;
    }

    getConfig() {
        return this.#config;
    }

    getSerialport() {
        return this.#serialport;
    }
}

export default ArduinoSession;
