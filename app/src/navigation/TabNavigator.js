import { Button, Image } from "react-native";
import { COLORS, SIZES } from "../config/theme";
import {Home, OrderScreen, RoomList, SearchScreen} from '../screens'

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        lazy={true}
        // component={<i class="fa fa-home" aria-hidden="true"></i>}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Trang chủ') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={'black'} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: {color: 'black'}
        })}
      />
      <Tab.Screen
        name="Tìm kiếm"
        component={SearchScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tìm kiếm') {
              iconName = focused
                ? 'search-circle'
                : 'search-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={'black'} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: {color: 'black'}
        })}
      />

<Tab.Screen
        name="Danh sách"
        component={RoomList}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Danh sách') {
              iconName = focused
                ? 'ios-list-circle'
                : 'ios-list-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={'black'} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: {color: 'black'}
        })}
      />
      <Tab.Screen
        name="Đặt phòng"
        component={OrderScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Đặt phòng') {
              iconName = focused
                ? 'cart'
                : 'cart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={'black'} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: {color: 'black'}
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
