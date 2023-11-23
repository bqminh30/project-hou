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
import * as ImagePicker from 'expo-image-picker';
import RadioGroup from "react-native-radio-buttons-group";
import PhoneInput from "react-native-international-phone-number";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../config/theme";

import Spacer from "../../components/Spacer";
import Back from "../../components/Back";

const radioButtons = [
  {
    id: "Men", 
    label: "Men",
    value: "Men",
  },
  {
    id: "Women",
    label: "Women",
    value: "Women",
  },
  {
    id: "Others",
    label: "Others",
    value: "Others",
  },
]; 

// ====================================================


const ProfileChange = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [selected, setSelected] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showImages, setImages] = React.useState(false);
  const [image, setImage] = useState(user?.avatar);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  
  const pickImage = async type => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setImages(true);
      setImage(result.assets[0]);
    }
  };

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
                  {/* <Avatar /> */}
                </View>
                {/* Your information details */}
                <View style={{ margin: 20 }}>
                  <Text style={styles.title}>Your Information Details</Text>
                  <View>
                    <Spacer height={10} />
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                      }}>
                      <TouchableOpacity
                        onPress={pickImage}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLORS.grayDefault,
                          zIndex: 10,
                          height: 24,
                          width: 24,
                          position: 'absolute',
                          borderRadius: 80,
                          top: 70,
                          right: 60,
                        }}>
                        <MaterialIcons
                          style={{opacity: 0.5}}
                          name="camera-alt"
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={pickImage}>
                        {showImages === true ? (
                          <Image
                            style={{
                              zIndex: 1,
                              height: 80,
                              width: 80,
                              borderRadius: 80,
                              backgroundColor: COLORS.grayDefault,
                              
                            }}
                            resizeMode='cover'
                            source={{uri: `${image?.uri}`}}
                          />
                        ) : (
                          <Image
                            style={{
                              zIndex: 1,
                              height: 80,
                              width: 80,
                              borderRadius: 80,
                              backgroundColor: COLORS.grayDefault,
                              
                            }}
                            resizeMode='cover'
                            source={{
                              uri: user?.avatar,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                 
                    </View>
                    <Spacer height={30} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="Full Name"
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

                    <PhoneInput
                      phoneInputStyles={{
                        container: {
                          backgroundColor: COLORS.grayDefault,
                          borderWidth: 0,
                          height: 50,
                        },
                      }}
                      value={inputValue}
                      onChangePhoneNumber={(country) => setInputValue(country)}
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
                        // autoComplete="email"
                        placeholder="Birthday"
                        style={styles.textInput}
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
                    <Spacer height={15} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="Code"
                        style={styles.textInput}
                      />
                    </View>
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
