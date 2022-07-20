import {Command} from "@/app/commands/command";
import {ArduinoSessionEntity} from "@/app/entities/arduino-session.entity";
import {eventBus} from "@/app/event-bus";

export class WriteCommand implements Command<string> {
    constructor(private session: ArduinoSessionEntity, private message: string, private matchingRegExp: RegExp) {
    }

    public async execute() {
        const readPromise = new Promise<string>((resolve, reject) => {
            let resolveTimeout: () => void;

            const callback = (message: string, dto: ArduinoSessionEntity) => {
                if (dto.configuration.uuid !== this.session.configuration.uuid) return;

                if (this.matchingRegExp.test(message)) {
                    washUp();
                    resolveTimeout();
                    resolve(message);
                }
            };

            const washUp = () => {
                eventBus.detach('arduino-sessions.raw-read', callback);
            }

            new Promise((resolveTimeout, rejectTimeout) => setTimeout(rejectTimeout, 30000))
                .catch(() => {
                    washUp();
                    reject("Read timeout!");
                });

            eventBus.on('arduino-sessions.raw-read', callback);
        });

        const writePromise = new Promise<void>((resolve, reject) => {
            this.session.connection.write(this.message + "\r\n", "utf8", (error) => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });

        await Promise.all([readPromise, writePromise]);

        return readPromise;
    }
}