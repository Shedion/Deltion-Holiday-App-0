import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { AppProvider } from "./context/AppContext";

import Overzicht from "./screens/Overzicht";
import Countdown from "./screens/Countdown";
import Instellingen from "./screens/Instellingen";
import About from "./screens/About";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
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
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Overzicht"
        component={Overzicht}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Countdown"
        component={Countdown}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="timer" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Instellingen"
        component={Instellingen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <AppProvider>
      <NavigationContainer>
        {isLandscape ? <DrawerNavigator /> : <TabNavigator />}
      </NavigationContainer>
    </AppProvider>
  );
}