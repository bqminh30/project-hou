import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../config/theme";
import Avatar from "./Avatar";

const VerticalReviews = ({ item }) => {
  console.log("item", item);
  var starPush = [];
for (var i = 1; i <= 5; i++) {
  if (i <= item?.rating) {
    starPush.push(
      <FontAwesome
        key={i}
        name="star"
        size={12}
        color="orange"
        style={{ paddingRight: 4 }}
      />
    );
  } else if (item?.rating % 1 !== 0) {
    // Check if the rating is not a whole number (i.e., it has a decimal part)
    starPush.push(
      <FontAwesome
        key={i}
        name="star-half"
        size={12}
        color="orange"
        style={{ paddingRight: 4 }}
      />
    );
  } else {
    starPush.push(
      <FontAwesome
        key={i}
        name="star-o"
        size={12}
        color="black"
        style={{ paddingRight: 4 }}
      />
    );
  }
}

  const dateConvert = moment(item.createdAt).fromNow() 
  return (
    <View key={item?.email} style={styles.container}>
      <View style={[styles.flex, {justifyContent: 'space-between'}]}>
        {/* Avatar  */}
        <View style={styles.flex}>
        <Avatar />
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>{item.fullname}</Text>
          <Text style={styles.date}>{dateConvert}</Text>
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
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray,
    marginVertical: 10
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingVertical: 10
  },
  name: {
    fontFamily: "Poppins-MediumItalic",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.black,
  },
  date: {
    fontFamily: "Poppins-MediumItalic",
    fontSize: 12,
    color: COLORS.gray_main,
  }
});
