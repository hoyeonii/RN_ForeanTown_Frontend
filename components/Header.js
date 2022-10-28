import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

function Header({ setModalVisible }) {
  const category = [
    "베이킹",
    "프로그래밍",
    "창업",
    "식음료",
    "교육",
    "서비스",
    "마케팅",
  ];
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <View style={styles.searchWrapper}>
        <Icon name="search1" size={20} />
        <Text>Where to?</Text>
        {/* <TextInput
          style={styles.searchBar}
          placeholder="어떤 수업이 궁금하세요?"
        /> */}
        <Icon name="filter" size={20} />
      </View>
      <View style={styles.categoryWrapper}>
        {category.map((cat, i) => (
          <Text style={styles.category} key={i}>
            {cat}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // width: "Dimensions.get('window').width",
    flex: 2,
    borderBottomWidth: 2,
    borderColor: "lightgray",
    // top: 0,
  },
  searchWrapper: {
    // width: "100vw",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: { width: "80%" },
  categoryWrapper: {
    flexDirection: "row",
    alignSelf: "center",
  },
  category: {
    padding: 7,
  },
});

export default Header;
