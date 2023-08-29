import React from "react";
import { View, Image } from "react-native";
import { SIZES } from "../config/theme";

const VerticalImage = ({ item }) => {
  return (
    <View style={{ marginRight: SIZES.margin }}>
      <Image
        source={{ uri: item?.image }}
        style={{
          height: 60,
          width: 60,
          borderRadius: SIZES.radius,
          resizeMode: "cover",
        }}
      />
    </View>
  );
};

export default VerticalImage;
