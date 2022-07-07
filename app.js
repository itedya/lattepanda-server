import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {fileURLToPath} from "url";

import indexRouter from "./routes/index.js";
import arduinoConfigurationsRouter from "./routes/arduino-configurations.js";
import {getArduinoConfigurations} from "./services/arduino-configurations.js";
import {createArduinoSession} from "./services/arduino-sessions.js";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

console.log(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public'));

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

app.use('/', indexRouter);
app.use('/api/arduino-configurations', arduinoConfigurationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

// initialize sessions
getArduinoConfigurations().then(res => res.forEach(ele => createArduinoSession(ele)));

export default app;
