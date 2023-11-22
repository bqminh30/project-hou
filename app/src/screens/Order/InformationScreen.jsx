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
// icons
import { MaterialIcons } from "@expo/vector-icons";
// redux context
import { useBooking } from "../../redux/context/BookingContext";
import Button from "../../components/Button";

const InformationScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    fullname: "Bùi Quang Minh",
    email: "bqminh30@gmail.com",
    birthday: "30/10/2001",
    code: "0000",
    phone: "0362592858",
    gender: "1",
  });

  const { booking, setStep, step, saveBooking } = useBooking();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedId, setSelectedId] = useState("1");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  console.log("selectedId", selectedId, step);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("DD/MM/yyyy");
    setValue({
      ...value,
      birthday: formattedDate,
    });
    hideDatePicker();
  };

  const handleInputChange = (fieldName, text) => {
    setValue({
      ...value,
      [fieldName]: text,
    });
  };

  const handlePayPal = (data) => {
    console.log("data", data);
    if (
      data.url.includes("https://38a4-42-118-135-44.ngrok-free.app/process")
    ) {
      setStatus("Complete");
      setShowGateway(false);
    } else if (data.title === "cancel") {
      setStatus("Cancelled");
    } else return;
  };

  const handleChangeMethodPayment = (title, status) => {
    if (title == "paypal") {
      setShowGateway(status);
      setShowTitle(title);
    }
  };

  console.log('showTitle', showTitle)

  const handleChangeScreen = (step) => {
    console.log("value", value);
    if (step === 0) {
      saveBooking({ ...booking, profile: value });
      setStep(1);
    }
    if(step === 1){
      saveBooking({...booking, method: showTitle})
      navigation.navigate("Review Summary")
    }
    // navigation.navigate("Review Summary")
  };

  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Male",
        value: "male",
      },
      {
        id: "2",
        label: "Female",
        value: "female",
      },
      {
        id: "0",
        label: "Others",
        value: "others",
      },
    ],
    []
  );

  // if (booking == null) {
  //   return (
  //     <>
  //       <StatusBar barStyle="dark-content" />
  //       <SafeAreaView
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <Text>Not order booking</Text>
  //       </SafeAreaView>
  //     </>
  //   );
  // }

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
                    <Back step={step}/>
                    <Text style={styles.headerTitle}>Book Hotel</Text>
                    <View></View>
                    {/* <Avatar /> */}
                  </View>
                  {/* Your information details */}
                  {step == 0 && (
                    <View style={{ margin: 20 }}>
                      <Text style={styles.title}>Your Information Details</Text>
                      <View>
                        <Spacer height={10} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            placeholder="Full Name"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              handleInputChange("fullname", text)
                            }
                            value={value?.fullname}
                          />
                        </View>
                        <Spacer height={15} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            placeholder="Code/ Zip"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              handleInputChange("code", text)
                            }
                            value={value?.code}
                          />
                        </View>
                        <Spacer height={15} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            autoComplete="email"
                            placeholder="Email Address"
                            style={styles.textInput}
                            onChangeText={(text) =>
                              handleInputChange("email", text)
                            }
                            value={value?.email}
                          />
                          <MaterialIcons
                            name="email"
                            size={20}
                            color={COLORS.gray_main}
                          />
                        </View>
                        <Spacer height={15} />

                        <PhoneInput
                          phoneInputStyles={{
                            container: {
                              backgroundColor: COLORS.grayDefault,
                              borderWidth: 0,
                              height: 50,
                            },
                          }}
                          value={value?.phone}
                          onChangePhoneNumber={(country) =>
                            // setInputValue(country)
                            handleInputChange("phone", country)
                          }
                          selectedCountry={selectedCountry}
                          onChangeSelectedCountry={(selectedCountry) =>
                            setSelectedCountry(selectedCountry)
                          }
                        />

                        <Spacer height={15} />
                        <RadioGroup
                          containerStyle={{
                            color: "red",
                          }}
                          layout="row"
                          radioButtons={radioButtons}
                          onPress={setSelectedId}
                          selectedId={selectedId}
                        />
                        <Spacer height={15} />
                        <View style={styles.inputContainer}>
                          <TextInput
                            placeholderTextColor={COLORS.gray_main}
                            placeholder="Birthday"
                            style={styles.textInput}
                            value={value?.birthday}
                            onPressIn={showDatePicker}
                          />
                          <MaterialIcons
                            name="date-range"
                            size={20}
                            color={COLORS.gray_main}
                          />
                        </View>

                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                          maximumDate={new Date()}
                        />
                      </View>
                    </View>
                  )}

                  {/* Seelct the payment method */}
                  {step == 1 && (
                    <View style={{ margin: 20 }}>
                      <Text style={styles.title}>
                        Select the payment method
                      </Text>
                      <View>
                        <Spacer height={10} />
                        {/* <View style={styles.inputMethod}>
                          <View
                            style={{
                              marginLeft: 20,
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../../../assets/paypal.png")}
                            />
                            <Text style={{ fontWeight: 600, fontSize: 18 }}>
                              PayPal
                            </Text>
                          </View>
                          <CheckBox
                          // title='Click Here'
                          // checked={this.state.checked}
                          />
                        </View> */}
                        {/* <Spacer height={5}/> */}
                        <View style={styles.inputMethod}>
                          <TouchableOpacity
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() =>
                              handleChangeMethodPayment("paypal", !showGateway)
                            }
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
                              handleChangeMethodPayment("paypal", !showGateway)
                            }
                          >
                            {showGateway === true && showTitle == "paypal" && (
                              <View style={styles.inner}></View>
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.inputMethod,
                            { justifyContent: "center", paddingVertical: 14 },
                          ]}
                        >
                          <Text style={{ fontWeight: 600, fontSize: 18 }}>
                            + Add New Card
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
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
            onPress={() => handleChangeScreen(step)}
            color={COLORS.white}
            background={COLORS.black}
            loading={false}
          />
        </View>
      </View>

      {/* <Modal visible={showGateway} onRequestClose={() => setShowGateway(false)}>
        <WebView
          source={{ uri: "https://38a4-42-118-135-44.ngrok-free.app/create" }}
          onNavigationStateChange={(data) => handlePayPal(data)}
          injectedJavaScript={`document.f1.submit()`}
        />
      </Modal> */}
    </>
  );
};

export default InformationScreen;

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
  inputMethod: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    alignItems: "center",
    shadowColor: "#bcbcbc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
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
});
