// import AppLoading from 'expo-app-loading';

import "react-native-gesture-handler";
import "./ignoreWarning";

import React, { useCallback, useEffect, useState } from "react";

import AppNav from "./src/navigation/AppNav";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

require("moment/locale/vi");


export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-MediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <View onLayout={onLayoutRootView}>
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
    // </View>
  );
}
