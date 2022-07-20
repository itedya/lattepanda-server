import express from "express";
import logger from "morgan";
import arduinoConfigurationsRoutes from "@/routes/arduino-configurations.routes";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/arduino-configurations', arduinoConfigurationsRoutes);

app.use(function (req, res) {
    res.send().status(404);
});

export default app;
