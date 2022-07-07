import Validator from "validatorjs";
import assignEventBusToWebsocket from "../event-bus/assign-event-bus-to-websocket.js";

const assignWebSocketsRoutes = (wsServer) => {
    assignEventBusToWebsocket(wsServer);

    wsServer.on('connection', (ws) => {
        ws.on('message', (data) => {
            try {
                data = JSON.parse(data);

                const validation = new Validator(data, {action: "required|string"});

                if (validation.fails()) {
                    ws.send(JSON.stringify({action: "validation-error", data: validation.errors}));
                    return;
                }

                if (data.action === "ping") {
                    ws.send(JSON.stringify({action: "pong"}));
                } else {
                    ws.send(JSON.stringify({ action: "action-not-defined", data: { actionName: data.action } }));
                }
            } catch (e) {
                console.log("Websocket communication error!", e.message);
            }
        });

        ws.send(JSON.stringify({action: "WELCOME_MESSAGE"}));
    })
}

export default assignWebSocketsRoutes;
