import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { useAppContext } from "../context/AppContext";
import * as Location from "expo-location";

const regios = [
  { id: "noord", label: "Noord" },
  { id: "midden", label: "Midden" },
  { id: "zuid", label: "Zuid" },
];

const schooljaren = ["2025-2026", "2026-2027", "2027-2028"];

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
    <ScrollView style={styles.container}>
      <Text style={styles.titel}>Instellingen</Text>
      <Text style={styles.subtitel}>Pas je voorkeuren aan voor de vakantie-app</Text>

      <View style={[styles.sectie, isLandscape && styles.sectieLandscape]}>
        <Text style={styles.sectieNaam}>Regio</Text>
        <Text style={styles.sectieOmschrijving}>Selecteer je regio om de juiste schoolvakanties te zien</Text>

        <TouchableOpacity style={styles.gpsKnop} onPress={bepaalRegioViaGPS}>
          <Text style={styles.gpsTekst}>Automatisch bepalen met GPS</Text>
        </TouchableOpacity>

        {regios.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[styles.optie, regio === r.id && styles.optieActief]}
            onPress={() => setRegio(r.id)}
          >
            <View style={[styles.radio, regio === r.id && styles.radioActief]}>
              {regio === r.id && <View style={styles.radioBinnen} />}
            </View>
            <Text style={[styles.optieLabel, regio === r.id && styles.optieLabelActief]}>
              {r.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.sectie, isLandscape && styles.sectieLandscape]}>
        <Text style={styles.sectieNaam}>Schooljaar</Text>
        <Text style={styles.sectieOmschrijving}>Kies het schooljaar waarvoor je vakanties wilt zien</Text>

        {schooljaren.map((jaar) => (
          <TouchableOpacity
            key={jaar}
            style={[styles.optie, schooljaar === jaar && styles.optieActief]}
            onPress={() => setSchooljaar(jaar)}
          >
            <View style={[styles.radio, schooljaar === jaar && styles.radioActief]}>
              {schooljaar === jaar && <View style={styles.radioBinnen} />}
            </View>
            <Text style={[styles.optieLabel, schooljaar === jaar && styles.optieLabelActief]}>
              {jaar}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7", padding: 16 },
  titel: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 4 },
  subtitel: { fontSize: 14, color: "#666", marginBottom: 16 },
  sectie: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectieLandscape: { width: "48%", marginRight: "2%" },
  sectieNaam: { fontSize: 16, fontWeight: "bold", color: "#111", marginBottom: 4 },
  sectieOmschrijving: { fontSize: 13, color: "#666", marginBottom: 12 },
  gpsKnop: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  gpsTekst: { fontSize: 14, color: "#333" },
  optie: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 8,
    gap: 12,
  },
  optieActief: { backgroundColor: "#eff6ff", borderColor: "#3b82f6" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioActief: { borderColor: "#3b82f6" },
  radioBinnen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3b82f6",
  },
  optieLabel: { fontSize: 15, color: "#111" },
  optieLabelActief: { fontWeight: "bold", color: "#3b82f6" },
});