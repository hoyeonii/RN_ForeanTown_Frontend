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
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../App";
import rootUrl from "../data/rootUrl";

export default function SignUp() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [input_name_value, set_input_name_value] = useState("");

  const [input_email_value, set_input_email_value] = useState("");
  const [input_password_value, set_input_password_value] = useState("");
  const [input_password2_value, set_input_password2_value] = useState("");

  const [emailErrMessage, setEmailErrMessage] = useState("");
  //   const [passwordErrMessage, setPasswordErrMessage] = useState("");

  const handleSignUp = () => {
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input_name_value,
        email: input_email_value,
        password1: input_password_value,
        password2: input_password2_value,
      }),
    };
    console.log(request_options);

    fetch(`${rootUrl}/users/signup`, request_options)
      .then((response) => {
        console.log(response.headers);
        console.log("ok" + response.ok);
        console.log("statusText" + response.statusText);
        console.log("message" + response.message);

        response.status >= 400
          ? console.log("뭔가가 잘못됐으")
          : //   ? set_signup_failed("이메일 또는 비밀번호가 잘못되었습니다.")

            response.json();
      })
      .then((res) => {
        console.log("회원가입 결과");
        console.log(res);

        // storeData("token", res);
        // setUser(res);

        // localStorage.setItem("refresh_token", res.refresh_token);
        // localStorage.setItem("access_token", res.access_token);
        // localStorage.setItem("user_name", res.name + "님 안녕하세요");
        // setTimeout(() => {
        //   Router.push("/");
        // }, 200);
      })
      .catch((err) => {
        console.log("에러: " + err);
      });
  };

  function handleEmailChange(e) {
    const spaceRemoved = e.replace(" ", "");
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    set_input_email_value(spaceRemoved);
    if (regex.test(spaceRemoved)) {
      setEmailErrMessage("");
    } else {
      setEmailErrMessage("이메일이 유효하지 않습니다");
    }
  }

  const storeData = async (key, val) => {
    console.log("_storeData");
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  // const retrieveData = async (key) => {
  //   console.log("_retrieve data");
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // Error retrieving data
  //   }
  // };

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={input_name_value}
              onChangeText={(e) => {
                set_input_name_value(e);
              }}
            />
          </View>
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
            {emailErrMessage && (
              <Text style={styles.warningText}>{emailErrMessage}</Text>
            )}
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
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>비밀번호 확인</Text>
            <TextInput
              style={styles.textInput}
              value={input_password2_value}
              secureTextEntry={true}
              onChangeText={(e) => {
                set_input_password2_value(e);
                console.log(input_password_value.length);
              }}
            />
            <Text style={styles.warningText}>
              {input_password_value.length > 0
                ? input_password_value === input_password2_value
                  ? ""
                  : "비밀번호 불일치"
                : ""}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.postBtn}
            disabled={
              input_name_value &&
              input_email_value &&
              !emailErrMessage &&
              input_password_value &&
              input_password_value === input_password2_value
                ? false
                : true
            }
            onPress={() => {
              handleSignUp();
              navigation.push("Additional");
            }}
          >
            <Text style={styles.postTxt}>Sign Up</Text>
          </TouchableOpacity>

          {/* <Button
            title="Additional"
            onPress={() => navigation.push("Additional")}
          /> */}
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
