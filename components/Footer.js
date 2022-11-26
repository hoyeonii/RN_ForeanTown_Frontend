import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../App";
import AppText from "./AppText";

function Footer() {
  const { user, userId, setUser, accessToken } = useContext(AuthContext);
  // 나중에 createBottomTabNavigator로 구현해보기!
  const navigation = useNavigation();

  // useEffect(() => {
  //   // retrieveData();
  // }, []);

  (async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  })();

  const readAsyncData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      // do something what you need with response
      console.log(result);
    } catch (error) {
      console.log(error);
      // do something...
    }
  };

  function NavTab({ navTo, icon, name }) {
    return (
      <TouchableOpacity
        style={styles.page}
        onPress={() => navigation.navigate(navTo)}
      >
        <Icon name={icon} size={30} color="gray" />
        <AppText style={styles.pageText}>{name}</AppText>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <NavTab navTo={userId ? "Post" : "Login"} icon="plus" name="Post" />

      <NavTab navTo="Main" icon="home" name="Main" />

      <TouchableOpacity
        style={styles.page}
        onPress={() => {
          userId
            ? navigation.navigate("MyPage", { state: userId })
            : navigation.navigate("Login");
        }}
      >
        <Icon name={"user"} size={30} color="gray" />
        <Text style={styles.pageText}>{userId ? user + userId : "로그인"}</Text>
      </TouchableOpacity>
      <Button
        title="read"
        onPress={() => {
          readAsyncData();
        }}
      />
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
