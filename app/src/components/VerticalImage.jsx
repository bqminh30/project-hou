import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SIZES } from "../config/theme";

const VerticalImage = ({ item, handleShowImage }) => {
  return (
    <View style={{ marginRight: SIZES.margin }}>
      <TouchableOpacity onPress={()=>handleShowImage(item?.name)}>
      <Image
        source={{ uri: item?.name }}
        style={{
          height: 60,
          width: 60,
          borderRadius: SIZES.radius,
          resizeMode: "cover",
        }}
      />
      </TouchableOpacity>
    </View>
  );
};

export default VerticalImage;
