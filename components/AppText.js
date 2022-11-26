import { View, Text } from "react-native";
import React from "react";
import * as Font from "expo-font";

const AppText = (props) => {
  Font.loadAsync({
    museoModerno: require("../assets/fonts/MuseoModerno.ttf"),
  });
  return (
    <Text {...props} style={{ ...props.style, fontFamily: "museoModerno" }}>
      {props.children}
    </Text>
  );
};

export default AppText;
