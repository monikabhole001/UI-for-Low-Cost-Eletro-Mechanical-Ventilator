#include <ArduinoJson.h>
const int pressurePin = A0;
const int motorPin = 9;
const int buzzerPin = 10;

enum Mode { INFANT, PRESCHOOLER, ADULT };
Mode currentMode = INFANT;

unsigned long lastBreath = 0;
int bpmTarget = 45;
float pressure = 0;

void setup() {
  pinMode(motorPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  switch (currentMode) {
    case INFANT: bpmTarget = 45; break;
    case PRESCHOOLER: bpmTarget = 28; break;
    case ADULT: bpmTarget = 16; break;
  }

  unsigned long interval = 60000 / bpmTarget;
  if (millis() - lastBreath >= interval) {
    digitalWrite(motorPin, HIGH);
    delay(500);
    digitalWrite(motorPin, LOW);
    delay(500);
    lastBreath = millis();
  }

  int sensorValue = analogRead(pressurePin);
  pressure = (sensorValue / 1023.0) * 500;

  StaticJsonDocument<128> doc;
  doc["pressure"] = pressure;
  doc["bpm"] = bpmTarget;
  doc["timestamp"] = millis();
  serializeJson(doc, Serial);
  Serial.println();

  delay(100);
}
