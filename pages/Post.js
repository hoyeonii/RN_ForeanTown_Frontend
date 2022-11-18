import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormData from "form-data";
import data from "../data/countries";
import CategoryBar from "../components/CategoryBar";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootUrl from "../data/rootUrl";

export default function Post() {
  // const [showSelectBox, setShowSelectBox] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState("국가를 선택해주세요");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputTitle, setInputTitle] = useState("");
  const [inputWhen, setInputWhen] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  showDatePicker;
  const [inputOnline, setInputOnline] = useState("Online");
  const [inputWhere, setInputWhere] = useState(null);
  const [inputWho, setInputWho] = useState(1);
  const [inputDetail, setInputDetail] = useState("");
  const [imageArr, setImageArr] = useState([]);
  const [accessToken, setAccessToken] = useState([]);
  setAccessToken;
  const navigate = useNavigation();

  useEffect(() => {
    checkAccessToken("accessToken");
  }, []);

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

  function handlePost() {
    const formData = new FormData();
    // formData.append("subject", inputTitle);
    // formData.append("content", inputDetail);
    // formData.append("address", inputWhere);
    // formData.append("is_online", inputOnline);
    // formData.append("user_limit", inputWho);
    // formData.append("date_time", inputWhen);
    // formData.append("gather_room_category", selectedCategory);

    formData.append("subject", "제목테스트");
    formData.append("content", "내용테스트");
    formData.append("address", inputOnline ? null : inputWhere);
    formData.append("is_online", true);
    formData.append("user_limit", 5);
    formData.append("date_time", editDateForm(inputWhen));
    //  "2021-06-25 17:00:00");
    formData.append("gather_room_category", "Language");

    appendImage(imageArr);

    // fetch(`${rootUrl}/foreatown/gather-room`, {

    console.log("토큰여기" + accessToken);
    console.log("폼데이터" + formData);
    console.log(formData);

    fetch(`https://api.foreatown.com/foreatown/gather-room`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        Authorization: "Bearer " + accessToken,
      },
      body: formData,
    })
      .then((res) => res.json())
      // .then((data) => Router.push(`/post/${data.id}`))
      .then((data) => {
        console.log(data);
        // navigate.push(`Main`)
      })

      .catch((err) => {
        console.log("에러");

        console.log(err);
      });
  }

  // input으로 파일 첨부시, 받아온 파일 array를 formData로 하나씩 넣어줌
  function appendImage(imageArr) {
    if (imageArr) {
      for (let i = 0; i < imageArr.length; i++) {
        formData.append("gather_room_images", imageArr[i]);
      }
    }
  }

  const checkAccessToken = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("밸류" + value);
        setAccessToken(value);
      } else {
        console.log("Sign In first");
        navigate.push("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageArr([...imageArr, result.uri]);
    }
  };
  //  "2021-06-25 17:00:00");
  function editDateForm(date) {
    const newDate = new Date(date);
    return (
      [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join(
        "-"
      ) +
      " " +
      [newDate.getHours(), newDate.getMinutes() + 6, newDate.getSeconds()].join(
        ":"
      )
    );
  }

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Post</Text>
          <CategoryBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Title</Text>
            <TextInput
              style={styles.textInput}
              maxLength={60}
              onChangeText={(e) => setInputTitle(e)}
            />
          </View>

          {(selectedCategory === 1 || selectedCategory === 4) && (
            <TouchableOpacity
              onPress={() => {
                setShowDatePicker(true);
              }}
              style={styles.inputBox}
            >
              <Text style={styles.textBold}>When</Text>
              <Text style={styles.textInput}>{`${new Date(
                inputWhen
              ).getFullYear()}-${new Date(inputWhen).getMonth() + 1}-${new Date(
                inputWhen
              ).getDate()}`}</Text>
              {showDatePicker && (
                <RNDateTimePicker
                  value={new Date()}
                  mode="date"
                  // minimumDate={new Date()}
                  // maximumDate={new Date(2023, 0, 1)}
                  onChange={(e) => {
                    setInputWhen(e.nativeEvent.timestamp);
                    setShowDatePicker(false);
                  }}
                />
              )}
              {/* <Text>{inputWhen}</Text> */}
            </TouchableOpacity>
          )}

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Where</Text>
            <View style={styles.inputOnlineWrapper}>
              <TouchableOpacity
                style={
                  inputOnline === "Online"
                    ? styles.inputOnlineSelected
                    : styles.inputOnline
                }
                onPress={() => {
                  setInputOnline("Online");
                  setInputWhere(null);
                }}
              >
                <Text
                  style={
                    inputOnline === "Online"
                      ? styles.inputOnlineSelectedTxt
                      : styles.inputOnlineTxt
                  }
                >
                  Online
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  inputOnline === "Offline"
                    ? styles.inputOnlineSelected
                    : styles.inputOnline
                }
                onPress={() => {
                  setInputOnline("Offline");
                  setInputWhere(null);
                }}
              >
                <Text
                  style={
                    inputOnline === "Offline"
                      ? styles.inputOnlineSelectedTxt
                      : styles.inputOnlineTxt
                  }
                >
                  Offline
                </Text>
              </TouchableOpacity>
            </View>
            <SelectDropdown
              style={styles.dropDown}
              data={inputOnline === "Offline" && offlineLocation}
              defaultButtonText={
                inputOnline === "Online"
                  ? "Will be randomly assigned"
                  : "Select Location"
              }
              disabled={inputOnline === "Offline" ? false : true}
              buttonTextAfterSelection={(selectedItem, index) => {
                setInputWhere(selectedItem);
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
            <Text style={styles.textBold}>Who's coming</Text>
            <View style={[styles.whoWrapper, styles.textInput]}>
              <Button
                color="#8587DC"
                title="        -       "
                onPress={() => {
                  if (inputWho > 1) setInputWho((prep) => --prep);
                }}
              />
              <Text style={styles.textWho}>{inputWho}</Text>
              <Button
                color="#8587DC"
                title="       +       "
                onPress={() => {
                  if (inputWho < 25) setInputWho((prep) => ++prep);
                }}
              />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Details</Text>
            <TextInput
              style={[styles.textInput, styles.longInput]}
              onChangeText={(e) => setInputDetail(e)}
              multiline={true}
              numberOfLines={6}
            />
          </View>
          {/* <Button title="이미지 선택" onPress={showPicker} /> */}
          <TouchableOpacity
            style={styles.attachmentBtn}
            onPress={pickImage}
            disabled={imageArr.length < 3 ? false : true}
          >
            <Text>{`Add Image (${imageArr.length}/3)`}</Text>
          </TouchableOpacity>
          <ScrollView style={styles.attachmentWrapper} horizontal={true}>
            {imageArr &&
              imageArr.map((img, i) => (
                <View key={i}>
                  <Image source={{ uri: img }} style={styles.attachment} />
                  <TouchableOpacity
                    style={styles.attachmentDeleteBtn}
                    onPress={() => {
                      console.log(i);

                      let copiedImg = [...imageArr];
                      copiedImg.splice(i, 1);
                      console.log(imageArr);
                      setImageArr(copiedImg);
                    }}
                  >
                    <Text>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.postBtn}
            onPress={() => {
              handlePost();
            }}
          >
            <Text style={styles.postTxt}>Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    marginTop: 40,
    padding: 30,
    borderColor: "red",
    // backgroundColor: "#685073",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  inputBox: { marginVertical: 10 },
  textBold: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: "white",
  },

  inputOnlineWrapper: {
    flexDirection: "row",
  },
  inputOnlineSelected: {
    width: "50%",
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  inputOnline: {
    width: "50%",
    // borderWidth: 1,
    // borderColor: "white",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  inputOnlineTxt: { textAlign: "center", color: "lightgrey", fontSize: 15 },
  inputOnlineSelectedTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  whoWrapper: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  textWho: { fontSize: 15, alignSelf: "center" },
  // dropDown: { borderWidth: 2 },
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    // borderWidth: 1,
    // borderBottomRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,

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

  longInput: {
    paddingVertical: 15,
    marginBottom: 30,
    textAlignVertical: "top", // 가운데가 아니라 맨 위 왼쪽부터 텍스트 시작
  },
  attachmentBtn: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  attachmentWrapper: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  attachment: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
  },
  attachmentDeleteBtn: {
    position: "absolute",
    right: 7,
    top: 7,
    paddingHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
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
});

{
  /* <View>
        <Text>Country</Text>
        <Text onPress={() => setShowSelectBox(true)}>{selectedCountry}</Text>
        {showSelectBox && (
          <View>
            {data.map((country, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setSelectedCountry(country);
                  setShowSelectBox(false);
                }}
              >
                <Text>{country}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View> */
}
