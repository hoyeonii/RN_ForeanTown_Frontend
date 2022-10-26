import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Linking,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
function Detail({ route }) {
  const [data, setData] = useState("");
  const loadData = () =>
    fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_rate&facet=host_verifications&facet=city&facet=property_type&facet=cancellation_policy&facet=features"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(
          data.records.find((el) => el.fields.id === route.params.id).fields
        );
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    loadData();
  }, []);

  const handleLinking = useCallback(async (url) => {
    console.log("rhrkhk");
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("noooooooooooooo");
    }
  });

  return (
    <SafeAreaView>
      <View>
        <Image style={styles.mainPic} source={{ uri: data.xl_picture_url }} />
      </View>
      <View style={styles.detail}>
        <View style={styles.section}>
          <Text style={styles.title}>{data.neighbourhood_cleansed}</Text>
          <Text style={styles.review}>
            ⭐{" "}
            {data.review_scores_value
              ? (data.review_scores_value / data.number_of_reviews).toFixed(1)
              : "New"}
            {" · "}
            <Text style={styles.review_num}>
              {data.number_of_reviews} reviews
            </Text>
          </Text>
          <Text style={styles.street}>{data.street}</Text>
        </View>

        <View style={[styles.section, styles.horizontal]}>
          <Text style={styles.user}>
            {data.property_type} hosted by {"\n"}
            {data.host_name}
          </Text>

          <Image
            style={styles.userPic}
            source={{
              uri: data.host_thumbnail_url,
            }}
          />
        </View>
        <View style={styles.section}>
          <Image
            style={styles.aircoverPic}
            source={{
              uri: "https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg",
            }}
          />
          <Text>{data.summary}</Text>
          <Text
            onPress={() => handleLinking("https://www.airbnb.com/aircover")}
          >
            Learn more
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  detail: { paddingHorizontal: 20 },

  mainPic: { height: 300 },
  section: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 20,
  },
  horizontal: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 25, fontWeight: "bold", paddingBottom: 10 },
  review_num: { textDecorationLine: "underline", fontWeight: "bold" },
  user: { fontWeight: "bold", fontSize: 20, width: "80%" },
  userPic: {
    height: 55,
    width: 55,
    borderRadius: 50,
    backgroundColor: "lightgray",
  },
  aircoverPic: {
    width: "55%",
    height: 40,
    paddingBottom: 20,
  },
});
export default Detail;
