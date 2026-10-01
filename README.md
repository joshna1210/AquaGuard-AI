# 🌊 AquaGuard AI

### AI-Powered Water Safety & Environmental Monitoring Platform

AquaGuard AI is an intelligent environmental monitoring platform designed to monitor water-quality and environmental conditions, analyze multi-sensor data, identify potential risks, and provide early-warning insights through an interactive dashboard.

The system combines edge sensing, environmental data processing, AI-based analysis, predictive insights, location-based visualization, multilingual support, and voice assistance into a unified environmental intelligence platform.

---

# 🎯 Problem Statement

Environmental hazards such as water contamination, flooding, air pollution, abnormal weather conditions, and infrastructure disturbances can develop rapidly.

Traditional monitoring systems may rely on individual sensors or manual observation, which can make it difficult to identify relationships between multiple environmental parameters.

AquaGuard AI addresses this by combining multiple environmental data sources and applying intelligent analysis to generate a consolidated environmental risk assessment.

The system focuses on:

- Multi-parameter environmental monitoring
- Water-quality monitoring
- Real-time sensor analysis
- Multi-sensor data fusion
- Anomaly detection
- Risk assessment
- Predictive early warning
- Location-based visualization
- Automated alerts

---

# 💡 Proposed Solution

AquaGuard AI follows an end-to-end environmental intelligence architecture.

```text
Environmental Sensors
        │
        ▼
   Edge Processing
        │
        ▼
 Data Connectivity
        │
        ▼
 Backend Data Layer
        │
        ▼
 AI / ML Analytics
        │
        ▼
 Multi-Sensor Fusion
        │
        ▼
 Anomaly Detection
        │
        ▼
 Risk Scoring
        │
        ▼
 6-Hour Prediction
        │
        ▼
 Risk Classification
        │
        ▼
 Dashboard + Alerts
        │
        ▼
   Early Response
```

---

# 🚀 Key Features

## 🌊 Water Quality Monitoring

AquaGuard AI monitors important water-quality parameters such as:

- pH
- TDS
- Turbidity
- Water level
- Temperature

These readings are analyzed to identify abnormal water conditions.

---

## 🌦️ Environmental Monitoring

The platform can integrate multiple environmental sensors including:

- Temperature
- Humidity
- Atmospheric pressure
- Rainfall
- PM2.5
- PM10
- Smoke
- Gas
- Soil moisture
- Tilt
- Vibration

This allows the system to observe environmental conditions from multiple dimensions.

---

## 📷 ESP32-CAM Edge Vision

The system can use an ESP32-CAM for visual environmental observation.

The camera provides an additional information source that can complement sensor readings.

```text
Sensor Data
     │
     ├──────────────┐
     │              │
     ▼              ▼
Environmental     Camera
 Sensors           Data
     │              │
     └──────┬───────┘
            ▼
      AI Analysis
```

---

## 🛰️ SAR Radar Integration

SAR radar can provide spatial and terrain information that complements conventional camera-based monitoring.

It can be useful for observing environmental and terrain changes where conventional visible-light cameras may have limitations.

SAR data can therefore be treated as an additional sensing layer within the environmental intelligence architecture.

---

# 🧠 AI-Based Multi-Sensor Fusion

AquaGuard AI does not depend on a single sensor.

Instead, multiple environmental readings are combined to generate a consolidated risk assessment.

```text
pH ───────────────┐
TDS ──────────────┤
Turbidity ────────┤
Temperature ──────┤
Rainfall ─────────┤
PM2.5 / PM10 ─────┤
Smoke / Gas ──────┤
Water Level ──────┤
Soil Moisture ────┤
Camera ───────────┤
SAR Radar ────────┤
                   ▼
          Multi-Sensor Fusion
                   │
                   ▼
             Risk Analysis
```

---

# 🔮 Six-Hour Predictive Early Warning

AquaGuard AI includes a predictive-analysis layer designed to estimate environmental risk for the next several hours using historical sensor data.

The prediction process is based on stored sensor history.

```text
Historical Sensor Readings
          │
          ▼
     Data Validation
          │
          ▼
    Feature Preparation
          │
          ▼
   Trend / Pattern Analysis
          │
          ▼
    Predictive Model
          │
          ▼
 Future Risk Estimate
          │
          ▼
   Risk Classification
```

The prediction component uses historical data rather than relying only on the latest sensor reading.

The implementation also uses minimum-history checks so that the system can avoid producing a prediction when insufficient historical data is available.

---

# ⚠️ Risk Classification

AquaGuard AI converts environmental analysis into understandable risk levels.

```text
┌─────────────┐
│   NORMAL    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    WATCH    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   WARNING   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CRITICAL   │
└─────────────┘
```

### NORMAL

Environmental readings are within the expected operating range.

### WATCH

Some parameters require continued observation.

### WARNING

Environmental conditions indicate an elevated risk requiring attention.

### CRITICAL

Multiple indicators suggest a potentially severe environmental condition requiring immediate response.

---

# 🔔 Alert & Response System

When the risk level increases, AquaGuard AI can provide alerts through multiple channels.

```text
AI Risk Engine
      │
      ▼
Risk Classification
      │
      ├───────────────┐
      │               │
      ▼               ▼
Dashboard        Local Warning
Alert             │
      │           ├── OLED
      │           └── Buzzer
      │
      ▼
Notification
      │
      └── SMS
```

The system can provide:

- Dashboard alerts
- SMS notifications
- OLED warnings
- Buzzer alerts

This allows both remote and local response.

---

# 🏗️ Complete System Architecture

```text
┌──────────────────────────────────────────────┐
│              SENSING LAYER                   │
│                                              │
│ ESP32                                        │
│ ESP32-CAM                                    │
│ pH | TDS | Turbidity | Water Level          │
│ DHT22 | BMP280 | PM2.5 | PM10              │
│ MQ2 | MQ135 | Soil Moisture                 │
│ Tilt | Vibration | SAR Radar                │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              EDGE PROCESSING                 │
│                                              │
│ • Sensor Reading                             │
│ • Data Preprocessing                         │
│ • Basic Anomaly Detection                   │
│ • Local Warning Trigger                     │
│ • OLED / Buzzer Control                     │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              CONNECTIVITY                    │
│                                              │
│              MQTT                            │
│                                              │
│       Sensor → Backend                      │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│             BACKEND LAYER                   │
│                                              │
│ • Data Ingestion                            │
│ • Data Storage                              │
│ • Sensor History                            │
│ • Alert Management                          │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│             AI / ML LAYER                   │
│                                              │
│ • Multi-Sensor Fusion                       │
│ • Anomaly Detection                         │
│ • Risk Scoring                              │
│ • Historical Trend Analysis                 │
│ • Predictive Analysis                       │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│             RISK ENGINE                     │
│                                              │
│ NORMAL → WATCH → WARNING → CRITICAL         │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│            APPLICATION LAYER                │
│                                              │
│ React + TypeScript Dashboard                │
│                                              │
│ • Live Monitoring                           │
│ • Risk Visualization                        │
│ • Maps                                      │
│ • Analytics                                 │
│ • Alerts                                    │
│ • Predictions                               │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              RESPONSE LAYER                 │
│                                              │
│ Dashboard | SMS | OLED | Buzzer             │
└──────────────────────────────────────────────┘
```

---

# ⚙️ Implementation

## 1. Edge Sensing

The edge layer is based around an ESP32 controller.

The ESP32 collects readings from connected environmental sensors.

Example sensor categories include:

```text
Water Sensors
├── pH
├── TDS
└── Turbidity

Weather Sensors
├── DHT22
├── BMP280
└── Rain Sensor

Air Sensors
├── PM2.5
├── PM10
├── MQ2
└── MQ135

Ground / Structural Sensors
├── Soil Moisture
├── Tilt
└── Vibration

Vision
└── ESP32-CAM
```

The ESP32 performs initial processing before forwarding sensor information to the backend.

---

## 2. Edge Preprocessing

Raw sensor readings may contain noise or abnormal values.

The edge layer can perform:

- Reading validation
- Basic filtering
- Data formatting
- Initial anomaly checks
- Local warning conditions

The ESP32 can also trigger local warning devices.

```text
Sensor Reading
      │
      ▼
Validation
      │
      ▼
Preprocessing
      │
      ▼
Anomaly Check
      │
      ├──── Normal ────► Send Data
      │
      └──── Abnormal ──► Local Warning
```

---

## 3. Local Warning System

The ESP32 can control:

### OLED

Displays local sensor or warning information.

### Buzzer

Provides an immediate audible warning when critical conditions are detected.

```text
ESP32
  │
  ├──► OLED
  │
  └──► Buzzer
```

This allows warnings even when the user is not actively viewing the dashboard.

---

## 4. MQTT Connectivity

Sensor information is transmitted from the edge layer using MQTT.

```text
ESP32
  │
  │ MQTT
  ▼
MQTT Broker
  │
  ▼
Backend
```

MQTT provides a lightweight communication mechanism suitable for sensor data transmission.

---

## 5. Backend Data Ingestion

The backend receives sensor readings from the edge layer.

The ingestion process follows:

```text
MQTT Sensor Data
       │
       ▼
Data Reception
       │
       ▼
Validation
       │
       ▼
Storage
       │
       ▼
AI Processing
```

Historical readings are stored so that the prediction system can analyze previous environmental behavior.

---

## 6. Historical Sensor Database

AquaGuard AI maintains historical sensor readings for analysis.

The stored data can contain values such as:

```text
Timestamp
pH
TDS
Turbidity
Temperature
Humidity
Pressure
Rainfall
PM2.5
PM10
Smoke
Gas
Water Level
Soil Moisture
Tilt
Vibration
```

Historical data supports:

- Trend analysis
- Anomaly detection
- Risk scoring
- Predictive analysis

---

## 7. AI Risk Engine

The AI layer combines multiple sensor values instead of evaluating each sensor independently.

```text
Multiple Sensor Readings
          │
          ▼
   Data Normalization
          │
          ▼
    Feature Analysis
          │
          ▼
   Multi-Sensor Fusion
          │
          ▼
    Risk Calculation
          │
          ▼
 Risk Score + Risk Level
```

The final result is represented as:

```text
NORMAL
WATCH
WARNING
CRITICAL
```

---

## 8. Anomaly Detection

The system analyzes sensor values and identifies unusual environmental conditions.

For example:

```text
Normal Water Level
        │
        ▼
Sudden Increase
        │
        ▼
Anomaly Detected
        │
        ▼
Risk Score Increased
```

Anomaly detection can be combined with other sensor signals to reduce reliance on a single reading.

---

## 9. Multi-Sensor Verification

AquaGuard AI can use multiple signals to verify potentially dangerous conditions.

For example:

```text
Heavy Rain
    +
Rising Water Level
    +
Soil Moisture Increase
    +
Tilt / Vibration Change
    │
    ▼
Higher Confidence Environmental Risk
```

This approach helps reduce false alarms caused by an isolated sensor reading.

---

## 10. Predictive Model

The prediction layer uses historical sensor data.

The implementation uses minimum data requirements before generating a forecast.

Conceptually:

```text
Historical Readings
       │
       ▼
Check Data Availability
       │
       ├── Insufficient History
       │          │
       │          ▼
       │    No Forecast
       │
       └── Sufficient History
                  │
                  ▼
            Build Features
                  │
                  ▼
             Run Model
                  │
                  ▼
          Future Risk Estimate
```

This conservative approach prevents the system from producing a forecast when there is not enough historical information.

---

# 📊 Dashboard Implementation

The frontend is implemented as a modern web dashboard using:

- React
- TypeScript
- Vite
- Tailwind CSS
- Component-based UI

The dashboard can present:

```text
┌─────────────────────────────────────┐
│          AQUAGUARD AI               │
├─────────────────────────────────────┤
│                                     │
│  Risk Level      Sensor Status      │
│                                     │
│  NORMAL          pH      7.1        │
│  WATCH           TDS     420        │
│  WARNING         Temp    28°C       │
│                                     │
├─────────────────────────────────────┤
│        Environmental Map            │
├─────────────────────────────────────┤
│        Sensor Analytics             │
├─────────────────────────────────────┤
│        Predictions & Alerts         │
└─────────────────────────────────────┘
```

---

# 🗺️ Location Visualization

Environmental sensor nodes can be associated with geographic locations.

The dashboard can display:

- Sensor locations
- Risk status
- Environmental conditions
- Alert locations
- Regional risk information

Conceptually:

```text
Sensor Node
    │
    ▼
Latitude / Longitude
    │
    ▼
Map Visualization
    │
    ▼
Environmental Risk
```

---

# 🌐 Multilingual Implementation

The frontend includes multilingual support to improve accessibility.

The language layer can translate:

- Dashboard labels
- Alerts
- Sensor descriptions
- Risk information
- User interface text

This makes environmental information more accessible to users from different linguistic backgrounds.

---

# 🎙️ Voice Assistance

Voice interaction can be used to provide environmental information through spoken interaction.

Example flow:

```text
User Voice Input
       │
       ▼
Speech Processing
       │
       ▼
Environmental Query
       │
       ▼
System Response
       │
       ▼
Voice Output
```

---

# 🔔 Alert Implementation

Alerts are generated from the risk engine.

```text
Sensor Data
    │
    ▼
AI Analysis
    │
    ▼
Risk Score
    │
    ▼
Risk Level
    │
    ├── NORMAL
    │
    ├── WATCH
    │
    ├── WARNING
    │
    └── CRITICAL
             │
             ▼
       Alert Generation
             │
       ┌─────┴─────┐
       ▼           ▼
   Dashboard      SMS
       │
       ▼
 Local OLED / Buzzer
```

---

# 📱 Edge-to-Dashboard Data Flow

The complete implementation can be represented as:

```text
┌──────────────┐
│   Sensors    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    ESP32     │
└──────┬───────┘
       │
       ├────► OLED
       │
       └────► Buzzer
       │
       ▼
┌──────────────┐
│     MQTT     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Backend    │
└──────┬───────┘
       │
       ├────► Database
       │
       ▼
┌──────────────┐
│   AI Engine  │
└──────┬───────┘
       │
       ├────► Anomaly Detection
       ├────► Risk Scoring
       └────► Prediction
       │
       ▼
┌──────────────┐
│   Dashboard  │
└──────┬───────┘
       │
       ├────► Maps
       ├────► Analytics
       ├────► Alerts
       └────► Predictions
```

---

# 🛠️ Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Component-based UI

## Hardware

- ESP32
- ESP32-CAM
- pH Sensor
- TDS Sensor
- Turbidity Sensor
- DHT22
- BMP280
- Rain Sensor
- PM2.5 / PM10 Sensors
- MQ2 / MQ135
- Soil Moisture Sensor
- Tilt Sensor
- Vibration Sensor
- OLED Display
- Buzzer
- SAR Radar

## Communication

- MQTT
- Wi-Fi / available edge connectivity

## Backend

- Python-based backend components
- Sensor data ingestion
- Historical data storage
- Risk processing
- Prediction services

## AI / ML

- Multi-Sensor Data Fusion
- Anomaly Detection
- Risk Scoring
- Predictive Analytics
- Time-Series Analysis

## Notifications

- SMS
- OLED
- Buzzer
- Dashboard Alerts

---

# 📂 Project Structure

```text
AquaGuard-AI/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── assets/
│   └── ...
│
├── .gitignore
├── README.md
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.node.json
```

---

# ⚙️ Installation & Setup

## Prerequisites

Install:

- Node.js
- npm
- Git
- Visual Studio Code

Check the installation:

```bash
node --version
```

```bash
npm --version
```

```bash
git --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/joshna1210/AquaGuard-AI.git
```

---

## 2. Navigate to the Project

```bash
cd AquaGuard-AI
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start the Frontend

```bash
npm run dev
```

Vite will display the local development URL.

Usually:

```text
http://localhost:5173
```

---

# 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🧪 Development

Start development:

```bash
npm run dev
```

The Vite development server supports Hot Module Replacement, allowing frontend changes to appear without restarting the development server.

---

# 🔐 Security & Privacy

Environmental systems may process sensor, location, and user-related information.

Recommended security practices include:

- Never commit API keys.
- Never commit passwords or tokens.
- Store secrets in environment variables.
- Validate sensor data.
- Secure communication between edge devices and backend services.
- Protect location information.
- Authenticate backend services where required.
- Regularly update dependencies.

---

# 🎯 Project Objectives

The primary objectives of AquaGuard AI are:

1. Monitor water-quality conditions.
2. Monitor environmental parameters.
3. Collect data from multiple sensors.
4. Process environmental data at the edge.
5. Combine multiple sensor readings.
6. Detect environmental anomalies.
7. Calculate environmental risk.
8. Predict potential future risks.
9. Provide early-warning notifications.
10. Visualize environmental conditions through an interactive dashboard.
11. Support location-based environmental monitoring.
12. Provide accessible multilingual and voice-based interaction.

---

# 🌍 Potential Applications

AquaGuard AI can be explored for:

- 💧 Water-quality monitoring
- 🌊 Flood-risk awareness
- 🌧️ Environmental monitoring
- 🌱 Agricultural monitoring
- 🏭 Industrial environmental monitoring
- 🏘️ Community environmental safety
- 🏙️ Smart-city environmental monitoring
- 🚨 Early-warning systems
- 📊 Environmental intelligence

---

# 🚀 Future Enhancements

Potential improvements include:

- 📱 Dedicated mobile application
- 🛰️ Advanced SAR-based monitoring
- 📡 LoRa-based remote sensor networks
- 🤖 Improved deep-learning models
- 🔮 More advanced multi-hour prediction
- 🗺️ Advanced geospatial analytics
- 📊 Expanded environmental dashboards
- 🔔 Intelligent alert escalation
- ☀️ Solar-powered sensor nodes
- 🔋 Battery-aware edge processing
- 🌐 Large-scale sensor deployment
- 🧠 Collaborative edge intelligence
- 🔐 Secure environmental-data management

---

# 🛠️ Troubleshooting

## Node.js Not Found

Check:

```bash
node --version
```

Install Node.js if it is unavailable and restart your terminal.

---

## npm Installation Error

Try:

```bash
npm cache verify
```

Then:

```bash
npm install
```

---

## Development Server Does Not Start

Make sure you are inside:

```text
AquaGuard-AI/
```

Then:

```bash
npm run dev
```

---

## Port Already in Use

If port `5173` is already occupied, Vite can use another available port. Check the terminal output for the actual local URL.

---

# 📌 Project Information

**Project Name:** AquaGuard AI

**Category:** Artificial Intelligence / Environmental Technology

**Application Area:** Water Safety & Environmental Monitoring

**Frontend:** React + TypeScript

**Build Tool:** Vite

**Styling:** Tailwind CSS

**Communication:** MQTT

**Edge Controller:** ESP32

**AI Components:** Multi-Sensor Fusion · Anomaly Detection · Risk Scoring · Predictive Analytics

**Repository:**

https://github.com/joshna1210/AquaGuard-AI

---

# 👩‍💻 Developer

## Joshna Rose J.N

**B.E. Computer Science Engineering – Cyber Security**  
**St. Joseph's College of Engineering**

### Areas of Interest

- 🔐 Cyber Security
- 🤖 Artificial Intelligence
- 🧠 Machine Learning
- 🌐 Full-Stack Development
- 🌍 Environmental Intelligence
- 📊 Data Analytics
- ☁️ Cloud Computing
- 🎨 UI/UX

---

# 📫 Connect With Me

📧 **Email:**  
joshna.rose9486@gmail.com

🔗 **LinkedIn:**  
https://www.linkedin.com/in/joshna-rose-992ba2329/

💻 **GitHub:**  
https://github.com/joshna1210

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for the full license text.

---

## ⭐ Support

If you find AquaGuard AI interesting, consider giving the repository a ⭐ on GitHub.

Thank you for visiting **AquaGuard AI**! 🌊🤖
