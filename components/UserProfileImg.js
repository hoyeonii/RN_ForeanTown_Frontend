import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import defaultUserProfilePic from "../assets/defaultUserProfilePic.jpg";
import { useNavigation } from "@react-navigation/core";

const UserProfileImg = ({ img, id }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      style={styles.imgWrapper}
      onPress={() => {
        if (id) navigate.push("MyPage", { state: id });
      }}
    >
      <Image
        style={styles.profilePic}
        source={img ? { uri: img } : defaultUserProfilePic}
      />
      <Image
        style={styles.countryFlag}
        source={{
          uri: "https://images.fineartamerica.com/images-medium-large-5/american-flag--square-wingsdomain-art-and-photography.jpg",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    borderWidth: 5,

    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  countryFlag: {
    position: "absolute",
    bottom: 0,
    borderWidth: 2,
    borderColor: "white",
    width: "35%",
    height: "35%",
    borderRadius: 50,
  },
});
export default UserProfileImg;
