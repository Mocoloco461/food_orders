const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 3000;
const barcodes = new Map(); // barcode -> timestamp

app.use(morgan('combined'));

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  // send current list
  socket.emit('init', Array.from(barcodes.entries()).map(([code, time]) => ({ code, time })));

  socket.on('barcode', (code) => {
    console.log('Received barcode:', code);
    if (!barcodes.has(code)) {
      const time = new Date().toISOString();
      barcodes.set(code, time);
      io.emit('barcode', { code, time });
      console.log('Stored barcode:', code);
    } else {
      console.log('Duplicate barcode ignored:', code);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
