import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";
import { useAppContext } from "../context/AppContext";

const plaatjes = {
  Herfstvakantie: require("../assets/herfst.jpg"),
  Kerstvakantie: require("../assets/kerst.jpg"),
  Voorjaarsvakantie: require("../assets/voorjaar.jpg"),
  Meivakantie: require("../assets/mei.jpg"),
  Zomervakantie: require("../assets/zomer.jpg"),
};

export default function Countdown() {
  const { regio, schooljaar } = useAppContext();
  const [vakanties, setVakanties] = useState([]);
  const [laden, setLaden] = useState(true);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    haalVakantiesOp();
  }, [regio, schooljaar]);

  async function haalVakantiesOp() {
    setLaden(true);
    try {
      const antwoord = await fetch(
        `https://opendata.rijksoverheid.nl/v1/infotypes/schoolholidays/schoolyear/${schooljaar}?output=json`
      );
      const json = await antwoord.json();
      setVakanties(json.content[0].vacations);
    } catch (e) {
      console.log(e);
    } finally {
      setLaden(false);
    }
  }

  function berekenDagen(startdate) {
    const vandaag = new Date();
    const startVakantie = new Date(startdate);
    const verschil = startVakantie.getTime() - vandaag.getTime();
    return Math.ceil(verschil / (1000 * 60 * 60 * 24));
  }

  function formatDatum(datumString) {
    const datum = new Date(datumString);
    return datum.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (laden) {
    return (
      <View style={styles.center}>
        <Text>Laden...</Text>
      </View>
    );
  }

  const volgendeVakantie = vakanties.find((vakantie) => {
    const gevondenRegio = vakantie.regions.find(
      (r) => r.region === regio || r.region === "heel Nederland"
    );
    if (!gevondenRegio) return false;
    return new Date(gevondenRegio.startdate) > new Date();
  });

  if (!volgendeVakantie) {
    return (
      <View style={styles.center}>
        <Text>Geen aankomende vakanties gevonden.</Text>
      </View>
    );
  }

  const gevondenRegio = volgendeVakantie.regions.find(
    (r) => r.region === regio || r.region === "heel Nederland"
  );

  const naam = volgendeVakantie.type.trim();
  const aantalDagen = berekenDagen(gevondenRegio.startdate);
  const plaatje = plaatjes[naam];

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>Countdown</Text>
      <Text style={styles.subtitel}>Aantal dagen tot de volgende vakantie</Text>

      <View style={[styles.kaart, isLandscape && styles.kaartLandscape]}>
        <View style={styles.afbeeldingContainer}>
          {plaatje && (
            <Image source={plaatje} style={styles.afbeelding} />
          )}
          <View style={styles.overlay}>
            <Text style={styles.vakantiaNaam}>{naam}</Text>
            <Text style={styles.vakantiedatum}>
              {formatDatum(gevondenRegio.startdate)} – {formatDatum(gevondenRegio.enddate)}
            </Text>
          </View>
        </View>

        <View style={styles.countdownContainer}>
          <View style={styles.cirkel}>
            <Text style={styles.aantalDagen}>{aantalDagen}</Text>
            <Text style={styles.dagenTekst}>dagen</Text>
          </View>
          <Text style={styles.totTekst}>Tot de {naam.toLowerCase()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  titel: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 4 },
  subtitel: { fontSize: 14, color: "#666", marginBottom: 16 },
  kaart: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  kaartLandscape: {
    flexDirection: "row",
  },
  afbeeldingContainer: {
    position: "relative",
  },
  afbeelding: {
    width: "100%",
    height: 200,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  vakantiaNaam: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  vakantiedatum: { fontSize: 13, color: "#eee", marginTop: 4 },
  countdownContainer: {
    alignItems: "center",
    padding: 24,
  },
  cirkel: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  aantalDagen: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  dagenTekst: { fontSize: 13, color: "#fff" },
  totTekst: { fontSize: 14, color: "#666" },
});