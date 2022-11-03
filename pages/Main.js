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
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import { useNavigation } from "@react-navigation/core";
import FilterModal from "../components/FilterModal";
import CategoryBar from "../components/CategoryBar";
import { gather_rooms } from "../data/dummydata";

export default function App() {
  // const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigation = useNavigation();

  // const loadData = () =>
  //   fetch(
  //     "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_rate&facet=host_verifications&facet=city&facet=property_type&facet=cancellation_policy&facet=features"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.records);
  //     });
  // useEffect(() => {
  //   loadData();
  // }, []);

  function getCategorybyID(id) {
    switch (id) {
      case 1:
        return "🥳 MeetUp"; //카테고리별로 색 넣을때까지는 이모지
      case 2:
        return "💘 Dating";
      case 3:
        return "🔤 Language";
      case 4:
        return "🤑 Hiring";
    }
  }

  function filteredPost(postArr) {
    if (selectedCategory)
      return postArr.filter(
        (el) =>
          getCategorybyID(el.gather_room_category_id).split(" ")[1] ===
          selectedCategory
      );

    return postArr;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* <View style={styles.banner}>
        <Text>Banner</Text>
      </View> */}
      <View style={styles.main}>
        {/* <Text>rif</Text> */}
        <ScrollView>
          <StatusBar style="auto" />
          {filteredPost(gather_rooms).map((item, i) => (
            <Card
              key={i}
              item={item}

              //   onPress={() => navigation.push("Detail")}
            />
          ))}
        </ScrollView>
      </View>
      {/* <Footer /> */}
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
    paddingHorizontal: 30,
    // borderWidth: 1,
    borderColor: "red",
  },

  banner: {
    backgroundColor: "#8587DC",
    height: 50,
  },
  main: {
    flex: 11,
  },
});
