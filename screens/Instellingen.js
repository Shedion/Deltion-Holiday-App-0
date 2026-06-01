import { View, Text, Button, Alert, useWindowDimensions } from "react-native";
import { useAppContext } from "../context/AppContext";
import * as Location from "expo-location";

export default function Instellingen() {
  const { regio, setRegio, schooljaar, setSchooljaar } = useAppContext();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  async function bepaalRegioViaGPS() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Geen toegang", "De app heeft geen toegang tot je locatie.");
      return;
    }

    const locatie = await Location.getCurrentPositionAsync({});
    const latitude = locatie.coords.latitude;

    if (latitude > 52.5) {
      setRegio("noord");
    } else if (latitude > 51.5) {
      setRegio("midden");
    } else {
      setRegio("zuid");
    }
  }

  return (
    <View style={{ flexDirection: isLandscape ? "row" : "column" }}>
      <View>
        <Text>Huidige regio: {regio}</Text>
        <Text>Huidig schooljaar: {schooljaar}</Text>
        <Text>Kies regio:</Text>
        <Button title="Noord" onPress={() => setRegio("noord")} />
        <Button title="Midden" onPress={() => setRegio("midden")} />
        <Button title="Zuid" onPress={() => setRegio("zuid")} />
        <Button title="Bepaal regio via GPS" onPress={bepaalRegioViaGPS} />
      </View>
      <View>
        <Text>Kies schooljaar:</Text>
        <Button title="2024-2025" onPress={() => setSchooljaar("2024-2025")} />
        <Button title="2025-2026" onPress={() => setSchooljaar("2025-2026")} />
        <Button title="2026-2027" onPress={() => setSchooljaar("2026-2027")} />
      </View>
    </View>
  );
}