import eventBus from "./index.js";

const assignEventBusToWebsocket = (wsServer) => {
    const eventNames = [
        'arduino-sessions.connection-failure',
        'arduino-sessions.connection-success',
        'arduino-sessions.connection-closed'
    ];

    eventNames.forEach(eventName => {
        eventBus.on(eventName, (data) => wsServer.clients.forEach(client => {
            client.send(JSON.stringify({action: eventName, data: data.config}));
        }));
    })
}

export default assignEventBusToWebsocket;
