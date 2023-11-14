import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SIZES } from "../config/theme";

const VerticalImage = ({ item, handleShowImage, active, handleActive }) => {
  return (
    <View key={item?.id} style={{ marginRight: SIZES.margin, opacity: active !== item.id ? 0.4 : 1  }}>
      <TouchableOpacity onPress={()=>{
        handleShowImage(item?.name)
        handleActive(item?.id)
      }}>
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
