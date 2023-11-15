import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../config/theme";

import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const stars = 5;
const VerticalOrder = ({ item }) => {
  var starPush = [];
  for (var i = 1; i <= stars; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= item.room.rating ? "star" : "star-o"}
        size={10}
        color={i <= item.room.rating ? "orange" : "black"}
        style={{ paddingRight: 4 }}
      />
    );
  }
  // console.log('item',item.room)
  return (
    <>
      <View style={styles.card}>
      <View style={styles.component}>
        <View style={styles.left}>
          <Image source={{ uri: item.room?.image }} style={styles.imageMain} />
          <View>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
              {item?.room.name}
            </Text>
            <View style={styles.rating}>
              <View style={styles.rate}>{starPush}</View>
              <Text style={styles.title}>{item?.room.rating} stars</Text>
            </View>
            <Text style={styles.title}>{item.room.totalReview} reviews</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </View>
      </View>

      <View style={{width: '90%'}}>
        <Text style={{color: COLORS.gray_main}}>
          {item.checkinDate} - {item.checkoutDate} ({item.dateCount})days
        </Text>
        <View style={[styles.flex, { flexDirection: "row-reverse" }]}>
          <Text style={{ fontSize: 14 }}>$</Text>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.total}</Text>
        </View>
      </View>
     
      </View>
    </>
  );
};

export default VerticalOrder;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: SIZES.margin
  },
  component: {
    // borderRadius: SIZES.radius,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  componentDate: {
    borderRadius: SIZES.radius,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  left: {
    width: "95%",
    flexDirection: "row",
    gap: 4,
  },
  imageMain: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins-Medium",
  },
  rating: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.gray_main,
    fontSize: 15,
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
  right: {
    width: "5%",
  },
});
