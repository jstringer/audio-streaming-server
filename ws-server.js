const WSServer = require('ws').Server;
const http = require('http');
const app = require('./server');

const server = http.createServer();

const wss = new WSServer({
  server: server
});

server.on('request', app);

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => {
    console.log(`Received ${message}`);
  })
})

server.listen(8080, () => {
  console.log('listening on port 8080');
})