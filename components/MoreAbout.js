import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Linking,
  BackHandler,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

function MoreAbout({ icon, field, text }) {
  return (
    <View style={styles.horizontal}>
      <Icon name={icon} size={35} />
      <View style={styles.moreAboutRight}>
        <Text style={styles.moreAboutField}>{field}</Text>
        <Text style={styles.moreAboutText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  moreAboutRight: { width: "85%" },
  moreAboutField: { fontSize: 15, fontWeight: "bold" },
  moreAboutText: {},
});
export default MoreAbout;
