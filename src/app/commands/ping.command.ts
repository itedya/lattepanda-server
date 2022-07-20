import {Command} from "@/app/commands/command";
import {ArduinoSessionEntity} from "@/app/entities/arduino-session.entity";
import {WriteCommand} from "@/app/commands/write.command";

export class PingCommand implements Command<void> {
    constructor(private session: ArduinoSessionEntity) {
    }

    async execute() {
        const writeCommand = new WriteCommand(this.session, "PING", /^PONG$/);
        await writeCommand.execute();
    }
}