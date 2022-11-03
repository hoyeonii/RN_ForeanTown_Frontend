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

function CategoryBar({ selectedCategory, setSelectedCategory }) {
  const category = ["MeetUp", "Dating", "Language", "Hiring"];

  return (
    <View style={styles.container}>
      {category.map((cat, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            if (cat === selectedCategory) {
              setSelectedCategory(null);
            } else {
              setSelectedCategory(cat);
            }
          }}
          style={styles.category}
        >
          <Text
            style={
              cat === selectedCategory
                ? [styles.largeText, styles.boldText]
                : styles.largeText
            }
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // width: "Dimensions.get('window').width",
    // flex: 2,
    borderBottomWidth: 2,
    borderColor: "lightgray",
    // top: 0,
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-around",
    // borderWidth: 2,
    padding: 5,
  },
  // searchWrapper: {
  //   // width: "100vw",
  //   borderColor: "gray",
  //   // borderWidth: 2,
  //   // borderRadius: 30,
  //   padding: 15,
  //   margin: 5,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  // searchBar: { width: "80%" },
  category: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  largeText: {
    fontSize: 15,
    color: "gray",
    borderBottomWidth: 3,
    borderBottomColor: "white",
    paddingBottom: 3,
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
    borderBottomWidth: 3,
    borderBottomColor: "#8587DC",
    paddingBottom: 3,
  },
});

export default CategoryBar;
