import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
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
import rootUrl from "../data/rootUrl";

export default function App() {
  const [roomsArr, setRoomsArr] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const loadData = () =>
    fetch(`${rootUrl}/foreatown/gather-room/list/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setRoomsArr(data);
        // console.log("방별");
        // console.log(data);
      });

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

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

  // function filteredPost(postArr) {
  //   if (selectedCategory)
  //     return postArr.filter(
  //       (el) =>
  //         getCategorybyID(el.gather_room_category_id).split(" ")[1] ===
  //         selectedCategory
  //     );

  //   return postArr;
  // }

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ForeaTown</Text>
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
            {roomsArr.reverse().map((item, i) => (
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // alignSelf: "flex-start",
    // width: "95%",
    marginTop: 40,
    paddingHorizontal: 30,
    // borderWidth: 1,
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
  banner: {
    backgroundColor: "#8587DC",
    height: 50,
  },
  main: {
    flex: 1,
  },
});
