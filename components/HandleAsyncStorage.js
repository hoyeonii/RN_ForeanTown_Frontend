import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, val) => {
  console.log("_storeData");
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export const removeData = async (key) => {
  console.log("removeData data");
  try {
    await AsyncStorage.removeItem(key);

    console.log("done!!");
  } catch (error) {
    console.log(error);
  }
};
