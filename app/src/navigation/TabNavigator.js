import { COLORS, SIZES } from "../config/theme";
import {
  Home,
  OrderScreen,
  RoomList,
  SearchScreen,
  RoomDetail,
} from "../screens";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileChange, ProfilePassword, ProfileScreen } from "../screens/Profile";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//Redux
import { useBooking } from "../redux/context/BookingContext"; //
import InformationScreen from "../screens/Order/InformationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const { booking } = useBooking();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Trang chủ") {
              iconName = focused ? "home" : "home-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
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

            if (route.name === "Tìm kiếm") {
              iconName = focused ? "search-circle" : "search-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />

      <Tab.Screen
        name="Đặt phòng"
        component={OrderScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarBadge: booking?.bookings?.length
            ? booking?.bookings?.length
            : 0,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Đặt phòng") {
              iconName = focused ? "cart" : "cart-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
      <Tab.Screen
        name="Cá nhân"
        component={ProfileScreen}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Cá nhân") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
    </Tab.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cá nhân"
        component={Home}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Cá nhân") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
      <Tab.Screen
        name="Cá nhân"
        component={Home}
        lazy={true}
        options={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Cá nhân") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: { color: "black" },
        })}
      />
    </Tab.Navigator>
  );
};
const TabNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Trang chủ">
      <Stack.Screen
        name="Trang chủ"
        component={HomeStack}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Chi tiết phòng"
        component={RoomDetail}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Information Detail"
        component={InformationScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Thông tin cá nhân"
        component={ProfileChange}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Đổi mật khẩu"
        component={ProfilePassword}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TabNavigation;
