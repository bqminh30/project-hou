import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../config/theme";

const ButtonSearch = ({ float, label, color, background, onPress }) => {
  return (
    <View style={{ alignItems: "flex-end" }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: background }]}
        onPress={onPress}
      >
        <Text
          style={{
            color: color,
            fontSize: 12,
            fontFamily: "Poppins-Medium",
            paddingRight: 4,
            padding: 8,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSearch;
const styles = StyleSheet.create({
  button: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: SIZES.radius * 0.8,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    width: 120,
  },
});
