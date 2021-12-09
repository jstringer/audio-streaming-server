const WSServer = require('ws').Server;
const http = require('http');
const app = require('./server');
const sqlite3 = require('sqlite3');

const server = http.createServer();
const wss = new WSServer({
  server: server
});

//Mount Express app to http server to handle REST endpoints
server.on('request', app);

wss.on('connection', ws => {
  console.log('Client connected');
  
  const db = new sqlite3.Database('./db/tracks.db');
  const metadata = [];
  db.all('SELECT name, artist FROM tracks', [], (err, rows) => {
    if (err) {
      ws.send(JSON.stringify(err));
    }
    else {
      rows.forEach((row) => {
        metadata.push({ 'name': row.name, 'artist': row.artist });
      });
      ws.send(JSON.stringify(metadata));
    }
  })

  ws.on('message', message => {
    console.log(`Received ${message}`);
  })
})

server.listen(8080, () => {
  console.log('listening on port 8080');
})