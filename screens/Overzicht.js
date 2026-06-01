import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, useWindowDimensions } from "react-native";
import { useAppContext } from "../context/AppContext";

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

  if (laden) {
    return (
      <View>
        <ActivityIndicator size="large" color="#005b99" />
        <Text>Vakanties laden...</Text>
      </View>
    );
  }

  if (fout) {
    return (
      <View>
        <Text>{fout}</Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: isLandscape ? "row" : "column" }}>
      <View>
        <Text>Schoolvakanties {schooljaar}</Text>
        <Text>Regio: {regio}</Text>
      </View>
      <FlatList
        data={vakanties}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const gevondenRegio = item.regions.find(
            (r) => r.region === regio || r.region === "heel Nederland"
          );
          return (
            <View>
              <Text>{item.type.trim()}</Text>
              {gevondenRegio ? (
                <>
                  <Text>Start: {formatDatum(gevondenRegio.startdate)}</Text>
                  <Text>Einde: {formatDatum(gevondenRegio.enddate)}</Text>
                </>
              ) : (
                <Text>Geen data voor deze regio</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}