import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Cards from "react-credit-cards";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RadioGroup from "react-native-radio-buttons-group";
import PhoneInput from "react-native-international-phone-number";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { WebView } from "react-native-webview";
import axios from "axios";
import moment from "moment";

import { COLORS, SIZES } from "../../config/theme";
import Avatar from "../../components/Avatar";
import Spacer from "../../components/Spacer";
import Back from "../../components/Back";
import Button from "../../components/Button";
// icons
import { MaterialIcons } from "@expo/vector-icons";
// redux context
import { useBooking } from "../../redux/context/BookingContext";
//api
import paypalApi from "../../apis/paypalApi";
import queryString from "query-string";

const ReviewSummary = ({ navigation }) => {
  const [state, setState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const { booking, setStep, step } = useBooking();

  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const onPressPaypal = async () => {
    // await axios.get('https://be-nodejs-project.vercel.app/create', booking.bookings)
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(token);
      setAccessToken(token);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel == "approve");
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const webViewRef = useRef(null);

  // const handleNavigationStateChange = (newNavState) => {
  //   console.log("newNavState", newNavState);
  //   const url = newNavState.url;
  //   // Xử lý logic khi trang web thay đổi URL sau thanh toán hoặc hủy bỏ
  //   if (url.includes("https://be-nodejs-project.vercel.app/process")) {
  //     // Xử lý khi thanh toán hoàn tất
  //     // Gửi thông điệp về cho ứng dụng React Native rằng thanh toán đã thành công
  //     webViewRef.current.postMessage("paymentSuccess");
  //     clearPaypalState();
  //   } else if (url.includes("https://be-nodejs-project.vercel.app/cancel")) {
  //     // Xử lý khi thanh toán bị hủy
  //     // Gửi thông điệp về cho ứng dụng React Native rằng thanh toán đã bị hủy
  //     webViewRef.current.postMessage("paymentCancelled");
  //     clearPaypalState();
  //   }
  // };

  const onUrlChange = (webviewState) => {
    console.log("webviewStatewebviewState", webviewState);
    if (
      webviewState.url.includes("https://example.com/cancel")
    ) {
      clearPaypalState();
      return;
    }
    if (
      webviewState.url.includes("https://example.com/return")
    ) {
      
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log("my urls value 1 ", urlValues);
      const { token } = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }

    if(webviewState.title.includes("PayPal Checkout")){
      console.log('webviewState', webviewState)
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log("my urls value 2", urlValues);
      const { token } = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
    
  };

  const paymentSucess = async (id) => {
    console.log('id', id, accessToken)
    try {
      const res = paypalApi.capturePayment(id, accessToken);
      console.log("capturePayment res++++", res);
      // alert("Payment sucessfull...!!!");
      // clearPaypalState();
    } catch (error) {
      console.log("error raised in payment capture", error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <ScrollView>
                  <View style={styles.header}>
                    <Back />
                    <Text style={styles.headerTitle}>Review Summary</Text>
                    <Avatar />
                  </View>

                  <Spacer height={10} />
                  <View>
                    {booking?.bookings?.map((data, index) => {
                      let formattedNumber = data.total.toFixed(2);
                      let totalNumber = (data.total + 5).toFixed(2);
                      return (
                        <View key={index}>
                          {/* Infor room  */}
                          <View style={styles.card}>
                            <Image
                              style={{ height: 80, width: 80, borderRadius: 8 }}
                              source={{ uri: data?.room?.image }}
                            />
                            <View
                              style={[
                                styles.flex,
                                {
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                },
                              ]}
                            >
                              <View
                                style={{
                                  marginLeft: 10,
                                  width: "70%",
                                }}
                              >
                                <Text style={styles.name}>
                                  {data?.room?.name}
                                </Text>
                                <Text style={styles.type}>
                                  {(data?.room?.label === 1 && "Excellent") ||
                                    (data?.room?.label === 2 && "Very good") ||
                                    (data?.room?.label === 3 &&
                                      "Exceptional") ||
                                    "default"}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.flexCol,
                                  { justifyContent: "center" },
                                ]}
                              >
                                <Text style={styles.price}>${data?.price}</Text>
                                <Text style={styles._price}>/night</Text>
                              </View>
                            </View>
                          </View>
                          <Spacer height={8} />
                          {/* Date Order  */}
                          <View
                            style={[styles.card, { flexDirection: "column" }]}
                          >
                            <View style={styles.flexRow}>
                              <Text style={styles.title}>Check in</Text>
                              <Text style={styles._title}>
                                {data.checkinDate}
                              </Text>
                            </View>
                            <Spacer height={8} />
                            <View style={styles.flexRow}>
                              <Text style={styles.title}>Check out</Text>
                              <Text style={styles._title}>
                                {data.checkoutDate}
                              </Text>
                            </View>
                          </View>
                          <Spacer height={8} />
                          {/* Date Order  */}
                          <View
                            style={[styles.card, { flexDirection: "column" }]}
                          >
                            <View style={styles.flexRow}>
                              <Text style={styles.title}>
                                Amount ({data?.dateCount} days)
                              </Text>
                              <Text style={styles._title}>
                                ${formattedNumber}
                              </Text>
                            </View>
                            <Spacer height={8} />
                            <View style={styles.flexRow}>
                              <Text style={styles.title}>Tax</Text>
                              <Text style={styles._title}>$5</Text>
                            </View>
                            <Spacer height={8} />
                            <View
                              style={{
                                borderBottomColor: COLORS.grayDefault,
                                borderBottomWidth: 1,
                              }}
                            />
                            <Spacer height={8} />
                            <View style={styles.flexRow}>
                              <Text style={styles.title}>Total</Text>
                              <Text style={styles._title}>${totalNumber}</Text>
                            </View>
                          </View>

                          {/* Payment Method  */}
                          <Spacer height={8} />
                          <View style={styles.card}>
                            {/* <View style={styles.flexRow}> */}
                            <TouchableOpacity
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                              // onPress={() =>
                              //   handleChangeMethodPayment('paypal',!showGateway)
                              // }
                            >
                              <Image
                                style={{ height: 30, width: 30 }}
                                source={require("../../../assets/paypal.png")}
                              />
                              <Text style={{ fontWeight: 600, fontSize: 18 }}>
                                Paypal
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.outter}
                              onPress={() =>
                                navigation.navigate("Information Detail")
                              }
                            >
                              {/* {showGateway === true && showTitle == 'paypal' && ( */}

                              <Text style={styles._title}>Change</Text>
                              {/* )}  */}
                            </TouchableOpacity>
                            {/* </View> */}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.bottom}>
        <View
          style={[
            styles.flex,
            {
              marginHorizontal: SIZES.margin,
              justifyContent: "space-between",
              marginBottom: 30,
            },
          ]}
        >
          <Button
            label="Continue"
            onPress={() => onPressPaypal()}
            color={COLORS.white}
            background={COLORS.black}
            loading={isLoading}
          />
        </View>
      </View>

      <Modal visible={!!paypalUrl}>
        <TouchableOpacity
          onPress={() => clearPaypalState()}
          style={{ margin: 24, width: "8%", marginTop: 50 }}
        >
          <Text style={{ fontSize: 25, fontWeight: 600 }}>x</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <WebView
            ref={webViewRef}
            source={{ uri: paypalUrl  }}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
    </>
  );
};

export default ReviewSummary;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.main,
    fontFamily: "Poppins-Medium",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 16,
    color: COLORS.gray_main,
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.grayDefault,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: { color: COLORS.black, fontSize: 16, width: "90%" },
  bottom: {
    position: "absolute",
    bottom: 0,
    height: 100,
    width: "100%",
    backgroundColor: COLORS.white,
  },
  outter: {
    justifyContent: "center",
  },
  card: {
    marginVertical: 4,
    marginHorizontal: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    shadowColor: "#999999",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
  },

  name: { fontFamily: "Poppins-Medium", fontSize: 18 },
  price: {
    fontFamily: "Poppins-MediumItalic",
    fontSize: 22,
  },
  _title: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Poppins-Medium",
  },
  _price: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "Poppins-Thin",
  },
});
