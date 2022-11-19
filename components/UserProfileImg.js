import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import defaultUserProfilePic from "../assets/defaultUserProfilePic.jpg";

const UserProfileImg = ({ img }) => {
  return (
    <View style={styles.imgWrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  //   imgWrapper: { width: "100%", height: "100%" },
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
