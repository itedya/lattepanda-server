import {SerialPort} from "serialport";
import eventBus from "../event-bus/index.js";
import ArduinoSession from "../dtos/arduino-session.js";

/**
 * Sessions storage
 *
 * @type {Object.<string, ArduinoSession>}
 */
const sessions = {};

/**
 * Get uuids of open sessions' configs
 *
 * @return {Array<string>} list of uuids
 */
const getUuidsOfOpenSessionsConfigs = () => {
    return Object.keys(sessions);
}

/**
 * Creates arduino session from Arduino Configuration DTO
 *
 * @param {ArduinoConfigurationDto} config Arduino Configuration DTO
 * @returns {Promise<undefined>} undefined promise
 */
const createArduinoSession = async (config) => {
    const serialport = new SerialPort({path: config.serialport, baudRate: 9600, autoOpen: false});

    const dto = new ArduinoSession(config, serialport);

    sessions[config.uuid] = dto;

    return new Promise(resolve => serialport.open((err) => {
        if (err) {
            eventBus.emit('arduino-sessions.connection-failure', dto);
            console.log("Connection failure to serialport " + serialport.path + "!", err);
            closeArduinoSession(config.uuid);
            return resolve();
        }

        eventBus.emit('arduino-sessions.connection-success', dto);
        resolve();
    }))
}

/**
 * Closes arduino session, identifies what session to close by provided Arduino Configuration DTO's uuid
 *
 * @param {string} uuid Arduino Configuration DTO's uuid
 */
const closeArduinoSession = (uuid) => {
    const session = sessions[uuid];
    if (!session) return;

    const serialport = session.getSerialport();

    if (serialport.isOpen) {
        serialport.close();
    }

    eventBus.emit('arduino-sessions.connection-closed', {config: session.getConfig()});

    delete (session[uuid]);
}

/**
 * Gets Arduino Session's Serialport connection by Arduino Configuration DTO uuid
 *
 * @param uuid Arduino Configuraiton DTO uuid
 * @returns {SerialPort|null} Arduino Session's Serialport or null if does not exist
 */
const getArduinoSession = (uuid) => {
    const sessionData = sessions[uuid];
    if (sessionData === undefined) return null;

    const {session} = sessionData;

    return session;
}

export {
    createArduinoSession,
    closeArduinoSession,
    getArduinoSession,
    getUuidsOfOpenSessionsConfigs
}
