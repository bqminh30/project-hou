import React, { useState, useEffect, useMemo } from "react";
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
  ScrollView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RadioGroup from "react-native-radio-buttons-group";
import PhoneInput from "react-native-international-phone-number";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { COLORS, SIZES } from "../../config/theme";
import Avatar from "../../components/Avatar";
import Spacer from "../../components/Spacer";
import Back from "../../components/Back";
// icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// redux context
import { useBooking } from "../../redux/context/BookingContext";
import Button from "../../components/Button";

const SelectPaymentScreen = () => {
  const [value, setValue] = useState({
    fullname: "",
    email: "",
    birthday: "",
    code: "",
    phone: "",
  });
  const { booking } = useBooking();

  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
    ],
    []
  );

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
                    <Avatar />
                  </View>
                  {/* Your information details */}
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
            onPress=""
            color={COLORS.white}
            background={COLORS.black}
            loading={false}
          />
        </View>
      </View>
    </>
  );
};

export default SelectPaymentScreen;

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
});
