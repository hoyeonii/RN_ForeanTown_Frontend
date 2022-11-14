import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import { gather_rooms, userData } from "../data/dummydata";
import UserProfileImg from "../components/UserProfileImg";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage() {
  const { user, setUser } = useContext(AuthContext);
  const [showRoomof, setShowRoomOf] = useState("Created");
  const navigation = useNavigation();

  const created_rooms = [
    {
      id: 1,
      subject: "한독커플 있으신가요(kor-ger couple)",
      content:
        "서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!",
      link_url: "httpsrij:fqreifoieqrf.com",
      address: "홍대",
      is_online: true,
      user_limit: 5,
      start_date: "2022-12-01 00:00:00",
      end_date: "2022-01-02 00:00:00",
      start_time: "2022-01-01 00:00:00",
      end_time: "2022-01-02 00:00:00",
      creator_id: "잠실물주먹",

      gather_room_category_id: 1, //카테고리별 id 정하기
      // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
    },
    {
      id: 2,
      subject: "Looking for language exchange! Spanish(me)-Korean(you)",
      content:
        "As of PostgreSQL 12 you can use the GENERATED column definitions for an auto-updated read-only field (with some restrictions)     ALTER TABLE table      ADD COLUMN area_calc FLOAT GENERATED ALWAYS AS ( ST_Area(geom)/10000 ) STORED    Values generated from simple intra-row calculations which will never participate in filter conditions or joins are a good fit for dynamic (and lazy) evaluation, e.g. this approach or as part of a View.",
      link_url: "httpsrij:fqreifoieqrf.com",
      address: "서울숲",
      user_limit: 1,
      male_ratio: 0,
      start_date: "2022-11-23 00:00:00",
      end_date: "2022-01-02 00:00:00",
      start_time: "2022-01-01 00:00:00",
      end_time: "2022-01-02 00:00:00",
      creator_id: "잠실물주먹",
      gather_room_category_id: 3, //카테고리별 id 정하기
      // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
    },

    {
      id: 13,
      subject: "독일 통일기념일 같이 축하해요!",
      content:
        "통일기념일로 남편이랑 독일친구들 불러서 놀건데 관심있으신 독일인이나 한독커플 연락주세요:)",
      link_url: "httpsrij:fqreifoieqrf.com",
      address: "Gangnam",
      is_online: false,
      user_limit: 6,
      male_ratio: 0,
      start_date: "2022-11-11 00:00:00",
      end_date: "2022-01-02 00:00:00",
      start_time: "2022-01-01 00:00:00",
      end_time: "2022-01-02 00:00:00",
      creator_id: "잠실물주먹",
      gather_room_category_id: 1, //카테고리별 id 정하기
      // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
    },
  ];

  const removeData = async (key) => {
    console.log("removeData data");
    try {
      await AsyncStorage.removeItem(key);
      navigation.push("Main");

      console.log("done!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.title}>My Town</Text>
        {/* <Text>{user} Page</Text> */}
        <View style={styles.profile}>
          <View>
            <Text style={styles.userName}>{userData.nickname}</Text>
            <Text style={styles.userAgeNSex}>
              {" "}
              {userData.age} {userData.is_male ? "♂" : "♀"}
            </Text>
            <TouchableOpacity onPress={() => navigation.push("Chat")}>
              <Text style={styles.messageBtn}>Message</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userPic}>
            <UserProfileImg img={userData.profile_img_url} />
          </View>

          {/* <Image
          style={styles.userPic}
          source={{
            uri: userData.profile_img_url,
          }}
        /> */}
        </View>
        <View style={styles.myRoom}>
          <View style={styles.roomBtn}>
            <TouchableOpacity
              onPress={() => {
                setShowRoomOf("Created");
              }}
            >
              <Text
                style={
                  showRoomof === "Created"
                    ? styles.selectedRoom
                    : styles.notSelectedRoom
                }
              >
                Created
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowRoomOf("Joined");
              }}
            >
              <Text
                style={
                  showRoomof === "Joined"
                    ? styles.selectedRoom
                    : styles.notSelectedRoom
                }
              >
                Joined
              </Text>
            </TouchableOpacity>
            {/* <Text>{showRoomof}</Text> */}
          </View>
          {/* {방 맵핑해서 보여주기} */}
          <View style={styles.rooms}>
            <ScrollView style={styles.roomsScroll}>
              {created_rooms
                // .filter((el) => el.creator_id === 1)
                .map((el, i) => (
                  <Card item={el} key={i} />
                ))}
              <Button
                title="Log Out"
                onPress={() => {
                  removeData("token");
                  setUser(null);
                }}
              />
            </ScrollView>
          </View>
        </View>
        {/* <Button
        title="Log Out"
        onPress={() => {
          setUser(null);
        }}
      /> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 30,
    borderColor: "red",
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
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#8587DC",
    marginBottom: 40,
    backgroundColor: "white",
  },
  userName: { fontWeight: "bold", fontSize: 20 },
  userAgeNSex: { fontSize: 15 },
  messageBtn: {
    padding: 8,
    marginTop: 10,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#8587DC",
    color: "white",
    fontWeight: "bold",
  },
  userPic: { width: 70, height: 70 },
  myRoom: { flex: 1 },
  roomBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  selectedRoom: {
    fontWeight: "bold",
    borderBottomColor: "white",

    color: "white",
    fontSize: 17,
    borderBottomWidth: 5,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  notSelectedRoom: {
    borderBottomColor: "transparent",

    color: "white",
    fontSize: 17,
    borderBottomWidth: 5,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
