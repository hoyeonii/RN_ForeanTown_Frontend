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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../App";

export default function Login() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [input_email_value, set_input_email_value] = useState("");
  const [input_password_value, set_input_password_value] = useState("");
  const [input_password2_value, set_input_password2_value] = useState("");

  const [emailErrMessage, setEmailErrMessage] = useState("");
  //   const [passwordErrMessage, setPasswordErrMessage] = useState("");

  const do_login = () => {
    console.log("do loginn");
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input_email_value,
        password: input_password_value,
      }),
    };
    console.log(request_options);
    fetch(`http://10.36.180.173:8000/users/login`, request_options)
      .then((response) => {
        console.log(response.status);
        response.status >= 400
          ? set_login_failed("이메일 또는 비밀번호가 잘못되었습니다.")
          : //   ? set_signup_failed("이메일 또는 비밀번호가 잘못되었습니다.")

            response.json();
      })
      .then((res) => {
        console.log("로그인 결과");
        console.log(res);

        storeData("token", res);
        setUser(res);
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

  //   function handlePasswordChange(e) {
  //     const regex =
  //       /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  //     set_input_email_value(e);
  //     if (regex.test(e)) {
  //       setEmailErrMessage("");
  //     } else {
  //       setEmailErrMessage("이메일이 유효하지 않습니다");
  //     }
  //   }

  const storeData = async (key, val) => {
    console.log("_storeData");
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const retrieveData = async (key) => {
    console.log("_retrieve data");
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>이메일</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          value={input_email_value}
          onChangeText={(e) => {
            handleEmailChange(e);
          }}
        />
        <Text style={styles.warningText}>{emailErrMessage}</Text>
        <Text>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          value={input_password_value}
          secureTextEntry={true} //비밀번호 ** 처리
          onChangeText={(e) => {
            set_input_password_value(e);
          }}
        />

        <Text>비밀번호 확인</Text>
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
        <Button
          title="Login"
          disabled={
            input_email_value &&
            !emailErrMessage &&
            input_password_value &&
            input_password_value === input_password2_value
              ? false
              : true
          }
          onPress={() => {
            do_login();
          }}
        />
      </View>
      <Button
        title="storeData(현재 로그인버튼)"
        onPress={() => {
          storeData("token", "qwert12");
          setUser("유저네임");
        }}
      />
      <Button title="retrieveData" onPress={() => retrieveData("token")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // alignSelf: "flex-start",
    // width: "95%",
    marginTop: 40,
    // borderWidth: 1,
    borderColor: "red",
  },
  textInput: { borderWidth: 1, padding: 10 },
  warningText: { color: "red" },
});
