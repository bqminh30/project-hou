import React from "react";
import { COLORS, SIZES } from "../config/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";


const stars = 5;
const VerticalHome = ({ item }) => {
  const navigation = useNavigation();

  var starPush = [];
  for (var i = 1; i <= stars; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= item.rating ? "star" : "star-o"}
        size={8}
        color={i <= item.rating ? "orange" : "black"}
        style={{ paddingRight: 4 }}
      />
    );
  }
  return (
    <TouchableOpacity key={item.id} activeOpacity={1} style={styles.component} onPress={()=> navigation.navigate("Chi tiết phòng", {
      room_id: item.id
    })}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={[styles.flex, styles.card]}>
          <Text style={styles.typeroom}> {
        (item.type_room_id === 1 && 'VIP') ||
        (item.type_room_id === 2 && 'NORMAL') ||
        (item.type_room_id === 3 && 'NEW')
      }</Text>
        </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.rating}>
          <View style={styles.rate}>{starPush}</View>
          <Text style={styles.text}>{item.rating}</Text>
        </View>
      </View>
      <View style={[styles.content, { paddingTop: 2 }]}>
        <Text style={styles.text}>
        {
        (item.label === 1 && 'Excellent') ||
        (item.label === 2 && 'Very good') ||
        (item.label === 3 && 'Exceptional') 
      }
        </Text>
        <Text style={styles.text}>{item?.totalReview} reviews</Text>
      </View>
    </TouchableOpacity>
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
    fontSize: 14,
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
    color: COLORS.gray_main,
    fontSize: 12,
  },

  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.black,
    padding: 4,
    borderRadius: SIZES.margin,
    // width: 40,
    position:'absolute',
    top:10,
    left: 10
  },
  typeroom: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    paddingRight: 4,
    textTransform: 'uppercase'
  },
});
