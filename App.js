import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import { useNavigation } from "@react-navigation/core";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "./components/Footer";
export default function App() {
  const Stack = createNativeStackNavigator();
  // const navigation = useNavigation();
  // useLayoutEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, []);
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    borderWidth: 1,
    // borderColor: "blue",
    // marginHorizontal: 5,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
