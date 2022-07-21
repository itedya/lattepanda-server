import express from "express";
import logger from "morgan";
import arduinoConfigurationsRoutes from "@/routes/arduino-configurations.routes";
import schedule from "node-schedule";
import {ArduinoSessionsService} from "@/app/services/arduino-sessions.service";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/arduino-configurations', arduinoConfigurationsRoutes);

(async () => {
    const service = ArduinoSessionsService.getInstance();
    service.initializeSessions();
})();

app.use(function (req, res) {
    res.send().status(404);
});

process.on('SIGINT', function () {
    schedule.gracefulShutdown()
        .then(() => process.exit(0))
});

export default app;
