
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES } from "../config/theme";
import Spacer from "./Spacer";

const VerticalRecommend = ({ item, title }) => {
  const navigation = useNavigation();

  const handleFavorite = (item) => {
    console.log('item', item)
  }
  return (
    <TouchableOpacity key={item?.id} activeOpacity={1} onPress={() => {
      title === "HOME"
        ? navigation.navigate("Chi tiết phòng", {
            room_id: item.id,
          })
        : navigation.navigate("Trang chủ", {
            screen: "Chi tiết phòng",
            params: {
              room_id: item.id,
            },
          });
    }}>
      <ImageBackground
      source={{
        uri: item?.image,
      }}
      resizeMethod="auto"
      imageStyle={{borderRadius: SIZES.radius, opacity: 0.5}}
      style={styles.container}
    >
      <View style={[styles.header, styles.flex]}>
        <View style={[styles.flex, styles.card]}>
          <Text style={styles.rate}>{Number(item.rating).toPrecision(2)} </Text>
          <FontAwesome name="star" size={12} color="orange" />
        </View>

        <TouchableOpacity style={styles.heart} onPress={()=>handleFavorite(item)}>
          <FontAwesome name="heart-o" size={12} color="black" />
        </TouchableOpacity>
      </View>
      <Spacer height={120} />
      <View style={{paddingHorizontal: SIZES.margin}}>

        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.type}>
        {
        (item.label === 1 && 'Excellent') ||
        (item.label === 2 && 'Very good') ||
        (item.label === 3 && 'Exceptional') ||
        'default'
      }
        </Text>
      </View>
      <Spacer height={20} />
    </ImageBackground>
    </TouchableOpacity>
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
    marginBottom: 20,
    minHeight: 250
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
    color: COLORS.black,
  },
  type: {
    fontSize: 14,
    color: COLORS.black,
  }
});
