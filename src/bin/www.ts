import 'reflect-metadata';
import app from '@/app';
import http from "http";

const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('listening', () => console.log('Listening on port 3000'));
