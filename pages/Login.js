import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";

import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../App";
import rootUrl from "../data/rootUrl";

export default function Login() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [input_email_value, set_input_email_value] = useState("");
  const [input_password_value, set_input_password_value] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [signInErrMessage, setSignInErrMessage] = useState("");

  const do_login = () => {
    console.log("do loginn");
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "abc@gmail.com",
        password: "adeade123",
        // email: input_email_value,
        // password: input_password_value,
      }),
    };

    fetch(`${rootUrl}/users/login`, request_options)
      .then((response) => {
        if (response.status >= 400) setSignInErrMessage(response.statusText);
        return response.json();
      })
      .then((data) => {
        //토큰 및 유저이름 저장
        console.log("유저정보");
        console.log(data);
        // console.log(JSON.parse(data));

        storeData("accessToken", data.access_token);
        storeData("refreshToken", data.refresh_token);
        setUser(data.name);
      })
      .catch((err) => {
        console.log("에러: " + err);
      });
  };

  function handleEmailChange(e) {
    const spaceRemoved = e.replace(" ", "");

    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (regex.test(spaceRemoved)) {
      setEmailErrMessage("");
    } else {
      setEmailErrMessage("이메일이 유효하지 않습니다");
    }

    set_input_email_value(spaceRemoved);
  }

  const storeData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>이메일</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              value={input_email_value}
              onChangeText={(e) => {
                handleEmailChange(e);
              }}
            />
            <Text style={styles.warningText}>{emailErrMessage}</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>비밀번호</Text>
            <TextInput
              style={styles.textInput}
              value={input_password_value}
              secureTextEntry={true} //비밀번호 ** 처리
              onChangeText={(e) => {
                set_input_password_value(e);
              }}
            />
          </View>
          <Text>{signInErrMessage}</Text>
          <TouchableOpacity
            style={styles.postBtn}
            disabled={
              input_email_value && !emailErrMessage && input_password_value
                ? false
                : true
            }
            onPress={() => {
              navigation.push("Main");
              do_login();
            }}
          >
            <Text style={styles.postTxt}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("SignUp");
            }}
          >
            <Text style={styles.notRegisteredBtn}>Not registered yet?</Text>
          </TouchableOpacity>
          {/* <Button
            title="storeData(현재 로그인버튼)"
            onPress={() => {
              storeData("token", "qwert12");
              setUser("Me");
              navigation.push("Main");
            }}
          />
          <Button title="retrieveData" onPress={() => retrieveData("token")} /> */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignContent: "center",
    flexDirection: "row",

    marginTop: 40,
    padding: 30,
    // borderWidth: 3,

    // borderWidth: 1,
  },
  innercontainer: {
    // borderWidth: 3,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  inputBox: { marginTop: 20 },
  textBold: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: "white",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  warningText: { paddingLeft: 10, color: "white" },
  postBtn: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#6685FF",

    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginVertical: 10,
  },
  postTxt: { color: "white", fontSize: 17, fontWeight: "bold" },
  notRegisteredBtn: { color: "white", textDecorationLine: "underline" },
});
