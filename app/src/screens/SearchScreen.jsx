import { COLORS, SIZES } from "../config/theme";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hotel_type, hotels_data } from "../config/data";

import Avatar from "../components/Avatar";
import Back from "../components/Back";
import ButtonBook from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import VerticalRecommend from "../components/VerticalRecommend";


const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState("");
  const [keyboardStatus, setKeyboardStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMemberVisible, setModalMemberVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateObject, setDateObject] = useState({});
  const [memberCount, setMemberCount] = useState(1);

  console.log('selectedDates', selectedDates)

  const handleDayPress = (day) => {
    if (selectedDates.length === 2) {
      // Reset mảng nếu đã chọn đủ 2 ngày
      setSelectedDates([]);
      setDateObject({});
      setSelectedDates([day.dateString]);
    } else if (selectedDates.length === 0) {
      // Chọn ngày đầu tiên
      setSelectedDates([day.dateString]);
    } else {
      let startDate = new Date(selectedDates[0]);
      let endDate = new Date(day.dateString);
  
      if (startDate > endDate) {
        //swap start end
        const temp = startDate;
        startDate = endDate;
        endDate = temp;
      }
  
      const newSelectedDates = {};
      let currentDate = new Date(startDate);
  
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (dateString === startDate.toISOString().split("T")[0]) {
          newSelectedDates[dateString] = {
            color: "lightgreen",
            startingDay: true,
          };
        } else if (dateString === endDate.toISOString().split("T")[0]) {
          newSelectedDates[dateString] = {
            color: "lightgreen",
            endingDay: true,
          };
        } else {
          newSelectedDates[dateString] = {
            color: "lightgreen",
          };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      setSelectedDates([startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]]);
      setDateObject({ ...dateObject, ...newSelectedDates });
    }
  };

  const handleMemberPress = (data) => {

  }
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#009387" barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            height: SIZES.height * 0.95,
            opacity: modalVisible ? 0.2 : 1,
          }}
        >
          <View style={{ flex: 1, marginHorizontal: SIZES.padding }}>
            {/* header  */}
            <View style={styles.header}>
              <Back />
              <Avatar />
            </View>
            <Spacer height={10} />
            {/* search  */}
            <View style={[styles.search]}>
              <View style={{ padding: 12 }}>
                <Text style={styles.headerTitlte}>Tìm phòng</Text>
                <View style={styles.sectionStyle}>
                  <Ionicons
                    name="md-search-sharp"
                    size={24}
                    color={COLORS.black}
                    style={styles.imageStyle}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Searchs for hotels"
                    underlineColorAndroid="transparent"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {searchText !== "" && (
                    <TouchableOpacity onPress={() => setSearchText("")}>
                      <Ionicons
                        name="close"
                        size={24}
                        color={COLORS.greenMain}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={[
                    styles.search,
                    {
                      flexDirection: "row",
                      justifyContent: "space-around",
                    },
                  ]}
                >
                  <View style={styles.option}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Text style={styles.title}>Choose Date</Text>
                      <Text>16-Oct To 20-Oct</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.option}>
                  <TouchableOpacity onPress={() => setModalMemberVisible(true)}>
                    <Text style={styles.title}>Member of Room</Text>
                    <Text>3 Adults</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Spacer height={4} />
                <ButtonBook
                  label={"Search Hotel"}
                  color={COLORS.white}
                  background={COLORS.black}
                />
              </View>
            </View>
          </View>
          <Spacer height={10} />
          <View style={{ flex: 1.5, marginHorizontal: SIZES.padding }}>
            <Text style={styles.headerTitlte}>Danh sách tìm kiếm</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              alwaysBounceVertical={false}
            >
              <FlatList
                data={hotels_data}
                scrollEventThrottle={10}
                contentContainerStyle={{ alignSelf: "flex-start" }}
                numColumns={Math.ceil(hotels_data.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => (
                  <VerticalRecommend item={item} key={item.id} />
                )}
                style={{ marginBottom: 24 }}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Calendar
            // Customize the appearance of the calendar

            // Specify the current date
            // current={new Date()}
            minDate={new Date()}
            // Callback that gets called when the user selects a day
            onDayPress={(day) => {
              handleDayPress(day);
            }}
            // Mark specific dates as marked
            markingType="period"
            hideExtraDays={true}
            //   minDate={new Date()}
            hideArrows={false}
            markedDates={dateObject}
          />

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          <Spacer height={10} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMemberVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalMemberVisible(!modalMemberVisible);
        }}
      >
        modalMemberVisible, setModalMemberVisible
        <View style={styles.modalView}>
          

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          <Spacer height={10} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  imageBackground: {
    height: SIZES.height,
    opacity: 0.9,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitlte: {
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 18,
  },
  search: {
    borderRadius: SIZES.radius,
    elevation: 4,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "white",
    marginVertical: 10,
  },
  imageStyle: {
    padding: 8,
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    height: 46,
    borderRadius: SIZES.radius,
  },
  title: {
    paddingVertical: 4,
    fontWeight: 600,
    fontSize: 16,
  },
  option: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
  },

  modalView: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    marginTop: SIZES.height / 4,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: COLORS.white,
  },
  buttonClose: {
    backgroundColor: COLORS.black,
  },
});
