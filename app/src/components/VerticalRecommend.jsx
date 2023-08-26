import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS } from "../config/theme";
import { FontAwesome } from "@expo/vector-icons";
import Spacer from "./Spacer";

const VerticalRecommend = ({ item }) => {
  return (
    <ImageBackground
      source={{
        uri: item?.image,
      }}
      resizeMethod="auto"
      imageStyle={{borderRadius: SIZES.radius}}
      style={styles.container}
    >
      <View style={[styles.header, styles.flex]}>
        <View style={[styles.flex, styles.card]}>
          <Text style={styles.rate}>{item?.rate} </Text>
          <FontAwesome name="star" size={12} color="white" />
        </View>

        <TouchableOpacity style={styles.heart}>
          <FontAwesome name="heart-o" size={12} color="black" />
        </TouchableOpacity>
      </View>
      <Spacer height={120} />
      <View style={{paddingHorizontal: SIZES.margin}}>

        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.type}>{item?.type}</Text>
      </View>
      <Spacer height={20} />
    </ImageBackground>
  );
};

export default VerticalRecommend;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    width: SIZES.width * 0.4,
    marginRight: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  header: {
    padding: SIZES.margin,
  },
  card: {
    backgroundColor: COLORS.black,
    padding: 4,
    borderRadius: SIZES.margin,
    minWidth: 36,
  },
  rate: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 600,
  },
  heart: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  name : {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.white,
  },
  type: {
    fontSize: 14,
    color: COLORS.white,
  }
});
