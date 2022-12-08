import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  ImageBackground,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import CategoryBar from "../components/CategoryBar";
import rootUrl from "../data/rootUrl";

export default function App() {
  const [roomsArr, setRoomsArr] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const loadData = () =>
    //카테고리별로
    //     fetch(
    //   `${rootUrl}/foreatown/gather-room/list/${selectedCategory}?page=${pageNum}`
    // )

    //최신순
    fetch(
      `${rootUrl}/foreatown/gather-room/list?order_by=latest&page=${pageNum}`
    )
      .then((res) => res.json())
      .then((data) => {
        pageNum === 1
          ? setRoomsArr(data.results)
          : setRoomsArr([...roomsArr, ...data.results]);
        setNextPage(data.next ? true : false);
      });

  useEffect(() => {
    loadData();
  }, [selectedCategory, pageNum]);

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
          setPageNum={setPageNum}
        />
        <View style={styles.main}>
          <ScrollView>
            <StatusBar style="auto" />
            {roomsArr.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </ScrollView>
        </View>
        {hasNextPage && (
          <TouchableOpacity
            onPress={() => {
              console.log(roomsArr);
              setPageNum((prev) => prev + 1);
            }}
          >
            <Text style={styles.moreBtn}>More</Text>
          </TouchableOpacity>
        )}
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
  moreBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});
