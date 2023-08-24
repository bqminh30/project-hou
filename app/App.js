
// import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import "./ignoreWarning";
import AppNav from "./src/navigation/AppNav";
require("moment/locale/vi");
// import useFonts from './src/config/useFonts'

export default function App() {
  // const [IsReady, SetIsReady] = useState(false);

  // const LoadFonts = async () => {
  //   await useFonts();
  // };

  // if (!IsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadFonts}
  //       onFinish={() => SetIsReady(true)}
  //       onError={(err) => {console.log('err', err)}}
  //     />
  //   );
  // }

  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
}
