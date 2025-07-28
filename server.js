const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 3000;
const barcodes = new Map(); // barcode -> timestamp

app.use(express.static('public'));

io.on('connection', (socket) => {
  // send current list
  socket.emit('init', Array.from(barcodes.entries()).map(([code, time]) => ({ code, time })));

  socket.on('barcode', (code) => {
    if (!barcodes.has(code)) {
      const time = new Date().toISOString();
      barcodes.set(code, time);
      io.emit('barcode', { code, time });
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
