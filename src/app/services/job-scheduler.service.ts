import {scheduleJob} from "node-schedule";
import {OpenValveCommand} from "@/app/commands/open-valve.command";
import {ArduinoSessionEntity} from "@/app/entities/arduino-session.entity";

export class JobSchedulerService {
    private static instance: JobSchedulerService;

    public static getInstance() {
        if (!this.instance) this.instance = new JobSchedulerService();
        return this.instance;
    }

    private constructor() {
    }

    async scheduleJobsForSession(session: ArduinoSessionEntity) {
        const jobs = [];

        for (const pinout of session.configuration.pinouts) {
            for (const time of pinout.times) {
                const job = scheduleJob(time, async () => {
                    const promises = [];

                    for (const valve of pinout.valves) {
                        const openValveCommand = new OpenValveCommand(session, valve);
                        promises.push(openValveCommand.execute());
                    }

                    await Promise.all(promises);
                });

                jobs.push(job);
            }
        }

        return jobs;
    }
}