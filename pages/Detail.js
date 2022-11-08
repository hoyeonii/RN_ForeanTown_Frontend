import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Button,
  Linking,
  BackHandler,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { gather_rooms } from "../data/dummydata";
import UserProfileImg from "../components/UserProfileImg";
function Detail({ route }) {
  const [data, setData] = useState("");
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvmrSyp3mF0eawiyNdElnwi84y_whv6OqRGM7r84&s",
    "https://i.pinimg.com/custom_covers/222x/646970371409284325_1605326183.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwyJXiHvSHXuLVSOLV7CYiHk0gUpsLlJZk1RjorToy&s",
    "https://i.ytimg.com/vi/2uAIlbs8WeE/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDawsCv56e-dfPM9aVoK_okr5abgQ",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN2zeOBbTbAyG4PVTaVsNi4dbfGW0WZP5t9yMONNQrjL8XvJe2nuqdQiAe0mAB9Dh-tw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1jPV9rMr4gKjhBYId6LwFrBQWyqMhMNJoB0m_7Y28qOlpokEd8wjxFuyWtFIS9dSWj58&usqp=CAU",
  ];
  // const loadData = () =>
  //   fetch(
  //     "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_rate&facet=host_verifications&facet=city&facet=property_type&facet=cancellation_policy&facet=features"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(
  //         data.records.find((el) => el.fields.id === route.params.id).fields
  //       );
  //     })
  //     .catch((err) => console.log(err));

  useEffect(() => {
    setData(gather_rooms.find((el) => el.id === route.params.id));
  }, []);

  const handleLinking = useCallback(async (url) => {
    console.log("rhrkhk");
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("noooooooooooooo");
    }
  });

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
    <View style={styles.container}>
      <Text style={styles.title}>
        {getCategorybyID(data.gather_room_category_id)}
      </Text>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.fontL}>{data.subject}</Text>
          <Text style={styles.street}>📍 {data.address}</Text>
          <Text style={styles.street}>
            📅 {data.start_date && data.start_date.split(" ")[0]}
          </Text>
          <Text style={styles.street}>👥 {data.user_limit}</Text>
        </View>

        <View style={[styles.section, styles.content]}>
          <Text style={styles.text}>{data.content}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.fontM}>Host</Text>
          <View style={styles.hostInfoWrapper}>
            <View style={styles.userPic}>
              <UserProfileImg
                img={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvmrSyp3mF0eawiyNdElnwi84y_whv6OqRGM7r84&s"
                }
              />
            </View>
            <Text style={styles.hostNameText}>Felix Navidad</Text>
          </View>

          {/* //아직 참여자가 없을때는 안보여짐 */}
          {images.length > 1 && <Text style={styles.fontM}>Who's coming?</Text>}
          {images.length > 1 && (
            <View style={styles.whosComingWrapper}>
              {images.map((el, i) => (
                <View style={styles.userPic} key={i}>
                  <UserProfileImg img={el} />
                </View>
              ))}
            </View>
          )}

          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnTxt}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnTxt}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
    paddingHorizontal: 30,
    borderColor: "red",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  section: {
    paddingVertical: 20,
  },
  content: {
    borderBottomWidth: 1,
    borderTopWidth: 1,

    borderColor: "lightgray",
  },
  fontL: { fontSize: 20, fontWeight: "bold", paddingBottom: 10 },
  fontM: { fontSize: 20, fontWeight: "bold", paddingBottom: 10 },

  text: { lineHeight: 22, fontSize: 15 },
  textBold: { textDecorationLine: "underline", fontWeight: "bold" },
  user: { fontWeight: "bold", fontSize: 20, width: "80%" },
  whosComingWrapper: { flexDirection: "row", marginBottom: 20 },

  userPic: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "lightgray",
  },
  hostInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },

  btnWrapper: { flexDirection: "row", justifyContent: "space-between" },
  joinBtn: {
    width: "40%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#8587DC",
  },
  joinBtnTxt: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  hostNameText: { marginLeft: 10, fontSize: 15 },
});
export default Detail;
