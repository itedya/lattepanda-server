class ArduinoConfigurationDto {
    /**
     * Auto-Generated UUID
     *
     * @type {string}
     */
    uuid;

    /**
     * Configuration name
     *
     * @type {string}
     */
    name;

    /**
     * Serialport name
     *
     * @type {string}
     */
    serialport;

    /**
     * Pinout configuration
     *
     * @type {Array.<Pinout>}
     */
    pinouts;

    /**
     * Constructor
     *
     * @param {Partial<ArduinoConfigurationDto>} data
     */
    constructor(data) {
        if (data.uuid) this.uuid = data.uuid;
        if (data.name) this.name = data.name;
        if (data.serialport) this.serialport = data.serialport;
        if (data.pinouts) this.pinouts = data.pinouts;
    }
}

export default ArduinoConfigurationDto;
