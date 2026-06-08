import { View, Text, Image, useWindowDimensions } from "react-native";

export default function About() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={{ flexDirection: isLandscape ? "row" : "column" }}>
      <Image
        source={require("../assets/mijnfoto.jpg")}
        style={{ width: 150, height: 150 }}
      />
      <View>
        <Text>Deltion Holiday App</Text>
        <Text>Gemaakt door Shedion</Text>
        <Text>Schooljaar 2025-2026</Text>
        <Text>Keuzedeel Mobile App Development K0497</Text>
      </View>
    </View>
  );
}