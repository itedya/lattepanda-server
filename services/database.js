import {JSONFile, Low} from "lowdb";
import path, {join} from "path";
import {fileURLToPath} from 'url';

const file = join(path.dirname(fileURLToPath(import.meta.url)), 'db.json')
const adapter = new JSONFile(file)

let db = null;

/**
 * Creates database instance
 *
 * @returns {Promise<void>}
 */
const initDB = async () => {
    db = new Low(adapter);

    await db.read();
    if (db.data === null) {
        db.data = {arduinoConfigurations: []};
    }
}

/**
 * Provides database
 *
 * @returns {Promise<Low>}
 */
const getDB = async () => {
    if (db === null) await initDB();

    return db;
}

export {getDB}
