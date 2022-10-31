import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../App";

export default function MyPage() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <View>
      <Text>{user} Page</Text>
      <Button
        title="Log Out"
        onPress={() => {
          setUser(null);
        }}
      />
    </View>
  );
}
