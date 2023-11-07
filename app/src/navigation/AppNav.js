import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";

import AppStack from "./AppStack";
import TabNavigation from "./TabNavigator";

import { initialize } from "../redux/actions/authAction";
import { getRooms, getTypeRooms } from "../redux/actions/roomAction";

const AppNav = () => {
  const { authToken, user } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const dispath = useDispatch();
  const navigation = useNavigation();

  const init = async () => {
    await dispath(initialize());
    await dispath(getRooms())
    await dispath(getTypeRooms())
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {authToken == undefined || authToken == null ? (
        <AppStack />
      ) : (
        <TabNavigation />
      )}
    </>
  );
};

export default AppNav;
