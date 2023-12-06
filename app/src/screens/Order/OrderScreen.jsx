import React, { useState, useEffect } from "react";
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
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../config/theme";
import Avatar from "../../components/Avatar";
import Spacer from "../../components/Spacer";
import Back from "../../components/Back";
import VerticalOrder from "../../components/VerticalOrder";

// redux context
import { useBooking } from "../../redux/context/BookingContext";

const calculateTotalSum = (bookings) => {
  let totalSum = 0;
  if (!bookings) {
    return totalSum;
  } else {
    bookings?.forEach((booking) => {
      totalSum += booking.total;
    });
  }

  return totalSum;
};

const OrderScreen = () => {
  const { value, setValue } = useState("");
  const { booking } = useBooking();

  const sumTotal = calculateTotalSum(booking?.bookings);

  if (booking == null) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Not order booking</Text>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
    <ScrollView
        style={{ flex: 1 ,backgroundColor: COLORS.white}}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
      >
      <GestureHandlerRootView style={styles.safeview}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View>
                  <View style={styles.header}>
                    <Back />
                    <Text style={styles.title}>Đơn Order Room</Text>
                    <Avatar />
                  </View>
                  <Spacer height={10} />
                  <FlatList
                    data={booking?.bookings}
                    scrollEventThrottle={20}
                    horizontal={false}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item, index }) => (
                      <VerticalOrder item={item} key={item.id} />
                    )}
                    style={{ marginBottom: 10 }}
                  />
                  <Spacer height={4} />
                  <View style={{ marginHorizontal: SIZES.padding }}>
                    <Text style={styles.total}>Total</Text>
                    <Text
                      style={[styles.total, { fontFamily: "Poppins-Bold" }]}
                    >
                      {sumTotal} $
                    </Text>
                  </View>
                  {/* dash  */}
                  <View
                    style={{
                      height: 1,
                      backgroundColor: COLORS.gray,
                      // marginHorizontal: SIZES.padding,
                    }}
                  ></View>
                  <Spacer height={10} />
                  <View style={{ marginHorizontal: SIZES.margin }}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {" "}
                      Contact Info
                    </Text>

                    <View>
                      <TextInput
                        editable
                        outlined
                        maxLength={40}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.gray_main}
                        // onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />

                      <TextInput
                        editable
                        outlined
                        placeholder="Email"
                        placeholderTextColor={COLORS.gray_main}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />

                      <TextInput
                        editable
                        outlined
                        placeholder="Phone Number"
                        placeholderTextColor={COLORS.gray_main}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />
                      <TextInput
                        editable
                        outlined
                        placeholder="Code"
                        placeholderTextColor={COLORS.gray_main}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />
                    </View>
                  </View>

                  {/* dash  */}
                  <Spacer height={15}/>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: COLORS.gray,
                      // marginHorizontal: SIZES.padding,
                    }}
                  ></View>
                  <Spacer height={10} />
                  <View style={{ marginHorizontal: SIZES.margin }}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {" "}
                      Contact Info
                    </Text>

                    <View>
                      <TextInput
                        editable
                        outlined
                        maxLength={40}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.gray_main}
                        // onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />

                      <TextInput
                        editable
                        outlined
                        placeholder="Email"
                        placeholderTextColor={COLORS.gray_main}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />

                      <TextInput
                        editable
                        outlined
                        placeholder="Phone Number"
                        placeholderTextColor={COLORS.gray_main}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />
                      <TextInput
                        editable
                        outlined
                        placeholder="Code"
                        placeholderTextColor={COLORS.gray_main}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        style={styles.input}
                      />
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
      </ScrollView>
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
    fontWeight: 600,
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
  total: {
    textAlign: "right",
    fontWeight: 700,
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  input: {
    height: 40,
    marginVertical: 6,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 4,
    padding: 10,
  },
});
