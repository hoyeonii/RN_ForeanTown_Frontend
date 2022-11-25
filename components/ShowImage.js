import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function ShowImage({ showImageUri, setShowImageUri, imageArr }) {
  console.log("imageArr");
  console.log(imageArr);
  return (
    <View style={styles.container}>
      <Image
        style={styles.showImage}
        source={{
          uri: showImageUri,
        }}
      />

      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => {
          setShowImageUri(null);
        }}
      >
        <Text>X</Text>
      </TouchableOpacity>
      <View style={styles.thumbnailWrapper}>
        {imageArr?.map((el, i) => (
          <TouchableOpacity key={i} onPress={() => setShowImageUri(el.img_url)}>
            <Image style={styles.thumbnail} source={{ uri: el.img_url }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    marginHorizontal: 30,
    backgroundColor: "white",
  },

  showImage: {
    resizeMode: "contain",
    flex: 1,
  },
  closeBtn: {
    position: "absolute",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: "#6685FF",
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center",
    top: 20,
    right: 0,
    backgroundColor: "white",
  },
  thumbnailWrapper: { flexDirection: "row", alignSelf: "center" },
  thumbnail: { width: 100, height: 100, margin: 2 },
});
