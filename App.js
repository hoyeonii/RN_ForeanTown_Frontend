import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  createContext,
} from "react";
import AppNav from "./navigation/AppNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    retrieveData("accessToken", setAccessToken);
    retrieveData("user", setUser);
  }, []);

  const retrieveData = async (key, setState) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setState(value);
        console.log("logged in" + value);
      } else {
        setState("Log In");
        console.log("not logged in" + value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      <AppNav />
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  // container: {

  //   flex: 1,
  //   marginTop: 40,
  //   borderWidth: 1,
  //   backgroundColor: "black",
  // },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
