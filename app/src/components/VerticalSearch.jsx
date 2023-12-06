import React from "react";
import { COLORS, SIZES } from "../config/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const stars = 5;
const VerticalSearch = ({ item, title }) => {
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
  const handleFavorite = (item) => {
    console.log("item", item);
  };

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={1}
      style={styles.component}
      onPress={() => {
        title === "HOME"
          ? navigation.navigate("Chi tiết phòng", {
              room_id: item.id,
            })
          : navigation.navigate("Home", {
              screen: "Chi tiết phòng",
              params: {
                room_id: item.id,
              },
            });
      }}
    >
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={[styles.flex, styles.card, {left: 10}]}>
      <Text style={styles._rateText}>{Number(item.rating).toPrecision(2)} </Text>
          <FontAwesome name="star" size={12} color="orange" />
      </View>
      <View style={[styles.card, { right: 10, backgroundColor: 'white' }]}>
        <TouchableOpacity
          style={styles.heart}
          onPress={() => handleFavorite(item)}
        >
          <FontAwesome name="heart-o" size={12} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} textBreakStrategy="1">
          {item?.name}
        </Text>
        <View style={styles.rating}>
          <View style={styles.rate}>{starPush}</View>
          <Text style={styles.text}>{item.rating}</Text>
        </View>
      </View>
      <View style={[styles.content, { paddingTop: 2 }]}>
        <Text style={styles.text}>
          {(item.label === 1 && "Excellent") ||
            (item.label === 2 && "Very good") ||
            (item.label === 3 && "Exceptional")}
        </Text>
        <Text style={styles.text}>{item?.totalReview} reviews</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalSearch;

const styles = StyleSheet.create({
  component: {
    width: SIZES.width - 50,
    // backgroundColor:'red',
    marginBottom: 12,
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
    width: "60%",
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
  _rateText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 600,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    padding: SIZES.margin,
  },

  heart: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.black,
    padding: 4,
    borderRadius: SIZES.margin,
    // width: 40,
    position: "absolute",
    top: 10,
    // left: 10,
  },
  typeroom: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    paddingRight: 4,
    textTransform: "uppercase",
  },
});
