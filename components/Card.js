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

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.push("Detail", { id: item.fields.id })}
    >
      <Image
        style={styles.thumbnail}
        source={{
          uri: item.fields.medium_url,
        }}
      />
      <View style={styles.detail}>
        <View style={styles.detailLeft}>
          <Text style={styles.textBold}>{item.fields.smart_location}</Text>
          <Text style={styles.text}>{item.fields.name}</Text>
          <Text style={styles.textBold}>€ {item.fields.price} / night</Text>
        </View>
        <View style={styles.detailRight}>
          <Text>
            ⭐{" "}
            {item.fields.review_scores_value
              ? (
                  item.fields.review_scores_value /
                  item.fields.number_of_reviews
                ).toFixed(1)
              : "New"}
          </Text>
        </View>
      </View>
      <Text style={styles.heartIcon}>❤</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: { alignItems: "center", marginVertical: 20 },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 40,
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
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLeft: { width: "80%" },
  //   detailRight: { borderWidth: 2 },
  textBold: {
    fontWeight: "600",
  },
  text: {
    color: "gray",
    paddingBottom: 10,
    // overflow: "wrap",
  },
});

export default Card;
