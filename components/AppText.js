import { View, Text } from "react-native";
import React from "react";

const AppText = (props) => {
  return (
    <Text {...props} style={{ ...props.style, fontFamily: "Open Sans" }}>
      {props.children}
    </Text>
  );
};

export default AppText;
