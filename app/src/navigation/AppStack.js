import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  WelcomeScreen,
  OnboardingScreen,
  SignInScreen,
  SignUpScreen,
  Home,
  RoomDetail,
  SearchScreen,
} from "../screens";
// import Login from '../screens/Login/Login';
// import LoginRules from '../screens/Login/LoginRules';
// import PasswordForgot from '../screens/Login/PasswordForgot';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  // useEffect(() => {
  //   AsyncStorage.getItem("alreadyLaunched").then((value) => {
  //     if (value === null) {
  //       AsyncStorage.setItem("alreadyLaunched", "true");
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);

  return (
    <Stack.Navigator>
      {/* {isFirstLaunch == false && (
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
      )} */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="RoomDetail"
        component={RoomDetail}
      /> */}
      <Stack.Screen 
        options={{headerShown: false}}
        name="SearchScreen"
        component={SearchScreen}
        />
    </Stack.Navigator>
  );
};

export default AppStack;
