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
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import FormData from "form-data";
import data from "../data/countries";
import CategoryBar from "../components/CategoryBar";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootUrl from "../data/rootUrl";

//User can post here.
//if prevData exists, it updates, if not, it creates new post
export default function Post({
  route: {
    params: { data: prevData },
  },
}) {
  // const prevData = route.params.data;
  // const [savedData, setSavedData] = useState({});
  // const [selectedCountry, setSelectedCountry] = useState("국가를 선택해주세요");
  const [selectedCategory, setSelectedCategory] = useState(
    nametoCategoryId(prevData?.gather_room_category.name) || null
  );
  const [inputTitle, setInputTitle] = useState(prevData?.subject || "");
  const [inputWhen, setInputWhen] = useState(
    prevData ? new Date(prevData.date_time) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  showDatePicker;
  const [inputOnline, setInputOnline] = useState(
    prevData ? prevData.is_online : true
  );
  const [inputWhere, setInputWhere] = useState(prevData?.address || null);
  const [inputWho, setInputWho] = useState(prevData?.user_limit || 2);
  const [inputDetail, setInputDetail] = useState(prevData?.content || "");
  const [imageArr, setImageArr] = useState(
    prevData?.gather_room_images.map((el) => el.img_url) || []
  );

  const navigate = useNavigation();
  const { setUser, accessToken, user } = useContext(AuthContext);
  const formData = new FormData();

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

  function appendDataToFormData() {
    formData.append("subject", inputTitle);
    formData.append("content", inputDetail);
    formData.append("address", inputWhere);
    formData.append("is_online", inputOnline ? "True" : "False");
    formData.append("user_limit", inputWho);
    formData.append("date_time", editDateForm(inputWhen) + " 17:00:00");
    formData.append("gather_room_category", categoryIdtoName(selectedCategory));
    appendImage(imageArr);

    //     }
    //   }
  }

  function handlePost() {
    console.log("handlePost");
    appendDataToFormData();

    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        Authorization: "Bearer " + accessToken,
      },
      body: formData,
    };

    fetch(`${rootUrl}/foreatown/gather-room`, requestOption)
      .then((res) => {
        if (res.ok) navigate.push("Main");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log("새로운 포스팅 왈료ㅛㅛㅛㅛㅛㅛㅛ");
        // navigate.push(`Main`)
      })
      .catch((err) => {
        console.log("에러");
        console.log(err);
      });
  }

  function handleUpdate() {
    console.log("handle UPDATAEEE");
    appendDataToFormData();

    const requestOption = {
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

    fetch(`${rootUrl}/foreatown/gather-room/${data.id}`, requestOption)
      .then((res) => {
        console.log("웨 않돼");
        console.log(res.ok);
        console.log(res.status);
        if (res.ok) navigate.push("Main");
        return res;
      })
      .then((data) => {
        console.log("기존 포스트 업뎃완료ㅛㅛㅛㅛㅛㅛㅛㅛㅛ");
        console.log(data);
      })

      .catch((err) => console.error(err));
  }

  // input으로 파일 첨부시, 받아온 파일 array를 formData로 하나씩 넣어줌
  //사진 넘겨줄때 uri랑 name, type까지 다 보내줘야함!!!
  function appendImage(imageArr) {
    if (imageArr) {
      for (let i = 0; i < imageArr.length; i++) {
        const filename = imageArr[i].split("/").pop();

        if (imageArr[i].split("://")[0] === "https") {
          //Picture already posted
          formData.append("gather_room_images", {
            uri: imageArr[i],
            name: filename,
            type: "multipart/form-data",
          });
        } else {
          //Picture newly posted
          const match = /\.(\w+)$/.exec(filename ?? "");
          const type = match ? `image/${match[1]}` : `image`;

          formData.append("gather_room_images", {
            uri: imageArr[i],
            name: filename,
            type,
          });
        }
      }
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageArr([...imageArr, result.uri]);
    }
  }

  function editDateForm(date) {
    const newDate = new Date(date);

    console.log("editDateed" + date);
    console.log("editDateed" + newDate);
    return [
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      newDate.getDate(),
    ].join("-");
  }

  function categoryIdtoName(id) {
    switch (id) {
      case 1:
        return "MeetUp";
      case 2:
        return "Dating";
      case 3:
        return "Language";
      default:
        return "Hiring";
    }
  }

  function nametoCategoryId(name) {
    switch (name) {
      case "MeetUp":
        return 1;
      case "Dating":
        return 2;
      case "Language":
        return 3;
      default:
        return 4;
    }
  }

  function resetInput() {
    setInputTitle("");
    setIinputDetail("");
    setIinputWhere(null);
    setIinputOnline(true);
    setIinputWho(2);
    setIinputWhen(new Date());
    setSelectedCategory("MeetUp");
    setImageArray([]);
  }

  //Components
  function FieldWhen() {
    return (
      (selectedCategory === 1 || selectedCategory === 4) && (
        <TouchableOpacity
          onPress={() => {
            setShowDatePicker(true);
          }}
          style={styles.inputBox}
        >
          <Text style={styles.textBold}>When</Text>
          <Text style={styles.textInput}>{editDateForm(inputWhen)}</Text>
          {showDatePicker && (
            <RNDateTimePicker
              value={new Date()}
              mode="date"
              minimumDate={new Date()}
              onChange={(e) => {
                console.log("날짜 선택");
                console.log(e.nativeEvent.timestamp);
                e.nativeEvent.timestamp &&
                  setInputWhen(e.nativeEvent.timestamp);
                setShowDatePicker(false);
              }}
            />
          )}
        </TouchableOpacity>
      )
    );
  }

  function FieldWhere() {
    return (
      <View style={styles.inputBox}>
        <Text style={styles.textBold}>Where</Text>

        <View style={styles.inputOnlineWrapper}>
          <TouchableOpacity
            style={
              inputOnline ? styles.inputOnlineSelected : styles.inputOnline
            }
            onPress={() => {
              setInputOnline(true);
              setInputWhere(null);
            }}
          >
            <Text
              style={
                inputOnline
                  ? styles.inputOnlineSelectedTxt
                  : styles.inputOnlineTxt
              }
            >
              Online
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !inputOnline ? styles.inputOnlineSelected : styles.inputOnline
            }
            onPress={() => {
              setInputOnline(false);
              setInputWhere(null);
            }}
          >
            <Text
              style={
                !inputOnline
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
          data={!inputOnline && offlineLocation}
          defaultButtonText={
            inputOnline
              ? "Will be randomly assigned"
              : inputWhere || "Select Location"
          }
          disabled={!inputOnline ? false : true}
          buttonTextAfterSelection={(selectedItem, index) => {
            setInputWhere(selectedItem);
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>
    );
  }

  function FieldWho() {
    return (
      <View style={styles.inputBox}>
        <Text style={styles.textBold}>Who's coming</Text>
        <View style={[styles.whoWrapper, styles.textInput]}>
          <Button
            color="#8587DC"
            title="        -       "
            onPress={() => {
              if (inputWho > 2) setInputWho((prep) => --prep);
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
    );
  }

  // function FieldDetails() {
  //   return (
  //     <View style={styles.inputBox}>
  //       <Text style={styles.textBold}>Details</Text>
  //       <TextInput
  //         style={[styles.textInput, styles.longInput]}
  //         onChangeText={(e) => {
  //           setInputDetail(e);
  //         }}
  //         multiline={true}
  //         numberOfLines={6}
  //       />
  //     </View>
  //   );
  // }

  function FieldAttachment() {
    return (
      <View>
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
      </View>
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
          {/* <Text>{user}</Text>
          <Text>{accessToken}</Text> */}
          <CategoryBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Title</Text>
            <TextInput
              style={styles.textInput}
              maxLength={60}
              defaultValue={inputTitle}
              // value={inputTitle}
              onChangeText={(e) => {
                // e.preventDefault();
                setInputTitle(e);
              }}
            />
          </View>

          <FieldWhen />

          {/* {(selectedCategory === 1 || selectedCategory === 4) && (
            <TouchableOpacity
              onPress={() => {
                setShowDatePicker(true);
              }}
              style={styles.inputBox}
            >
              <Text style={styles.textBold}>When</Text>
              <Text style={styles.textInput}>
                {/* {inputWhen} 
                {editDateForm(inputWhen)}
              </Text>
              {showDatePicker && (
                <RNDateTimePicker
                  value={new Date()}
                  mode="date"
                  minimumDate={new Date()}
                  onChange={(e) => {
                    console.log("날짜 선택");
                    console.log(e.nativeEvent.timestamp);
                    setShowDatePicker(false);
                    e.nativeEvent.timestamp &&
                      setInputWhen(e.nativeEvent.timestamp);
                  }}
                />
              )}
            </TouchableOpacity>
          )} */}

          <FieldWhere />
          <FieldWho />
          {/* <FieldDetails /> */}
          <View style={styles.inputBox}>
            <Text style={styles.textBold}>Details</Text>
            <TextInput
              style={[styles.textInput, styles.longInput]}
              value={inputDetail}
              onChangeText={(e) => {
                setInputDetail(e);
              }}
              multiline={true}
              numberOfLines={6}
            />
          </View>
          <FieldAttachment />
          <TouchableOpacity
            style={styles.postBtn}
            onPress={() => {
              prevData?.id ? handleUpdate() : handlePost();
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
