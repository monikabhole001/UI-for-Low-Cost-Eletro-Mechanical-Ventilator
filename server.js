const WebSocket = require('ws');
// const { SerialPort } = require('serialport');
//const { ReadlineParser } = require('@serialport/parser-readline');

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

console.log('Mock server running at ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendFakeData = () => {
    const fakeData = {
      pressure: (Math.random() * 100).toFixed(2), // 0–100 mbar
      bpm: [16, 28, 45][Math.floor(Math.random() * 3)], // Randomly choose adult, preschooler, infant
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(fakeData));
  };

  // Send fake data every second
  const interval = setInterval(sendFakeData, 1000);

  // Stop sending if client disconnects
  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

// Configure Serial Port (💡 Replace 'COM3' with your actual COM port)
// const serial = new SerialPort({
  // path: 'COM3',
  // baudRate: 9600,
// });

// Create line-by-line parser for Arduino JSON
// const parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }));

// When WebSocket client connects (your React frontend)
//wss.on('connection', (ws) => {
  //console.log('WebSocket client connected');

  //parser.on('data', (data) => {
    //try {
      //const json = JSON.parse(data); // parse Arduino JSON
      //ws.send(JSON.stringify(json)); // forward to browser UI
    //} catch (err) {
      //console.error('Invalid JSON from Arduino:', err.message);
    //}
  //});
// });
