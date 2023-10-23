import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../config/theme";
import Avatar from "../../components/Avatar";
import Spacer from "../../components/Spacer";
import Back from "../../components/Back";

import { hotel_type, hotels_data } from "../../config/data";
import VerticalOrder from "../../components/VerticalOrder";

const OrderScreen = () => {
  const [searchText, setSearchText] = React.useState("");
  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <View style={styles.header}>
            <Back />
            <Text style={styles.title}>Đơn đặt phòng</Text>
            <Avatar />
          </View>
          <Spacer height={15} />
          <FlatList
            data={hotels_data}
            scrollEventThrottle={20}
            horizontal={false}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <VerticalOrder item={item} key={item.id} />
            )}
            style={{ marginHorizontal: SIZES.padding }}
          />
          <Spacer height={4} />
          <View style={{ marginHorizontal: SIZES.padding }}>
            <Text>Total Price</Text>
            <Text>7500</Text>
          </View>
          {/* dash  */}
          <View
            style={{
              width: SIZES.width,
              height: 1,
              backgroundColor: COLORS.gray,
            }}
          ></View>
          <View style={{ marginHorizontal: SIZES.padding }}>
            <Text> Contact Info</Text>
            <View
              style={{
                backgroundColor: value,
                borderBottomColor: "#000000",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                style={{ padding: 10 }}
              />
            </View>
            <View
              style={{
                backgroundColor: value,
                borderBottomColor: "#000000",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                style={{ padding: 10 }}
              />
            </View>
            <View
              style={{
                backgroundColor: value,
                borderBottomColor: "#000000",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                style={{ padding: 10 }}
              />
            </View>
          </View>

          {/* dash  */}
          <View
            style={{
              width: SIZES.width,
              height: 1,
              backgroundColor: COLORS.gray,
            }}
          ></View>
          {/* select payment method */}
          <View style={{ marginHorizontal: SIZES.padding }}>
            <View>
              <Text>Thanh toan chuyen khoan</Text>
            </View>
            <View>
              <Text>Thanh toan paypal</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
  },
  content: {
    marginHorizontal: SIZES.padding,
  },
  name: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "Poppins-Bold",
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    height: 46,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
  },
  imageStyle: {
    padding: 8,
  },
});
