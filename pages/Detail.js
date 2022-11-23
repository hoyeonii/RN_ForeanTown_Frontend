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
  const { user, setUser, accessToken, userId } = useContext(AuthContext);
  const navigate = useNavigation();

  const images = [
    "https://media.istockphoto.com/id/1328831714/photo/portrait-of-a-smiling-young-african-woman.jpg?b=1&s=170667a&w=0&k=20&c=SYNQ3l6j6KKUyGMc71nMfjzscuVL7_HEXRIN9BOE0fw=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwyJXiHvSHXuLVSOLV7CYiHk0gUpsLlJZk1RjorToy&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvmrSyp3mF0eawiyNdElnwi84y_whv6OqRGM7r84&s",
    "https://i.ytimg.com/vi/2uAIlbs8WeE/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDawsCv56e-dfPM9aVoK_okr5abgQ",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN2zeOBbTbAyG4PVTaVsNi4dbfGW0WZP5t9yMONNQrjL8XvJe2nuqdQiAe0mAB9Dh-tw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1jPV9rMr4gKjhBYId6LwFrBQWyqMhMNJoB0m_7Y28qOlpokEd8wjxFuyWtFIS9dSWj58&usqp=CAU",
  ];

  const loadData = () =>
    fetch(`${rootUrl}/foreatown/gather-room/${route.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    loadData();
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

  return (
    <View style={styles.container}>
      {showImageUri && (
        <ShowImage
          showImageUri={showImageUri}
          setShowImageUri={setShowImageUri}
        />
      )}
      {data.gather_room_category && (
        <Text style={styles.title}>{data.gather_room_category.name}</Text>
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
        <View style={styles.section}>
          <Text style={styles.fontM}>Host{showImageUri}</Text>
          <TouchableOpacity
            style={styles.hostInfoWrapper}
            onPress={() => navigate.push("MyPage", { state: data.creator.id })}
          >
            <View style={styles.userPic}>
              <UserProfileImg img={data.creator?.profile_img_url} />
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
                  <UserProfileImg img={el} />
                </View>
              ))}
            </View>
          )}

          {data?.creator?.id !== userId ? (
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnTxt}>Join</Text>
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
  attachment: { marginTop: 10, width: 150, height: 150 },

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
