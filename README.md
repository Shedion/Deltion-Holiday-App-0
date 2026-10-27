# Schoolvakantie-app

Een mobiele app, gemaakt met React Native en Expo, die laat zien wanneer de schoolvakanties zijn in jouw regio (Noord, Midden of Zuid). De app gebruikt je GPS-locatie om je regio te bepalen en haalt de actuele vakantiedata op bij de API van de Rijksoverheid.

Schoolproject voor het keuzedeel Mobile App Development, opleiding Software Developer (mbo 4) aan het Deltion College.
## Functies

- **Actuele schoolvakanties**: de vakantiedata komen live van de open data-API van de Rijksoverheid.
- **Regio via GPS**: met `expo-location` bepaalt de app automatisch of je in regio Noord, Midden of Zuid woont.
- **Lokale opslag**: met `AsyncStorage` onthoudt de app je instellingen, ook nadat je hem afsluit.
- **Tabnavigatie**: je wisselt tussen de schermen via tabs onderaan het scherm.
- **Portret en landschap**: de layout past zich aan als je je telefoon draait.

## Gebruikte technieken

- React Native
- Expo
- JavaScript
- `expo-location` voor de GPS-locatie
- `@react-native-async-storage/async-storage` voor lokale opslag
- REST API van de Rijksoverheid ([opendata.rijksoverheid.nl](https://opendata.rijksoverheid.nl))

## Projectstructuur

```
├── assets/     # Afbeeldingen en iconen
├── context/    # Gedeelde state (React Context)
├── screens/    # De schermen van de app
├── App.js      # Startpunt van de app en navigatie
└── app.json    # Expo-configuratie
```

## Zelf draaien

Je hebt [Node.js](https://nodejs.org) nodig en de Expo Go-app op je telefoon.

```bash
git clone https://github.com/Shedion/Deltion-Holiday-App-0.git
cd Deltion-Holiday-App-0
npm install
npx expo start
```

Scan daarna de QR-code met de Expo Go-app.
