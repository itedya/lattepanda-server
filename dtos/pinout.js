class Pinout {
    /**
     * Pinout type
     *
     * @type {string}
     */
    type;

    /**
     * List of valve pins
     *
     * @type {Array.<number>}
     */
    valves;

    /**
     * List of sensor pins
     *
     * @type {Array.<number>}
     */
    sensors;

    /**
     * Constructor of pinout class
     *
     * @param {Partial<Pinout>} data
     */
    constructor(data) {
        if (data.type) this.type = data.type;
        if (data.valves) this.valves = data.valves;
        if (data.sensors) this.sensors = data.sensors;
    }
}
