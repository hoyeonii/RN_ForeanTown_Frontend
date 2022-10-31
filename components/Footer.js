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

function Footer() {
  const { user, setUser } = useContext(AuthContext);
  // 나중에 createBottomTabNavigator로 구현해보기!
  const navigation = useNavigation();
  useEffect(() => {
    retrieveData("token");
  }, []);
  const retrieveData = async (key) => {
    console.log("_retrieve data");
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setUser(true);
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async (key) => {
    console.log("removeData data");
    try {
      await AsyncStorage.removeItem(key);
      console.log("done!!");
    } catch (error) {
      console.log(error);
    }
  };

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
        <Text style={styles.pageText}>{name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <NavTab navTo="Post" icon="plus" name="Post" />
      <NavTab navTo="Main" icon="home" name="Main" />
      <NavTab
        navTo={user ? "MyPage" : "Login"}
        icon="user"
        // name={user ? "user" : "nonpe"}
        name={user ? user : "로그인"}
      />
      <Button
        title="clear"
        onPress={() => {
          removeData("token");
          setUser(null);
        }}
      />
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
