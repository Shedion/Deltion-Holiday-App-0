import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { AppProvider } from "./context/AppContext";

import Overzicht from "./screens/Overzicht";
import Countdown from "./screens/Countdown";
import Instellingen from "./screens/Instellingen";
import About from "./screens/About";

const Tab = createBottomTabNavigator();

export default function App() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBarPosition={isLandscape ? "left" : "bottom"}
        >
          <Tab.Screen
            name="Overzicht"
            component={Overzicht}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="calendar" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Countdown"
            component={Countdown}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="timer" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Instellingen"
            component={Instellingen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={About}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="information-circle" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}