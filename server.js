const WebSocket = require('ws');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const wss = new WebSocket.Server({ port: 8080 });

// Replace with your COM port (e.g., COM3, COM4)
const serial = new SerialPort('COM3', { baudRate: 9600 });

const parser = serial.pipe(new Readline({ delimiter: '\n' }));

wss.on('connection', (ws) => {
  console.log('Client connected');

  parser.on('data', (data) => {
    try {
      const json = JSON.parse(data);
      ws.send(JSON.stringify(json));
    } catch (err) {
      console.error("Invalid JSON:", err.message);
    }
  });
});
