import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WelcomeScreen, OnboardingScreen } from "../screens";
// import Login from '../screens/Login/Login';
// import LoginRules from '../screens/Login/LoginRules';
// import PasswordForgot from '../screens/Login/PasswordForgot';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {isFirstLaunch == false && (
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
      )}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
