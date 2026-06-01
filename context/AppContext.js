import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [regio, setRegioState] = useState("noord");
  const [schooljaar, setSchooljaarState] = useState("2025-2026");

  useEffect(() => {
    async function laadInstellingen() {
      const opgeslagenRegio = await AsyncStorage.getItem("regio");
      const opgeslagenSchooljaar = await AsyncStorage.getItem("schooljaar");
      if (opgeslagenRegio) setRegioState(opgeslagenRegio);
      if (opgeslagenSchooljaar) setSchooljaarState(opgeslagenSchooljaar);
    }
    laadInstellingen();
  }, []);

  async function setRegio(nieuweRegio) {
    setRegioState(nieuweRegio);
    await AsyncStorage.setItem("regio", nieuweRegio);
  }

  async function setSchooljaar(nieuwSchooljaar) {
    setSchooljaarState(nieuwSchooljaar);
    await AsyncStorage.setItem("schooljaar", nieuwSchooljaar);
  }

  return (
    <AppContext.Provider value={{ regio, setRegio, schooljaar, setSchooljaar }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}