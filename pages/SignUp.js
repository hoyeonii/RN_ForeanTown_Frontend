import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../App";
import rootUrl from "../data/rootUrl";
import { storeData } from "../components/HandleAsyncStorage";

export default function SignUp() {
  const navigation = useNavigation();
  const { setUser, setAccessToken } = useContext(AuthContext);
  const [inputNameValue, setInputNameValue] = useState("");
  const [input_email_value, set_input_email_value] = useState("");
  const [inputPasswordvalue, setInputPasswordvalue] = useState("");
  const [inputPassword2Value, setInputPassword2Value] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [signupErrMessage, setSignupErrMessage] = useState("");

  const handleSignUp = () => {
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputNameValue,
        email: inputEmailValue,
        password1: inputPasswordValue,
        password2: inputPassword2Value,
      }),
    };

    fetch(`${rootUrl}/users/signup`, request_options)
      .then((response) => {
        // console.log(response.headers);
        // console.log("ok" + response.ok);
        // console.log("statusText" + response.statusText);
        // console.log("message" + response.message);

        if (response.ok) navigation.push("Additional");

        return response.json();
      })
      .then((res) => {
        console.log("회원가입 결과");
        console.log(res);
        if (res.access_token) {
          storeData("accessToken", res.access_token);
          storeData("refreshToken", res.refresh_token);
          setUser(res.name);
          setAccessToken(res.access_token);
        }
        if (res.password1) setSignupErrMessage(res.password1[0]);
        if (res.email) setSignupErrMessage(res.email[0]);
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
                setInputNameValue(e);
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
                setInputPasswordValue(e);
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
                setInputPassword2Value(e);
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
          <Text style={styles.warningText}>{signupErrMessage}</Text>
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
            }}
          >
            <Text style={styles.postTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
    padding: 30,
  },
  innercontainer: {
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
