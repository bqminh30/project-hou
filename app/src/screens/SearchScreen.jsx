import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

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
  ActivityIndicator,
  // GestureHandlerRootView,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import moment from "moment";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
// config
import { COLORS, SIZES } from "../config/theme";
//components
import Spacer from "../components/Spacer";
import Avatar from "../components/Avatar";
import Back from "../components/Back";
import ButtonSearch from "../components/ButtonSearch";
import VerticalRecommend from "../components/VerticalRecommend";


const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateObject, setDateObject] = useState({});
  const [memberCount, setMemberCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataSearchUpdate, setDataSearchUpdate] = useState([]);
  const [loadingDataSearch, setLoadinDataSearch] = useState(false);

  const roomMaxValue = 3;
  const memberChildrenMaxValue = 8;

  const handleDecrement = (count, setCount, minValue) => {
    if (count > minValue) {
      setCount(count - 1);
    }
  };

  const handleIncrement = (count, setCount, maxValue) => {
    if (count < maxValue) {
      setCount(count + 1);
    }
  };
  // select date
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
            color: "black",
            startingDay: true,
            selectedDayTextColor: '#ffffff',
          };
        } else if (dateString === endDate.toISOString().split("T")[0]) {
          newSelectedDates[dateString] = {
            color: "black",
            endingDay: true,
            selectedDayTextColor: '#ffffff',
          };
        } else {
          newSelectedDates[dateString] = {
            color: "black",
            selectedDayTextColor: '#ffffff',
          };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedDates([
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0],
      ]);
      setDateObject({ ...dateObject, ...newSelectedDates });
    }
  };

 
  let startDate = moment(selectedDates[0]).format("DD/MM/YYYY 15:00");
  let endDate = moment(selectedDates[1]).add(1, 'days').format("DD/MM/YYYY 12:00");

  const bottomSheetModalRef = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const snapPoints = useMemo(() => [1, "25%", "35%", "50%"], []);

  const [opacity, setOpacity] = useState(1);
  const handleSheetChange = useCallback((index) => {
    if (index === -1 || index === 0) {
      setOpacity(1);
    }
  }, []);

  const handlePress = () => {
    // Mở bottom sheet khi bạn nhấp vào một thành phần trong danh sách
    setOpacity(0.6);
    bottomSheetModalRef.current?.expand();
    setIsModal(true);
  };

  const handleSearchRooms = async () => {
    setLoadinDataSearch(true);
    setDataSearch([]);
    await axios
      .post("https://be-nodejs-project.vercel.app/api/rooms/search", {
        name: searchText,
        startDate: startDate,
        endDate: endDate,
        numberBed: roomCount,
        numberPeople: memberCount,
        numberChildren: childrenCount,
      })
      .then((res) => {
        setDataSearch(res.data.data);
      })
      .catch((err) => console.log("err"));

    setLoadinDataSearch(false);
  };

  useEffect(() => {
    setDataSearchUpdate(dataSearch);
  }, [loadingDataSearch]);

  return (
    <>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: COLORS.white }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <StatusBar backgroundColor="#009387" barStyle="dark-content" />
          {/* <View style={{ flex: 1 }}> */}
          <SafeAreaView
            style={{
              height: SIZES.height * 0.95,
              opacity: opacity,
              opacity: modalVisible  ? 0.2 : 1,
            }}
          >
            <View style={{ flex: 1, marginHorizontal: SIZES.padding }}>
              {/* header  */}
              <View style={styles.header}>
                <Back />
                <Avatar />
              </View>

              <View style={[styles.search]}>
                <View style={{ padding: 12 }}>
                  <Text style={styles.headerTitlte}>Search Room</Text>
                  {/* Input search  */}
                  <View style={styles.sectionStyle}>
                    <Ionicons
                      name="md-search-sharp"
                      size={24}
                      color={COLORS.black}
                      style={styles.imageStyle}
                    />
                    <TextInput
                      style={{ flex: 1 }}
                      placeholder="Searchs for rooms"
                      placeholderTextColor={COLORS.gray_main}
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

                  {/* Date and member  */}
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
                        <Text style={styles.title}>Stay Dates</Text>
                        {setSelectedDates && (
                          <Text>
                            {startDate} - {endDate}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity onPress={() => handlePress()}>
                        <Text style={styles.title}>Rooms & Guests</Text>
                        <Text>
                          {roomCount} Rooms: {memberCount} Adults{" "}
                          {childrenCount > 0 && `, ${childrenCount} Childrens`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Spacer height={10} />
                  <ButtonSearch
                    background={COLORS.black}
                    float={"right"}
                    label={"Search Room"}
                    color={COLORS.white}
                    onPress={handleSearchRooms}
                  />
                </View>
              </View>
            </View>
            <Spacer height={12} />
            {loadingDataSearch === true && dataSearch.length === 0 && (
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={styles.flex}>
                  <ActivityIndicator size="small" />
                  <Text> Loading ...</Text>
                </View>
              </View>
            )}

            {loadingDataSearch === false && dataSearch.length === 0 && (
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text>Not search rooms</Text>
              </View>
            )}

            {loadingDataSearch === false && dataSearch.length > 0 && (
              <View style={{ flex: 2, marginHorizontal: SIZES.padding }}>
                <Text style={styles.headerTitlte}>
                  {dataSearchUpdate?.length} Availabel Rooms
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  directionalLockEnabled={true}
                  alwaysBounceVertical={false}
                >
                  <FlatList
                    data={dataSearchUpdate}
                    scrollEventThrottle={10}
                    contentContainerStyle={{ alignSelf: "flex-start" }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({ item, index }) => `${index}`}
                    renderItem={({ item, index }) => (
                      <VerticalRecommend item={item} key={item.id} />
                    )}
                    style={{ marginBottom: 24 }}
                  />
                </ScrollView>
              </View>
            )}
          </SafeAreaView>
          {/* </View> */}
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
                todayTextColor= '#00adf5'
                // hideExtraDays={true}
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
          {/* Bottom Sheet View Input  */}
          <BottomSheet
            ref={bottomSheetModalRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enablePanDownToClose
            enableOverDrag
            pressBehavior={"close"}
            backgroundStyle={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            {isModal == true && (
              <BottomSheetView>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                    paddingBottom: 10,
                  }}
                >
                  Number of people renting a room
                </Text>
                {/* Rooms  */}
                <View
                  style={[
                    styles.flex,
                    { flexDirection: "column", marginBottom: 12 },
                  ]}
                >
                  <Text style={{ paddingBottom: 4, color: COLORS.gray_main }}>
                    Rooms
                  </Text>

                  <View style={styles.flex}>
                    {/* Member Count */}
                    <TouchableOpacity
                      onPress={() =>
                        handleDecrement(roomCount, setRoomCount, 1)
                      }
                      style={styles.buttonStyle}
                    >
                      <Text style={{ color: "white" }}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.inputStyle}
                      value={`${roomCount}`}
                      onChangeText={() => {}}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        handleIncrement(roomCount, setRoomCount, roomMaxValue)
                      }
                      style={styles.buttonStyle}
                    >
                      <Text style={{ color: "white" }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Adults  */}
                <View
                  style={[
                    styles.flex,
                    { flexDirection: "column", marginBottom: 12 },
                  ]}
                >
                  <Text style={{ paddingBottom: 4, color: COLORS.gray_main }}>
                    Adults (Maximum: 10 total guest/room)
                  </Text>
                  <View style={styles.flex}>
                    <TouchableOpacity
                      onPress={() =>
                        handleDecrement(memberCount, setMemberCount, 1)
                      }
                      style={styles.buttonStyle}
                    >
                      <Text style={{ color: "white" }}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.inputStyle}
                      value={`${memberCount}`}
                      onChangeText={() => {}}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        handleIncrement(
                          memberCount,
                          setMemberCount,
                          memberChildrenMaxValue
                        )
                      }
                      style={styles.buttonStyle}
                    >
                      <Text style={{ color: "white" }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Children   */}
                <View
                  style={[
                    styles.flex,
                    { flexDirection: "column", marginBottom: 12 },
                  ]}
                >
                  <Text style={{ paddingBottom: 4, color: COLORS.gray_main }}>
                    Childrens (Maximum: 10 total guest/room)
                  </Text>
                  <View style={styles.flex}>
                    <TouchableOpacity
                      onPress={() =>
                        handleDecrement(childrenCount, setChildrenCount, 0)
                      }
                      style={styles.buttonStyle}
                    >
                      <Text style={{ color: "white" }}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.inputStyle}
                      value={`${childrenCount}`}
                      onChangeText={() => {}}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        handleIncrement(
                          childrenCount,
                          setChildrenCount,
                          memberChildrenMaxValue
                        )
                      }
                      style={styles.buttonStyle}
                    >
                      <Text style={{ color: "white" }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BottomSheetView>
            )}
          </BottomSheet>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </>
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
    marginTop: 10,
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
    paddingVertical: 2,
    fontWeight: 600,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  option: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 6,
    width: "50%",
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
  flex: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    height: 40,
    backgroundColor: COLORS.black,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: "50%",
    textAlign: "center",
  },
});
