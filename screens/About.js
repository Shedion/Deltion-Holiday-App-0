import { View, Text, Image, ScrollView, StyleSheet, useWindowDimensions } from "react-native";

const technischeDetails = [
  { label: "Framework", waarde: "React Native" },
  { label: "Styling", waarde: "StyleSheet" },
  { label: "Navigatie", waarde: "React Navigation" },
  { label: "API", waarde: "Rijksoverheid Open Data" },
];

export default function About() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titel}>Over deze app</Text>
      <Text style={styles.subtitel}>Informatie over de Deltion Holiday App</Text>

      <View style={styles.sectie}>
        <Text style={styles.sectieNaam}>Developer</Text>
        <View style={styles.ontwikkelaarRij}>
          <Image
            source={require("../assets/mijnfoto.jpg")}
            style={styles.foto}
          />
          <View style={styles.ontwikkelaarInfo}>
            <Text style={styles.naam}>Shedion Martis</Text>
            <Text style={styles.omschrijving}>
              Ontwikkeld als onderdeel van een schoolproject bij Deltion College.
              Deze app toont schoolvakanties voor verschillende regio's in Nederland.
            </Text>
            <View style={styles.badgeRij}>
              <View style={styles.badge}>
                <Text style={styles.badgeTekst}>React Developer</Text>
              </View>
              <View style={[styles.badge]}>
                <Text style={[styles.badgeTekst]}>Deltion College</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectie}>
        <Text style={styles.sectieNaam}>Over de app</Text>
        <Text style={styles.omschrijving}>
          De Deltion Holiday App toont schoolvakanties voor verschillende regio's in Nederland.
          De app maakt gebruik van de officiële Rijksoverheid API om actuele vakantie-informatie op te halen.
        </Text>
        <View style={[styles.featuresGrid, isLandscape && styles.featuresGridLandscape]}>
          <View style={styles.feature}>
            <Text style={styles.featureTitel}>Vakantie-overzicht</Text>
            <Text style={styles.featureTekst}>Bekijk alle schoolvakanties voor jouw regio</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitel}>Countdown</Text>
            <Text style={styles.featureTekst}>Tel de dagen af tot de volgende vakantie</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitel}>GPS-locatie</Text>
            <Text style={styles.featureTekst}>Automatische regio-detectie via GPS</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitel}>Modern design</Text>
            <Text style={styles.featureTekst}>Responsive layout voor alle apparaten</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectie}>
        <Text style={styles.sectieNaam}>Technische details</Text>
        {technischeDetails.map((item, index) => (
          <View key={index} style={styles.detailRij}>
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailWaarde}>{item.waarde}</Text>
          </View>
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
  sectieNaam: { fontSize: 16, fontWeight: "bold", color: "#111", marginBottom: 12 },
  ontwikkelaarRij: { flexDirection: "row", gap: 12 },
  foto: { width: 80, height: 80, borderRadius: 40 },
  ontwikkelaarInfo: { flex: 1 },
  naam: { fontSize: 16, fontWeight: "bold", color: "#111", marginBottom: 4 },
  omschrijving: { fontSize: 13, color: "#666", marginBottom: 12, lineHeight: 20 },
  badgeRij: { flexDirection: "row", gap: 8 },
  badge: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTekst: { fontSize: 12, color: "#3b82f6" },
  featuresGrid: { flexDirection: "column", gap: 12, marginTop: 12 },
  featuresGridLandscape: { flexDirection: "row", flexWrap: "wrap" },
  feature: { flex: 1, minWidth: "45%" },
  featureTitel: { fontSize: 14, fontWeight: "bold", color: "#3b82f6", marginBottom: 2 },
  featureTekst: { fontSize: 12, color: "#666" },
  detailRij: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: { fontSize: 14, color: "#666" },
  detailWaarde: { fontSize: 14, fontWeight: "bold", color: "#111" },
});