import {SerialPort} from 'serialport';
import {getDB} from "./database.js";
import _ from "lodash";
import {v4} from "uuid";

const getAvailableSerialPorts = async () => {
    const db = await getDB();

    const list = await SerialPort.list();

    return list.filter(ele => {
        return !(!!db.data.arduinoConfigurations.find(dbEle => dbEle.serialport === ele.path));
    });
}

const getArduinoConfigurations = async () => {
    const db = await getDB();

    return db.data.arduinoConfigurations;
}

const getArduinoConfigurationByUuid = async (uuid) => {
    const db = await getDB();

    return db.data.arduinoConfigurations.find(ele => ele.uuid === uuid);
}

const createConfiguration = async (configuration) => {
    const db = await getDB();

    configuration.uuid = v4();

    db.data.arduinoConfigurations.push(configuration);

    await db.write();

    return configuration;
}

const deleteArduinoConfigurationByUuid = async (uuid) => {
    const db = await getDB();

    _.remove(db.data.arduinoConfigurations, (ele) => {
        return ele.uuid === uuid
    });

    await db.write();
}

const updateArduinoConfiguration = async (dto) => {
    const db = await getDB();

    const index = _.findIndex(db.data.arduinoConfigurations, { uuid: dto.uuid });

    db.data.arduinoConfigurations.splice(index, 1, dto);

    await db.write();

    return dto;
}

export {
    getAvailableSerialPorts,
    getArduinoConfigurations,
    getArduinoConfigurationByUuid,
    createConfiguration,
    deleteArduinoConfigurationByUuid,
    updateArduinoConfiguration
}
