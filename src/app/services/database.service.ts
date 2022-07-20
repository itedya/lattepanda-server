import Database from "@/interfaces/database";
import {existsSync, readFileSync, writeFileSync} from "fs";

export default class DatabaseService {
    private static instance: DatabaseService;

    public static getInstance() {
        if (!this.instance) this.instance = new DatabaseService();
        return this.instance;
    }

    public data: Database;

    private constructor() {
        this.read();
    }

    public read() {
        if (!existsSync("db.json")) {
            writeFileSync("db.json", JSON.stringify({
                arduinoConfigurations: []
            }));
        }

        const rawData = readFileSync("db.json").toString();
        this.data = JSON.parse(rawData);
    }

    public write() {
        writeFileSync("db.json", JSON.stringify(this.data));
    }
}
