import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

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
              setSelectedCategory(i + 1);
            }
          }}
          style={styles.category}
        >
          <Text
            style={
              i + 1 === selectedCategory
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
    borderBottomWidth: 2,
    borderColor: "lightgray",
    borderRadius: 50,
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-around",
    padding: 5,
  },
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
