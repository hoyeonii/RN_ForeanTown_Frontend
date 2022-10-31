import { StyleSheet } from "react-native";
import React, { useState, createContext } from "react";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp.js";
import Post from "../pages/Post.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../components/Footer";
export const AuthContext = createContext();
export default function AppNav() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="Post" component={Post} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
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
