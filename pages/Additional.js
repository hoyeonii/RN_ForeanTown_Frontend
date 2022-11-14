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

export default function Additional() {
  const navigate = useNavigation();
  const { setUser } = useContext(AuthContext);

  const [countryList, setCountryList] = useState([]);
  const [input_nickName_value, set_input_nickName_value] = useState("");
  const [input_age_value, set_input_age_value] = useState("");
  const [input_isMale_value, set_input_isMale_value] = useState(true);
  const [input_location_value, set_input_location_value] = useState("");
  const [input_country_value, set_input_country_value] = useState("");
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () =>
    fetch(`${rootUrl}/users/country/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountryList(data);
        console.log("웨우ㅏㄴ돼");
      })
      .catch((err) => console.log(err));


  const do_login = () => {
    console.log("do loginn");
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
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

  //   function handleEmailChange(e) {
  //     const spaceRemoved = e.replace(" ", "");
  //     const regex =
  //       /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  //     set_input_email_value(spaceRemoved);
  //     if (regex.test(spaceRemoved)) {
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
              value={input_nickName_value}
              maxLength={10}
              onChangeText={(e) => {
                set_input_nickName_value(e);
              }}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Age</Text>
            <TextInput
              style={styles.textInput}
              value={input_age_value}
              keyboardType="numeric"
              onChangeText={(e) => {
                //입력값이 0으로 시작하지 않고, 두자리이며, 온점을 포함하지 않으면 적용
                if (e.indexOf(0) !== 0 && e.length < 3 && !e.includes("."))
                  set_input_age_value(e);
              }}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Sex</Text>
            <View style={styles.inputOnlineWrapper}>
              <TouchableOpacity
                style={
                  input_isMale_value === true
                    ? styles.inputOnlineSelected
                    : styles.inputOnline
                }
                onPress={() => {
                  set_input_isMale_value(true);
                }}
              >
                <Text
                  style={
                    input_isMale_value === true
                      ? styles.inputOnlineSelectedTxt
                      : styles.inputOnlineTxt
                  }
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  input_isMale_value === false
                    ? styles.inputOnlineSelected
                    : styles.inputOnline
                }
                onPress={() => {
                  set_input_isMale_value(false);
                }}
              >
                <Text
                  style={
                    input_isMale_value === false
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
                set_input_location_value(selectedItem);
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
                set_input_country_value(selectedItem);
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
            disabled={
              input_nickName_value &&
              input_age_value &&
              input_location_value &&
              input_country_value &&
              !ErrMessage
                ? false
                : true
            }
            onPress={() => {
              // do_login();
              navigate.push("Login");
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
