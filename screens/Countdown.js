import { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
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

  if (laden) {
    return (
      <View>
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
      <View>
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
    <View style={{ flexDirection: isLandscape ? "row" : "column" }}>
      <View>
        <Text>{naam}</Text>
        <Text>Nog {aantalDagen} dagen</Text>
      </View>
      {plaatje && (
        <Image source={plaatje} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}