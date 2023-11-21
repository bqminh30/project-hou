import React, { useState, useEffect, useMemo } from "react";
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

  console.log("booking", booking);

  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const fetchCardDetail = (cardDetail) => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onDone = async () => {
    let apiData = {
      amount: 500,
      currency: "INR",
    };

    try {
      const res = await creatPaymentIntent(apiData);
      console.log("payment intent create succesfully...!!!", res);

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = await confirmPayment(
          res?.data?.paymentIntent,
          { paymentMethodType: "Card" }
        );
        console.log("confirmPaymentIntent res++++", confirmPaymentIntent);
        alert("Payment succesfully...!!!");
      }
    } catch (error) {
      console.log("Error rasied during payment intent", error);
    }

    // console.log("cardInfocardInfocardInfo", cardInfo)
    // if (!!cardInfo) {
    //     try {
    //         const resToken = await createToken({ ...cardInfo, type: 'Card' })
    //         console.log("resToken", resToken)

    //     } catch (error) {
    //         alert("Error raised during create token")
    //     }
    // }
  };

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(token);
      setAccessToken(token);
      console.log("res++++++", res);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel == "approve");
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState) => {
    console.log("webviewStatewebviewState", webviewState);
    if (
      webviewState.url.includes("https://be-nodejs-project.vercel.app/cancel")
    ) {
      clearPaypalState();
      return;
    }
    if (
      webviewState.url.includes("https://be-nodejs-project.vercel.app/process")
    ) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log("my urls value", urlValues);
      const { token } = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async (id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken);
      console.log("capturePayment res++++", res);
      alert("Payment sucessfull...!!!");
      clearPaypalState();
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
                    <Text>Review Summary</Text>
                    <Avatar />
                  </View>

                  <Spacer height={10} />
                  <View>
                    {booking?.bookings?.map((data, index) => {
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
                                  backgroundColor: "red",
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
                              <Text style={styles.price}>
                                $
                                {data?.room?.priceSale
                                  ? data?.room?.priceSale
                                  : data?.room?.price}{" "}
                                <Text style={styles._price}>
                                  {data?.room?.priceSale
                                    ? data?.room?.price
                                    : ""}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins-MediumItalic",
                                  }}
                                >
                                  /night
                                </Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  {/* <Cards
          cvc={state.cvc}
          expiry={state.expiry}
          focused={state.focus}
          name={state.name}
          number={state.number}
        /> */}
                </ScrollView>
              </SafeAreaView>
            </View>
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <View style={styles.bottom}>
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
            loading={false}
          />
        </View>
      </View> */}

      <Modal visible={!!paypalUrl}>
        <TouchableOpacity onPress={()=>clearPaypalState()} style={{ margin: 24,width:'8%', marginTop:50 }}>
          <Text style={{fontSize:25, fontWeight:600}}>x</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: paypalUrl }}
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
  title: {
    fontSize: 16,
    color: COLORS.main,
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
  inner: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.black,
    borderRadius: 10,
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dotline: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    color: COLORS.gray,
  },
  name: { fontFamily: "Poppins-Medium", fontSize: 18 },
  price: {
    fontFamily: "Poppins-MediumItalic",
    fontSize: 24,
  },
  _title: {
    fontSize: 16,
    fontWeight: 600,
    paddingHorizontal: 22,
  },
  _price: {
    fontSize: 16,
    fontFamily: "Poppins-Thin",
    textDecorationLine: "line-through",
  },
});
