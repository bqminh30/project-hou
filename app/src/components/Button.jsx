/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../config/theme";

export default function Button({ label, onPress, color, background, loading }) {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={{
        backgroundColor: background,
        borderWidth: 1,
        borderRadius: SIZES.radius * 2,
        paddingVertical: SIZES.spacing * 1.2,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: SIZES.spacing,
      }}
    >
      {loading == true && (
        <ActivityIndicator
          size="small"
          color={color}
          style={{ paddingRight: 2, fontSize: 15 }}
        />
      )}

      <Text
        style={{
          color: color,
          textAlign: "center",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
