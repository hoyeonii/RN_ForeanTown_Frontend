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

function CategoryBar({ setModalVisible }) {
  const category = ["MeetUp", "Dating", "Language", "Hiring"];
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModalVisible(true);
      }}
    >
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

export default CategoryBar;
