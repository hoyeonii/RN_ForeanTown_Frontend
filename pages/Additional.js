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
import * as ImagePicker from "expo-image-picker";
import UserProfileImg from "../components/UserProfileImg";

export default function Additional({
  route: {
    params: { userData },
  },
}) {
  console.log(userData);
  const navigate = useNavigation();
  const { setUser, accessToken } = useContext(AuthContext);
  const [countryList, setCountryList] = useState([]);
  const [inputNickNameValue, setInputNickNameValue] = useState(
    userData.nickname || ""
  );
  const [profileImg, setProfileImg] = useState(userData.profile_img_url || "");
  const [inputAgeValue, setInputAgeValue] = useState(userData.age || "");
  const [inputIsMaleValue, setInputIsMaleValue] = useState(
    userData ? (userData.gender === "male" ? true : false) : true
  );
  const [inputLocationValue, setInputLocationValue] = useState(
    userData.location || ""
  );
  const [inputCountryValue, setInputCountryValue] = useState(
    userData.country || ""
  );
  const [ErrMessage, setErrMessage] = useState("");
  const formData = new FormData();

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
    loadCountryNameList();
  }, []);

  function loadCountryNameList() {
    fetch(`${rootUrl}/users/country/list?name=`)
      .then((res) => res.json())
      .then((data) => {
        setCountryList(data);
      })
      .catch((err) => console.log(err));
  }

  const handleAdditionalInfo = () => {
    formData.append("nickname", inputNickNameValue);
    formData.append("age", inputAgeValue);
    formData.append("is_male", inputIsMaleValue);
    formData.append("location", inputLocationValue);
    formData.append("country", inputCountryValue);
    appendImage(profileImg);

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        Authorization: "Bearer " + accessToken,
      },
      body: formData,
    };
    console.log(requestOptions);
    fetch(`${rootUrl}/users/myinfo`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        data.ERROR_MESSAGE
          ? setErrMessage(data.ERROR_MESSAGE[0])
          : navigate.push("Main");
      })
      .catch((err) => {
        console.log("에러: " + err);
      });
  };

  function appendImage(img) {
    if (!img) return;

    const filename = img.split("/").pop();

    if (img.split("://")[0] === "https") {
      //Picture already posted
      formData.append("profile_image", {
        uri: img,
        name: filename,
        type: "multipart/form-data",
      });
    } else {
      //Picture newly posted
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("profile_image", {
        uri: img,
        name: filename,
        type,
      });
    }
  }

  function FieldAttachment() {
    async function pickImage() {
      console.log("sif");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfileImg(result.uri);
      }
    }

    return (
      <TouchableOpacity
        style={styles.profileImg}
        onPress={() => {
          console.log("riowf");
          pickImage();
        }}
      >
        <UserProfileImg img={profileImg} />

        <View style={styles.profileImgTouchable} />
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.title}>Tell us more about you!</Text>
          <View style={styles.horizontal}>
            <View>
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
            <FieldAttachment style={styles.profileImg} />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Age</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={inputAgeValue}
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
            <Text style={styles.textBold}>Location{inputLocationValue}</Text>
            <SelectDropdown
              style={styles.dropDown}
              data={offlineLocation}
              defaultButtonText={inputLocationValue || "Select Location"}
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
            <Text style={styles.textBold}>Country{inputCountryValue}</Text>
            <SelectDropdown
              style={styles.dropDown}
              data={countryList.map((el) => el.name)}
              defaultButtonText={inputCountryValue || "Select Location"}
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
  nicknameInputBox: {},
  inputBox: { marginTop: 20 },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImg: {
    // alignItems: "center",
    marginTop: 20,
    marginRight: 10,
    // padding: 10,
    // borderRadius: 10,
    width: 70,
    height: 70,
  },
  profileImgTouchable: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    backgroundColor: "white",
    opacity: 0,
  },
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
    minWidth: "50%",
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
