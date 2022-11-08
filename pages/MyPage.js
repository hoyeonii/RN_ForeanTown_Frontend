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

export default function MyPage() {
  const { user, setUser } = useContext(AuthContext);
  const [showRoomof, setShowRoomOf] = useState("Created");
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
            <TouchableOpacity>
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
              {gather_rooms
                .filter((el) => el.creator_id === 1)
                .map((el, i) => (
                  <Card item={el} key={i} />
                ))}
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
