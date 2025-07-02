import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './App.css';

// ✅ Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ✅ Data type
type Reading = {
  timestamp: number;
  pressure: number;
  bpm: number;
};

// ✅ Max number of points on chart
const MAX_POINTS = 30;

function App() {
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      try {
        const reading: Reading = JSON.parse(event.data);
        setReadings((prev) => [...prev.slice(-MAX_POINTS + 1), reading]);
      } catch (err) {
        console.error('Invalid data from WebSocket:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => socket.close();
  }, []);

  const labels = readings.map((r) =>
    new Date(r.timestamp).toLocaleTimeString()
  );
  const pressureData = readings.map((r) => r.pressure);
  const bpm = readings.at(-1)?.bpm ?? 0;

  return (
    <div className="App">
      <h1>Ventilator Monitor</h1>
      <p><strong>BPM Mode:</strong> {bpm}</p>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Pressure (mbar)',
              data: pressureData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Real-Time Airway Pressure',
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Pressure (mbar)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Time',
              },
            },
          },
        }}
      />
    </div>
  );
}

export default App;
