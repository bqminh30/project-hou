// import AppLoading from 'expo-app-loading';

import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { BookingProvider } from "./src/redux/context/BookingContext";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import "./ignoreWarning";
import AppNav from "./src/navigation/AppNav";
import { useFonts } from "expo-font";
import { YellowBox } from "react-native";
require("moment/locale/vi");

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-MediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <BookingProvider>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </BookingProvider>
    </Provider>
  );
}
