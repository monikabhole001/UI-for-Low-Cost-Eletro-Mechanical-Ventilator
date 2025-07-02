# 💨 UI for Low-Cost Electro-Mechanical Ventilator

[![IEEE YESIST12 2020 - Honorable Mention](https://img.shields.io/badge/Award-IEEE%20YESIST12%202020%20Honorable%20Mention-blue)](#)
[![Made-With](https://img.shields.io/badge/Made%20With-React--TS%2C%20Arduino%2C%20Node.js-blueviolet)](#)

An interactive, real-time UI dashboard for a low-cost ventilator using Arduino, React, and Node.js WebSocket server. Designed to support medical monitoring through waveform visualization of airway pressure and BPM.

---

## 🛠️ Features

- Real-time sensor data streaming from Arduino over serial
- WebSocket server pushing live updates to React frontend
- Chart.js-based waveform of airway pressure
- BPM mode display for Infant, Pre-schooler, Adult
- Optionally runs mock server for frontend testing

---

### 🎖️ IEEE YESIST12 2020 (WePOWER Track) – Honorable Mention  
Low-Cost Electro-Mechanical Ventilator presented at IEEE YESIST12 Finals.

![Certificate](./assets/honorable-mention.jpg)

### ⚙️ Hardware Prototype

![Prototype](./assets/prototype.jpg)

### 💻 Demo Snapshot

![Demo](./assets/demo.jpg)


---

## 🧰 Tech Stack

- **Frontend**: React + TypeScript + Vite + Chart.js
- **Backend**: Node.js + WebSocket
- **Microcontroller**: Arduino (ATmega328P)
- **Serial Communication**: serialport package

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/monikabhole001/UI-for-Low-Cost-Eletro-Mechanical-Ventilator.git
cd UI-for-Low-Cost-Eletro-Mechanical-Ventilator

