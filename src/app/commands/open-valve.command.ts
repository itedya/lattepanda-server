import {Command} from "@/app/commands/command";
import {WriteCommand} from "@/app/commands/write.command";
import {ArduinoSessionEntity} from "@/app/entities/arduino-session.entity";

export class OpenValveCommand implements Command<void> {
    constructor(private session: ArduinoSessionEntity, private valve: number) {
    }

    async execute() {
        const message = `OPENVALVE:${this.valve}`
        const regex = new RegExp("OPENVALVE_CALLBACK:" + this.valve)

        const writeCommand = new WriteCommand(this.session, message, regex);
        await writeCommand.execute();
    }
}