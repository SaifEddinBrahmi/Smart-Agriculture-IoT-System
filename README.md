# 🌾 Smart Agriculture IoT System

A comprehensive IoT agriculture system combining ESP32 sensors, React Native mobile application, and Firebase for real-time remote monitoring and control of irrigation systems.





## 📱 Overview

AgriControl is a comprehensive IoT agriculture system built with ESP32 sensors and a React Native mobile application for remote control and monitoring. Designed for farmers and agricultural professionals, the system provides real-time environmental monitoring with 2-second response time and serves 100+ users.

The mobile app offers an intuitive interface to monitor and control irrigation equipment including pumps, valves, water basins, and soil sensors, with advanced data visualization and scheduling capabilities.

## ✨ Features

### 🌐 IoT Integration
- **ESP32 Sensor Network**: Real-time data collection from IoT sensors
- **2-Second Response Time**: Ultra-fast environmental monitoring
- **100+ Active Users**: Scalable system supporting multiple concurrent users
- **Remote Control**: Manage irrigation equipment from anywhere

### 🔐 Authentication
- Secure user registration and login
- Firebase Authentication integration
- Session persistence
- Multi-user support with isolated data

### 🚰 Equipment Management
- **Pompes (Pumps)**: Monitor and schedule irrigation pumps with customizable periods
- **Vannes (Valves)**: Control and track water valve operations
- **Bassin (Basin)**: Monitor water basin levels and distances
- **Sonde (Probes)**: Track soil conditions with multi-level temperature and humidity sensors

### 📊 Data Visualization
- Real-time data charts for all equipment types
- Historical data tracking
- Interactive chart components
- Visual analytics for better decision-making

### 🌍 Internationalization
- Multi-language support (English/French)
- Runtime language switching
- Comprehensive translation coverage

### 📅 Scheduling
- Date and time pickers for equipment scheduling
- Automated period-based operations
- Start date and time configuration

## 🛠️ Tech Stack

### Mobile Application
- **Framework**: React Native 0.74.5
- **Platform**: Expo SDK 51
- **Navigation**: React Navigation v6
- **Charts**: react-native-chart-kit
- **Internationalization**: i18next, react-i18next
- **Build**: EAS (Expo Application Services)

### Backend & IoT
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **IoT Hardware**: ESP32 Microcontroller
- **Sensors**: Temperature, Humidity, Distance sensors
- **Communication**: Real-time data sync with 2-second response time

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for native builds)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaifEddinBrahmi/Mobil_App.git
   cd "AgriControl Mobile App"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Realtime Database
   - Update `config/firebase.js` with your Firebase credentials

4. **Start the development server**
   ```bash
   npm start
   ```

## 🚀 Running the App

### Development Mode
```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

### Building for Production

#### Android APK (Preview)
```bash
eas build --profile preview --platform android
```

#### Production Build
```bash
eas build --profile production --platform android
```

## 📂 Project Structure

```
AgriControl Mobile App/
├── App.js                      # Root component with navigation
├── app.json                    # Expo configuration
├── package.json               # Dependencies
├── babel.config.js            # Babel configuration
├── eas.json                   # EAS Build configuration
├── i18n.js                    # Internationalization setup
├── assets/                    # Images and icons
├── components/                # React components
│   ├── HomePage.js           # Authentication screen
│   ├── Pompes.js             # Pump management
│   ├── AddPompes.js          # Add pump data
│   ├── DisplayPompes.js      # Display pump list
│   ├── PompesChartsPage.js   # Pump analytics
│   ├── Vannes.js             # Valve management
│   ├── AddVannes.js          # Add valve data
│   ├── DisplayVannes.js      # Display valve list
│   ├── VannesChartsPage.js   # Valve analytics
│   ├── Bassin.js             # Basin monitoring
│   ├── DisplayBassin.js      # Display basin data
│   ├── BassinChartsPage.js   # Basin analytics
│   ├── Sonde.js              # Probe monitoring
│   ├── DisplaySonde.js       # Display probe data
│   ├── SondeChartsPage.js    # Probe analytics
│   ├── ChartComponent.js     # Reusable chart component
│   └── styles.js             # Shared styles
├── config/
│   └── firebase.js           # Firebase configuration
├── resources/                 # Translation files
│   ├── en.js                 # English translations
│   ├── fr.js                 # French translations
│   └── index.js              # Resource exports
└── utils/
    └── firebaseUtils.js      # Firebase helper functions
```

## 🔥 Firebase Database Structure

```
users/
└── {userId}/
    ├── pompes/
    │   └── {pompeId}/
    │       ├── name
    │       ├── period
    │       └── startdate
    ├── vannes/
    │   └── {vanneId}/
    │       ├── name
    │       ├── period
    │       └── startdate
    ├── bassin/
    │   └── {bassinId}/
    │       ├── distance
    │       └── date
    └── sonde/
        └── {sondeId}/
            ├── date
            ├── tempLevel1
            ├── tempLevel2
            ├── tempLevel3
            ├── humLevel1
            ├── humLevel2
            └── humLevel3
```

## 🌐 Supported Languages

- 🇬🇧 English (default)
- 🇫🇷 French

Language can be switched at runtime from the login screen.

## 🎯 Key Achievements

- ✅ **Real-time Monitoring**: 2-second response time for environmental data
- ✅ **Scalable Architecture**: Successfully serving 100+ active users
- ✅ **ESP32 Integration**: Seamless IoT sensor network communication
- ✅ **Remote Control**: Full irrigation system management from mobile device
- ✅ **Multi-level Sensing**: Temperature and humidity monitoring at 3 different soil depths
- ✅ **Multi-language Support**: English and French localization

## 📱 App Features

The mobile application features:
- Clean and intuitive user interface
- Bottom tab navigation for easy access
- Real-time data synchronization with ESP32 sensors
- Interactive charts and graphs for data visualization
- Date/time pickers for equipment scheduling
- Responsive design for various screen sizes
- Automated irrigation control based on sensor data

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project
2. Enable Email/Password authentication
3. Enable Realtime Database
4. Configure database rules for security
5. Update `config/firebase.js` with your credentials

### EAS Build Configuration

The project uses EAS for building:
- **Development**: Development client with internal distribution
- **Preview**: APK builds for testing
- **Production**: Production-ready builds

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is part of the AgriControl ecosystem.



## 👨‍💻 Developer

**Saif Eddine Brahmi**

- **GitHub**: [@SaifEddinBrahmi](https://github.com/SaifEddinBrahmi)
- **Email**: saifeddin.brahmi@ensi-uma.tn

---

## ⭐ Star This Repository

If you find this project useful, please consider giving it a star! It helps others discover this project and motivates continued development.

[![GitHub stars](https://img.shields.io/github/stars/SaifEddinBrahmi/Mobil_App?style=social)](https://github.com/SaifEddinBrahmi/Mobil_App/stargazers)

---

Built with ❤️ using ESP32, React Native, and Firebase | Smart Agriculture IoT System
