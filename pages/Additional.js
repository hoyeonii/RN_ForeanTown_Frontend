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
import SelectDropdown from "react-native-select-dropdown";
import rootUrl from "../data/rootUrl";
import { storeData } from "../components/HandleAsyncStorage";

export default function Additional() {
  const navigate = useNavigation();
  const { setUser, accessToken } = useContext(AuthContext);
  // const [accessToken, setAccessToken] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [inputNickNameValue, setInputNickNameValue] = useState("");
  const [inputAgeValue, setInputAgeValue] = useState("");
  const [inputIsMaleValue, setInputIsMaleValue] = useState(true);
  const [inputLocationValue, setInputLocationValue] = useState("");
  const [inputCountryValue, setInputCountryValue] = useState("");
  const [ErrMessage, setErrMessage] = useState("");

  //   const [passwordErrMessage, setPasswordErrMessage] = useState("");
  const offlineLocation = [
    "HongDae",
    "GangNam",
    "InsaDong",
    "Jamsil",
    "Gundae",
    "MyungDong",
    "Jongro",
    "DongDaeMun",
    "ShinChon",
    "Seoul Forest",
    "Wangshipni",
    "Anguk",
    "Incheon",
    "Busan",
  ];

  (function loadCountryNameList() {
    fetch(`${rootUrl}/users/country/list?name=`)
      .then((res) => res.json())
      .then((data) => {
        setCountryList(data);
      })
      .catch((err) => console.log(err));
  })();

  const handleAdditionalInfo = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        nickname: "Ken",
        age: 26,
        is_male: true,
        location: "서울",
        country: {
          name: "Italy",
        },
      }),
    };
    console.log(requestOptions);
    fetch(`${rootUrl}/users/additional-info`, requestOptions)
      .then((response) => {
        console.log(response.status);
        // response.status >= 400
        //   ? set_login_failed("이메일 또는 비밀번호가 잘못되었습니다.")
        //   : //   ? set_signup_failed("이메일 또는 비밀번호가 잘못되었습니다.")

        return response.json();
      })
      .then((res) => {
        console.log("로그인 결과");
        console.log(res);
      })
      .catch((err) => {
        console.log("에러: " + err);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.title}>Tell us more about you!</Text>
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Nickname </Text>
            <TextInput
              style={styles.textInput}
              value={inputNickNameValue}
              maxLength={10}
              onChangeText={(e) => {
                setInputNickNameValue(e);
              }}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Age</Text>
            <TextInput
              style={styles.textInput}
              value={inputAgeValue}
              keyboardType="numeric"
              onChangeText={(e) => {
                //입력값이 0으로 시작하지 않고, 두자리이며, 온점을 포함하지 않으면 적용
                if (e.indexOf(0) !== 0 && e.length < 3 && !e.includes("."))
                  setInputAgeValue(e);
              }}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Sex</Text>
            <View style={styles.inputOnlineWrapper}>
              <TouchableOpacity
                style={
                  inputIsMaleValue === true
                    ? styles.inputOnlineSelected
                    : styles.inputOnline
                }
                onPress={() => {
                  setInputIsMaleValue(true);
                }}
              >
                <Text
                  style={
                    inputIsMaleValue === true
                      ? styles.inputOnlineSelectedTxt
                      : styles.inputOnlineTxt
                  }
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  inputIsMaleValue === false
                    ? styles.inputOnlineSelected
                    : styles.inputOnline
                }
                onPress={() => {
                  setInputIsMaleValue(false);
                }}
              >
                <Text
                  style={
                    inputIsMaleValue === false
                      ? styles.inputOnlineSelectedTxt
                      : styles.inputOnlineTxt
                  }
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Location</Text>
            <SelectDropdown
              style={styles.dropDown}
              data={offlineLocation}
              defaultButtonText={"Select Location"}
              buttonTextAfterSelection={(selectedItem, index) => {
                setInputLocationValue(selectedItem);
                return selectedItem;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Country</Text>
            <SelectDropdown
              style={styles.dropDown}
              data={countryList.map((el) => el.name)}
              defaultButtonText={"Select Location"}
              buttonTextAfterSelection={(selectedItem, index) => {
                setInputCountryValue(selectedItem);
                return selectedItem;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          {ErrMessage && <Text style={styles.warningText}>{ErrMessage}</Text>}
          <TouchableOpacity
            style={styles.postBtn}
            // disabled={
            //   inputNickNameValue &&
            //   inputAgeValue &&
            //   inputLocationValue &&
            //   inputCountryValue &&
            //   !ErrMessage
            //     ? false
            //     : true
            // }
            onPress={() => {
              handleAdditionalInfo();
              // navigate.push("Login");
            }}
          >
            <Text style={styles.postTxt}>Save</Text>
          </TouchableOpacity>

          {/* <Button
            title="storeData(현재 로그인버튼)"
            onPress={() => {
              storeData("token", "qwert12");
              setUser("유저네임");
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

  inputOnlineWrapper: {
    flexDirection: "row",
  },
  inputOnlineSelected: {
    width: "50%",
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  inputOnline: {
    width: "50%",
    borderWidth: 2,
    borderColor: "transparent",
    padding: 10,
    borderRadius: 10,
  },
  inputOnlineTxt: { textAlign: "center", color: "lightgrey", fontSize: 15 },
  inputOnlineSelectedTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  //dropdown
  dropDown: { borderWidth: 2 },
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    // borderWidth: 1,
    // borderBottomRadius: 10,
    borderRadius: 10,

    // paddingVertical: 5,
    // paddingHorizontal: 15,
  },
  dropdown1BtnTxtStyle: {
    fontSize: 15,
  },
  dropdown1DropdownStyle: {
    backgroundColor: "#EFEFEF",
  },
  dropdown1RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { fontSize: 15 },
});
