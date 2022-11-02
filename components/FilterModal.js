import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

export default function FilterModal({ modalVisible, setModalVisible }) {
  const [selectedRegion, setSelectedRegion] = useState("");
  function RegionCard({ uri, title }) {
    return (
      <Pressable
        style={styles.regionCard}
        onPress={(e) => {
          setSelectedRegion(title);
        }}
      >
        <View style={title === selectedRegion && styles.imgContainer}>
          <Image source={{ uri: uri }} style={styles.regionImg} />
        </View>

        <Text>{title}</Text>
      </Pressable>
    );
  }
  return (
    <View style={styles.modal}>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="close" size={30} />
      </Pressable>
      <View style={styles.section}>
        <Text style={styles.title}>Where to?</Text>
        <View style={[styles.horizontal, styles.searchBar]}>
          <Icon style={styles.searchIcon} name="search1" size={15} />
          <TextInput placeholder="Search destinations" />
        </View>
        <ScrollView horizontal={true} style={styles.horizontal}>
          <RegionCard
            uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6v_BmqFV2htHGNQ_iQys8sMElvtnA1XL3Vg&usqp=CAU"
            title={`I'm flexible`}
          />
          <RegionCard
            uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlnaY4lKI_-o9wEn6V3H3kAqtyPShxq3fi0A&usqp=CAU"
            title={`USA`}
          />
          <RegionCard
            uri="http://imagescdn.gettyimagesbank.com/500/18/039/355/0/1001371202.jpg"
            title={`France`}
          />
          <RegionCard
            uri="http://imagescdn.gettyimagesbank.com/500/19/005/428/0/1090821884.jpg"
            title={`Korea`}
          />
        </ScrollView>
      </View>
      <View style={[styles.section, styles.horizontal]}>
        <Text>When</Text>
        <Text>Any week</Text>
      </View>
      <View style={[styles.section, styles.horizontal]}>
        <Text>Who</Text>
        <Text>Add guests</Text>
      </View>
      <View style={styles.bottom}>
        <Text>Clear all</Text>
        <Pressable style={styles.searchBtn}>
          <Text style={styles.searchText}>
            <Icon name="search1" size={15} />
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    padding: 20,
    backgroundColor: "#EEEEEE",
    height: "100%",
  },
  section: {
    padding: 25,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  title: { fontSize: 32, fontWeight: "bold" },
  horizontal: { flexDirection: "row" },
  searchBar: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  searchIcon: { marginHorizontal: 7 },
  regionCard: { margin: 10 },
  selectedRegionCard: { margin: 20, borderWidth: 2 },
  regionImg: {
    height: 120,
    width: 120,
    borderRadius: 20,
    borderWidth: 2,
    overflow: "hidden",
  },
  imgContainer: {
    overflow: "hidden",
    borderWidth: 3,
    borderRadius: 20,
  },
  bottom: {
    position: "absolute",
    bottom: 0,

    backgroundColor: "#fff",
    height: 80,
    width: "110%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchBtn: {
    backgroundColor: "#FF4545",
    padding: 12,
    borderRadius: 10,
  },
  searchText: { color: "white", fontSize: 15, fontWeight: "bold" },
});
