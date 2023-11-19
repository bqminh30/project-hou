import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleProp,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
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

import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../config/theme";

import Spacer from "../../components/Spacer";
import Back from "../../components/Back";

const ProfileChange = () => {

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
              <ScrollView>
                <View style={styles.header}>
                  <Back />
                </View>
                {/* Your information details */}
                <View style={{ margin: 20 }}>
                  <Text style={styles.title}>Change Password Yourselft</Text>
                  <View>
                    <Spacer height={10} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="Current Password"
                        style={styles.textInput}
                      />
                    </View>

                    <Spacer height={15} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        autoComplete="email"
                        placeholder="Email Address"
                        style={styles.textInput}
                      />
                      <MaterialIcons
                        name="email"
                        size={20}
                        color={COLORS.gray_main}
                      />
                    </View>
                    <Spacer height={15} />

                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        autoComplete="email"
                        placeholder="Email Address"
                        style={styles.textInput}
                      />
                      <MaterialIcons
                        name="email"
                        size={20}
                        color={COLORS.gray_main}
                      />
                    </View>
                    <Spacer height={15} />

                    
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ProfileChange;

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
  textInput: { color: "black", fontSize: 16 },
});
