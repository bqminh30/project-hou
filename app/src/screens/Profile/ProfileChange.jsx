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
  Alert
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import RadioGroup from "react-native-radio-buttons-group";
import { Provider, useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import axios from "axios";
import { MaterialIcons, Foundation } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../config/theme";

import Spacer from "../../components/Spacer";
import Back from "../../components/Back";
import Button from "../../components/Button";

import { initialize } from "../../redux/actions/authAction";


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
  const dispath = useDispatch();
  
  const [value, setValue] = useState({
    fullname:  user?.fullname,
    email: user?.email,
    gender: user?.gender,
    phonenumber: user?.phonenumber,
    address: user?.address,
    code: user?.code
  })

  console.log('user', user)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(user?.gender);
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
    const dateFormated = moment(date).format('YYYY-MM-DD')
    setValue({...value, birthday: dateFormated })
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

  const handleInputChange = (fieldName, text) => {
    setValue({
      ...value,
      [fieldName]: text,
    });
  };

  const submitPost = async () => {
      try{
        let formData = new FormData();
        let file;
        showImages === true &&
          (file = {
            uri:
              Platform.OS === 'android'
                ? image?.uri
                : image?.uri?.replace('file://', ''),
            name:
              image?.fileName ||
              Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
            type: image?.type || 'image/jpeg',
          });
        formData.append('avatar', file);
        formData.append('fullname', value?.fullname);
        formData.append('phonenumber', value?.phonenumber);
        formData.append('address', value?.address);
        formData.append('email', value?.email);
        formData.append('birthday', value?.birthday);
        formData.append('gender', selectedId);
        formData.append('code', value?.code);
  
        setLoading(true);
        await axios
          .put(`https://be-nodejs-project.vercel.app/api/customer/update/${user.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            Alert.alert('Marriott', 'Update success', [
              {
                text: 'Done',
                style: 'cancel',
              },
            ]);
            setLoading(false);
            dispath(initialize());
          })
          .catch(err => {
            Alert.alert('Marriott', 'Update Faild', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]);
            setLoading(false);
          });
      }catch(err){
        console.log('err', err)
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
                              uri: user?.avatar ? `https://be-nodejs-project.vercel.app/upload/${user?.avatar}` : "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000",
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
                        value={value?.fullname}
                        onChangeText={(text) =>handleInputChange('fullname', text)}
                        style={styles.textInput}
                      />
                      <Foundation name="text-color" size={20}
                        color={COLORS.gray_main} />
                    </View>

                    <Spacer height={15} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        editable={false}
                        autoComplete="email"
                        value={value?.email}
                        onChangeText={(text) =>handleInputChange('email', text)}
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
                        value={value?.address}
                        onChangeText={(text) =>handleInputChange('address', text)}
                        placeholder="Address"
                        style={styles.textInput}
                      />
                      <MaterialIcons
                        name="add-location"
                        size={20}
                        color={COLORS.gray_main}
                      />
                    </View>
                    <Spacer height={15} />
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        value={value?.phonenumber}
                        onChangeText={(text) =>handleInputChange('phonenumber', text)}
                        placeholder="PhoneNumber"
                        style={styles.textInput}
                      />
                      <MaterialIcons
                        name="phone"
                        size={20}
                        color={COLORS.gray_main}
                      />
                    </View>
                    {/* <PhoneInput
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
                    /> */}

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
                        value={value?.birthday}
                        placeholder="Birthday"
                        style={styles.textInput}
                        onPressIn={showDatePicker}
                      />
                      <MaterialIcons
                        name="date-range"
                        size={20}
                        color={COLORS.gray_main}
                        onPress={showDatePicker}
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
                        // keyboardType="numeric"
                        placeholderTextColor={COLORS.gray_main}
                        placeholder="Code"
                        value={value?.code}
                        onChangeText={(text) =>handleInputChange('code', text)}

                        
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
            onPress={submitPost}
            color={COLORS.white}
            background={COLORS.black}
            loading={false}
          />
        </View>
      </View>
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
  textInput: { color: COLORS.black, fontSize: 16, width: "90%" },
  bottom: {
    position: "absolute",
    bottom: 0,
    height: 100,
    width: "100%",
    backgroundColor: COLORS.white,
  },
});
