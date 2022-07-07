import { WebSocketServer } from "ws";
import assignWebSocketsRoutes from "./routes/websockets.js";

const addWebsocket = (server) => {
    const wsServer = new WebSocketServer({server});

    assignWebSocketsRoutes(wsServer);
}

export default addWebsocket;
