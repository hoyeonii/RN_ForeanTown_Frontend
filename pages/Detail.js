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
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { gather_rooms } from "../data/dummydata";
import UserProfileImg from "../components/UserProfileImg";
import rootUrl from "../data/rootUrl";
import ShowImage from "../components/ShowImage";
import { AuthContext } from "../App";
import Post from "./Post";
import { useNavigation } from "@react-navigation/core";

function Detail({ route }) {
  const [data, setData] = useState({});
  const [showImageUri, setShowImageUri] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [joined, setJoined] = useState(0);
  const { user, setUser, accessToken, userId } = useContext(AuthContext);
  const navigate = useNavigation();

  useEffect(() => {
    loadData();

    checkIfJoined();
  }, []);

  function loadData() {
    fetch(`${rootUrl}/foreatown/gather-room/${route.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log("detailData");
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function checkIfJoined() {
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(`${rootUrl}/foreatown/gather-room/reservation/list`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setJoined(data.find((el) => el.gather_room.id === route.params.id)?.id);
      })
      .catch((err) => console.log(err));
  }

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

  function handleDelete() {
    console.log(data.id);
    const requestOption = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(`${rootUrl}/foreatown/gather-room/${data.id}`, requestOption)
      .then((res) => {
        console.log(res.status);
        console.log("삭제완료!", data.id, data.subject);
      })
      .catch((err) => console.log(err))
      .finally(() => navigate.push("Main"));
  }

  function DeleteModal() {
    return (
      <View style={styles.deleteModalWrapper}>
        <View style={styles.deleteModal}>
          <Text style={styles.deleteModalTxt}>
            Do you want to delete the post?
          </Text>
          <View style={styles.deleteModalBtn}>
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => setOpenDeleteModal(false)}
            >
              <Text style={styles.joinBtnTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => handleDelete()}
            >
              <Text style={styles.joinBtnTxt}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function handleJoin() {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ gather_room_id: data.id }),
    };

    fetch(`${rootUrl}/foreatown/gather-room/reservation`, requestOption)
      .then((res) => {
        console.log(res.status);
        if (res.status < 400) Alert.alert("Joined");
      })
      .catch((err) => console.log(err));
  }
  function handleUnjoin() {
    const requestOption = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(
      `${rootUrl}/foreatown/gather-room/reservation/${joined}`,
      requestOption
    )
      .then((res) => {
        console.log(res.status);
        console.log(route.params.id);
        if (res.status < 400) Alert.alert("Unjoined");
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      {data.gather_room_category && (
        <Text style={styles.title}>
          {data.gather_room_category.name}
          {joined}
        </Text>
      )}

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.fontL}>{data.subject}</Text>
          {data.address && <Text style={styles.street}>📍 {data.address}</Text>}
          {data.gather_room_category &&
            (data.gather_room_category.name === "MeetUp" ||
              data.gather_room_category.name === "Language") && (
              <Text style={styles.street}>
                📅 {data.gather_room_category_id === 4 && "~"}
                {data.date_time && data.date_time.split("T")[0]}
              </Text>
            )}
          <Text style={styles.street}>👥 {data.user_limit}</Text>
        </View>

        <View style={[styles.section, styles.content]}>
          <Text style={styles.text}>{data.content}</Text>
          <View style={styles.attachmentWrapper}>
            {data.gather_room_images?.length > 0 &&
              data.gather_room_images?.map((el, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setShowImageUri(el.img_url);
                  }}
                >
                  <Image
                    style={styles.attachment}
                    source={{
                      uri: el.img_url,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.fontM}>Host{showImageUri}</Text>
          <TouchableOpacity
            style={styles.hostInfoWrapper}
            onPress={() => navigate.push("MyPage", { state: data.creator.id })}
          >
            <View style={styles.userPic}>
              <UserProfileImg
                img={
                  data.creator?.profile_img_url && data.creator?.profile_img_url
                }
                id={data.creator?.id}
              />
            </View>

            <Text style={styles.hostNameText}>{data.creator?.name}</Text>
          </TouchableOpacity>

          {/* //아직 참여자가 없을때는 안보여짐 */}
          {data.participants?.length > 0 && (
            <Text style={styles.fontM}>Who's coming?</Text>
          )}
          {data.participants?.length > 0 && (
            <View style={styles.whosComingWrapper}>
              {data.participants?.map((el, i) => (
                <View style={styles.userPic} key={i}>
                  <UserProfileImg img={el.profile_img_url} id={el.id} />
                </View>
              ))}
            </View>
          )}

          {data?.creator?.id !== userId ? (
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => {
                  joined ? handleUnjoin() : handleJoin();
                }}
              >
                <Text style={styles.joinBtnTxt}>
                  {joined ? "Unjoin" : "Join"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => navigate.push("Post", { data: data })}
              >
                <Text style={styles.joinBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => setOpenDeleteModal(true)}
              >
                <Text style={styles.joinBtnTxt}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {showImageUri && (
        <ShowImage
          showImageUri={showImageUri}
          setShowImageUri={setShowImageUri}
          imageArr={data.gather_room_images}
        />
      )}
      {openDeleteModal && <DeleteModal />}
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
  deleteModalWrapper: {
    marginHorizontal: 30,
    position: "absolute",
    backgroundColor: "white",
    opacity: 0.9,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  deleteModal: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8587DC",
    padding: 20,
  },
  deleteModalTxt: { fontSize: 15, textAlign: "center", marginBottom: 20 },
  deleteModalBtn: { flexDirection: "row", justifyContent: "space-between" },
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
  attachmentWrapper: { flexDirection: "row" },
  attachment: { margin: 2, width: 100, height: 100 },

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
