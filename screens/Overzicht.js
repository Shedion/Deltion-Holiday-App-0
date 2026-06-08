import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, useWindowDimensions } from "react-native";
import { useAppContext } from "../context/AppContext";

const plaatjes = {
  Herfstvakantie: require("../assets/herfst.jpg"),
  Kerstvakantie: require("../assets/kerst.jpg"),
  Voorjaarsvakantie: require("../assets/voorjaar.jpg"),
  Meivakantie: require("../assets/mei.jpg"),
  Zomervakantie: require("../assets/zomer.jpg"),
};

export default function Overzicht() {
  const { regio, schooljaar } = useAppContext();
  const [vakanties, setVakanties] = useState([]);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState(null);
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
      setFout("Fout: " + e.message);
    } finally {
      setLaden(false);
    }
  }

  function formatDatum(datumString) {
    const datum = new Date(datumString);
    return datum.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function isAfgelopen(enddate) {
    return new Date(enddate) < new Date();
  }

  if (laden) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#005b99" />
        <Text>Vakanties laden...</Text>
      </View>
    );
  }

  if (fout) {
    return (
      <View style={styles.center}>
        <Text>{fout}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>Schoolvakanties</Text>
      <Text style={styles.subtitel}>
        Schooljaar {schooljaar} — Regio {regio}
      </Text>
      <FlatList
        data={vakanties}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const gevondenRegio = item.regions.find(
            (r) => r.region === regio || r.region === "heel Nederland"
          );
          const naam = item.type.trim();
          const plaatje = plaatjes[naam];
          const afgelopen = gevondenRegio ? isAfgelopen(gevondenRegio.enddate) : false;

          return (
            <View style={[styles.kaart, isLandscape && styles.kaartLandscape]}>
              {plaatje && (
                <Image source={plaatje} style={styles.afbeelding} />
              )}
              <View style={styles.info}>
                <View style={styles.naamRij}>
                  <Text style={styles.naam}>{naam}</Text>
                  {afgelopen && (
                    <View style={styles.afgelopenBadge}>
                      <Text style={styles.afgelopenTekst}>Afgelopen</Text>
                    </View>
                  )}
                </View>
                {gevondenRegio && (
                  <Text style={styles.datum}>
                    {formatDatum(gevondenRegio.startdate)} – {formatDatum(gevondenRegio.enddate)}
                  </Text>
                )}
                <View style={styles.regioRij}>
                  {["noord", "midden", "zuid"].map((r) => (
                    <View
                      key={r}
                      style={[
                        styles.regioBadge,
                        r === regio && styles.regioBadgeActief,
                      ]}
                    >
                      <Text
                        style={[
                          styles.regioTekst,
                          r === regio && styles.regioTekstActief,
                        ]}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      />
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
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 2,
  },
  kaartLandscape: { width: "48%", marginRight: "2%" },
  afbeelding: { width: 120, height: 120 },
  info: { flex: 1, padding: 12, justifyContent: "center" },
  naamRij: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  naam: { fontSize: 16, fontWeight: "bold", color: "#111" },
  datum: { fontSize: 12, color: "#666", marginTop: 4, marginBottom: 8 },
  regioRij: { flexDirection: "row", gap: 6 },
  regioBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  regioBadgeActief: { backgroundColor: "#005b99", borderColor: "#005b99" },
  regioTekst: { fontSize: 11, color: "#666" },
  regioTekstActief: { color: "#fff" },
  afgelopenBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  afgelopenTekst: { fontSize: 11, color: "#999" },
});