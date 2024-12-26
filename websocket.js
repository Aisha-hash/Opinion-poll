import { WebSocketServer } from "ws";

const sockets = {};

const pollResults = {
    Red: 0,
    Blue: 0,
    Green: 0,
    Yellow: 0,
    total: 0
};

const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('listening', () => {
    console.log('Websocket-server is ready and waiting');
});

const broadcastResults = () => {
    const data = JSON.stringify(pollResults);
    wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

wsServer.on('connection', socket => {


    socket.send(JSON.stringify(pollResults));

    socket.on('message', msg => {
        const { vote } = JSON.parse(msg);
        if (pollResults[vote] !== undefined) {
            pollResults[vote]++;
            pollResults.total++
            broadcastResults();
        }
    })
})