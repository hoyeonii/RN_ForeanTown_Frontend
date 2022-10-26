import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
function Footer() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.page}>
        <Icon name="search1" size={30} color="gray" />
        <Text style={styles.pageText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.page}>
        <Icon name="hearto" size={30} color="gray" />
        <Text style={styles.pageText}>Wishlists</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.page}>
        <Icon name="book" size={30} color="gray" />
        <Text style={styles.pageText}>Class</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.page}>
        <Icon name="inbox" size={30} color="gray" />
        <Text style={styles.pageText}>Inbox</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.page}>
        <Icon name="user" size={30} color="gray" />
        <Text style={styles.pageText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  page: {
    alignItems: "center",
    width: 60,
  },
  pageIcon: {
    height: 38,
    backgroundColor: "blue",
  },
});
export default Footer;
