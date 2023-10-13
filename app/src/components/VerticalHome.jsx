import { COLORS, SIZES } from "../config/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const stars = 5;
const VerticalHome = ({ item }) => {
  var starPush = [];
  for (var i = 1; i <= stars; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= item.star ? "star" : "star-o"}
        size={8}
        color={i <= item.star ? "orange" : "black"}
        style={{ paddingRight: 4 }}
      />
    );
  }
  return (
    <View style={styles.component}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.rating}>
          <View style={styles.rate}>{starPush}</View>
          <Text style={styles.text}>{item.rate}</Text>
        </View>
      </View>
      <View style={[styles.content, { paddingTop: 2 }]}>
        <Text style={styles.text}>{item?.location}</Text>
        <Text style={styles.text}>{item?.reviews.length} reviews</Text>
      </View>
    </View>
  );
};

export default VerticalHome;

const styles = StyleSheet.create({
  component: {
    width: SIZES.width * 0.6,
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    marginRight: SIZES.padding,
  },
  image: {
    borderRadius: SIZES.radius,
    height: 180,
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    paddingTop: SIZES.default,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    fontWeight: 600,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: COLORS.gray,
    fontSize: 12,
  },
});
