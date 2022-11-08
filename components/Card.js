import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";

function Card({ item }) {
  const navigation = useNavigation();

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
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.push("Detail", { id: item.id })}
    >
      {/* <Image
        style={styles.thumbnail}
        source={{
          uri: item.fields.medium_url,
        }}
      /> */}
      <Text style={styles.heartIcon}>❤</Text>
      <View style={styles.detail}>
        <Text style={styles.category}>
          {getCategorybyID(item.gather_room_category_id)}
        </Text>
        <View style={styles.detailUpper}>
          <Text style={styles.textBold}>{item.subject}</Text>
          {/* <Text style={styles.text}>{item.content}</Text> */}
          <Text style={styles.text}>📅 {item.start_date.split(" ")[0]}</Text>
          <Text style={styles.text}>📍 {item.address}</Text>
        </View>
        <View style={styles.detailUnder}>
          <Text>👥 {item.user_limit}</Text>
          <Text>👤 {item.creator_id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    marginVertical: 15,
    // marginHorizontal: 30,
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 20,
    backgroundColor: "#fff",
  },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 15,
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
  thumbnail: {
    width: 350,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },

  detail: {
    // borderWidth: 2,
    width: "100%",

    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  // detailLeft: { width: "80%" },
  //   detailRight: { borderWidth: 2 },
  detailUnder: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "grey",
    paddingTop: 10,
    marginTop: 10,
  },
  category: {
    backgroundColor: "#8587DC",
    alignSelf: "flex-start", //텍스트 길이에 맞춰 자동으로 넒이 조절
    color: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  textBold: {
    fontWeight: "600",
    paddingVertical: 5,
    fontSize: 17,
  },
  text: {
    color: "gray",
    // paddingBottom: 10,
    // overflow: "wrap",
  },
});

export default Card;
