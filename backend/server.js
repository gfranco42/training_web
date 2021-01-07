const http = require('http');

const app = require('./app.js');

app.set('port', 9000);

const server = http.createServer(app);

server.listen(9000);