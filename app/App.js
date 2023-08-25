
// import AppLoading from 'expo-app-loading';
import React, { useState ,useCallback, useEffect} from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import "./ignoreWarning";
import AppNav from "./src/navigation/AppNav";
require("moment/locale/vi");
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
// import useFonts from './src/config/useFonts'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(()=> {
    onLayoutRootView()
  },[])

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
