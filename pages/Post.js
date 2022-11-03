import {
  View,
  Text,
  TextInput,
  RefreshControl,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../data/countries";
import CategoryBar from "../components/CategoryBar";
import SelectDropdown from "react-native-select-dropdown";

export default function Post() {
  // const [showSelectBox, setShowSelectBox] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState("국가를 선택해주세요");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputTitle, setInputTitle] = useState("");
  // const [inputWhen, setInputWhen] = useState(new Date(1598051730000));
  const [inputWhere, setInputWhere] = useState(null);
  const [inputWho, setInputWho] = useState(1);

  const [inputDetail, setInputDetail] = useState("");

  const pplNum = [
    "HongDae",
    "GangNam",
    "InsaDong",
    "Jamsil",
    "Gundae",
    "MyungDong",
    "Jongro",
    "DongDaeMun",
    "ShinChon",
  ];

  //   const [countries, setCountries] = useState([]);

  //   useEffect(() => {
  //     loadCountries();
  //   }, []);
  //   function loadCountries() {
  //     fetch(
  //       "http://apis.data.go.kr/1262000/CountryCodeService2/getCountryCodeList2"
  //     ).then((res) => console.log(res));
  //     //   .then((res) => res.json())
  //     //   .then((data) => {
  //     //     console.log(data);
  //     //     setCountries(data);
  //     //   });
  //   }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Post</Text>
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <View style={styles.inputBox}>
        {/* //글자수 제한 걸기 */}
        <Text style={styles.textBold}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setInputTitle(e)}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.textBold}>When</Text>
        <TextInput style={styles.textInput} />
        {/* <Text>{inputWhen}</Text> */}
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.textBold}>Where</Text>
        <SelectDropdown
          style={styles.dropDown}
          data={pplNum}
          defaultButtonText={"Select Location"}
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
              setInputWho((prep) => ++prep);
            }}
          />
        </View>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.textBold}>Details</Text>
        <TextInput
          style={[styles.textInput, styles.longInput]}
          onChangeText={(e) => setInputDetail(e)}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
    padding: 30,
    borderColor: "red",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  inputBox: { marginVertical: 10 },
  textBold: {
    fontWeight: "bold",
    paddingBottom: 5,
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
  },
  textWho: { fontSize: 15, alignSelf: "center" },
  dropDown: { borderWidth: 2 },
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  dropdown1BtnTxtStyle: {
    fontSize: 15,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { fontSize: 15 },

  longInput: { height: 100 },
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
