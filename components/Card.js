import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

function Card({ item }) {
  const navigation = useNavigation();
  // console.log(item);

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
      <Text style={styles.heartIcon}>❤{item.id}</Text>
      <View style={styles.detail}>
        <Text style={styles.category}>
          {getCategorybyID(item.gather_room_category)}
        </Text>
        <View style={styles.detailUpper}>
          <Text style={styles.textBold}>{item.subject}</Text>
          {item.gather_room_category !== 2 &&
            item.gather_room_category !== 3 && (
              <Text style={styles.text}>
                📅 {item.date_time && item.date_time.split("T")[0]}
              </Text>
            )}
          <Text style={styles.text}>
            <Text style={styles.isOnlineTxt}>
              {item.is_online ? " on " : " off "}
            </Text>{" "}
            {item.address}
          </Text>
        </View>
        <View style={styles.detailUnder}>
          <Text>
            👥 {item.participants_count}/{item.user_limit}
          </Text>
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
    width: "100%",
  },

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
  },
  isOnlineTxt: {
    backgroundColor: "#6685FF",
    color: "white",
    fontSize: 12,
  },
});

export default Card;
