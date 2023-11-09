import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../config/theme";
import Avatar from "./Avatar";

const VerticalReviews = ({ item }) => {
  console.log("item", item);
  var starPush = [];
  for (var i = 1; i <= 5; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= item?.rating ? "star" : "star-o"}
        size={12}
        color={i <= item?.rating ? "orange" : "black"}
        style={{ paddingRight: 4 }}
      />
    );
  }
  return (
    <View key={item?.email} style={styles.container}>
      <View style={[styles.flex, {justifyContent: 'space-between'}]}>
        {/* Avatar  */}
        <View style={styles.flex}>
        <Avatar />
        <View style={{marginLeft: 10}}>
          <Text>{item.fullname}</Text>
          <Text>{item.email}</Text>
        </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.flex}>{starPush}</View>
        </View>
      </View>
      <View style={styles.content}>
        <Text>{item.content}</Text>
      </View>
    </View>
  );
};

export default VerticalReviews;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginVertical: 10
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingVertical: 10
  }
});
