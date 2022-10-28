import {
  View,
  Text,
  TextInput,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../data/countries";

export default function Post() {
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("국가를 선택해주세요");

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
    <View>
      <Text>Post</Text>
      <View>
        <Text>Title</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View>
        <Text>Category</Text>
        {/* <TextInput /> */}
      </View>
      <View>
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
        {/* <TextInput /> */}
      </View>
      <View>
        <Text>Details</Text>
        <TextInput
          style={[styles.textInput, styles.longInput]}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 20,
    padding: 10,
  },
  longInput: { height: 100 },
});
