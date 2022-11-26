import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import UserProfileImg from "../components/UserProfileImg";
import { useNavigation } from "@react-navigation/core";
import rootUrl from "../data/rootUrl";
import { removeData } from "../components/HandleAsyncStorage";

export default function MyPage({
  route,
  route: {
    params: { state },
  },
}) {
  myCreatedList;
  const [myCreatedList, setMyCreatedList] = useState([]);
  const [myJoinedList, setMyJoinedList] = useState([]);
  const [myInfo, setmyInfo] = useState({});
  const { userId, user, setUser, accessToken, setAccessToken, setUserId } =
    useContext(AuthContext);
  const [showRoomof, setShowRoomOf] = useState("Created");
  const navigation = useNavigation();

  useEffect(() => {
    loadMyCreatedList();
    loadMyJoinedList();
    loadMyInfo();
  }, [route]);

  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  function loadMyCreatedList() {
    fetch(`${rootUrl}/foreatown/gather-room/mylist/${state}`)
      .then((res) => res.json())
      .then((data) => {
        setMyCreatedList(data);
        console.log("created");
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
  function loadMyJoinedList() {
    fetch(`${rootUrl}/foreatown/gather-room/reservation/list`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setMyJoinedList(data);
        console.log("LoadMyjoinedList");
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function loadMyInfo() {
    fetch(`${rootUrl}/users/myinfo/${state || userId}`)
      .then((res) => res.json())
      .then((data) => {
        setmyInfo(data);
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    removeData("accessToken");
    removeData("refreshToken");
    removeData("user");
    removeData("userName");
    removeData("userName");
    setUser(null);
    setAccessToken(null);
    setUserId(null);
    navigation.push("Main");
  }

  return (
    <ImageBackground
      source={require("../assets/bg3.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          My Town{user}
          {userId}
        </Text>
        <View style={styles.profile}>
          <View>
            <Text style={styles.userName}>{myInfo?.nickname}</Text>
            <Text style={styles.userAgeNSex}>
              {" "}
              {myInfo?.age} {myInfo?.is_male ? "♂" : "♀"} | {myInfo?.country} |{" "}
              {myInfo?.location}
            </Text>
            {myInfo.id !== userId ? (
              <TouchableOpacity onPress={() => navigation.push("Chat")}>
                <Text style={styles.messageBtn}>Message</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("Additional", { userData: myInfo })
                }
              >
                <Text style={styles.messageBtn}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.userPic}>
            <UserProfileImg img={myInfo?.profile_img_url} />
          </View>
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
              {showRoomof === "Created" &&
                myCreatedList
                  .reverse()
                  .map((el, i) => <Card item={el} key={i} />)}
              {showRoomof === "Joined" &&
                myJoinedList.length > 0 &&
                myJoinedList
                  .reverse()
                  .map((el, i) => <Card item={el.gather_room} key={i} />)}
              <Button
                title="Log Out"
                onPress={() => {
                  handleSignOut();
                }}
              />
            </ScrollView>
          </View>
        </View>
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
