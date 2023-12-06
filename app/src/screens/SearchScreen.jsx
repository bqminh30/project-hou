import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

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
import { COLORS, SIZES } from "../config/theme";
//components
import Spacer from "../components/Spacer";
import Avatar from "../components/Avatar";
import Back from "../components/Back";
import ButtonSearch from "../components/ButtonSearch";
import VerticalRecommend from "../components/VerticalRecommend";

const arrMent = [
  {
    name: "Lowest Price",
    type: "ASC",
    til: "price",
  },
  {
    name: "Highest Price",
    type: "DESC",
    til: "price",
  },
  {
    name: "Most Rated",
    type: "DESC",
    til: "totalRating",
  },
];

// =================================================================

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

  const [valueSelect, setValueSelect] = useState({
    name: "",
    type: "",
    til: "",
  })

  const [rangeValues, setRangeValues] = useState([0, 10000]);
  
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const snapPoints = useMemo(() => [1, "25%", "35%", "45%"], []);
  const snapPoints2 = useMemo(() => [1, "25%"], []);
  const snapPoints3 = useMemo(() => [1, "25%", "35%"], []);

  const [opacity, setOpacity] = useState(1);

  const onSliderValuesChange = (values) => {
    setRangeValues(values);
  };

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

  const handleSelectSort = (data) => {
    setValueSelect({
      name: data.name,
      type: data.type,
      til: data.til,
    })
  }

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
            selectedDayTextColor: "#ffffff",
          };
        } else if (dateString === endDate.toISOString().split("T")[0]) {
          newSelectedDates[dateString] = {
            color: "black",
            endingDay: true,
            selectedDayTextColor: "#ffffff",
          };
        } else {
          newSelectedDates[dateString] = {
            color: "black",
            selectedDayTextColor: "#ffffff",
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
  let endDate = moment(selectedDates[1])
    .add(1, "days")
    .format("DD/MM/YYYY 12:00");

  const handleSheetChange = useCallback((index) => {
    if (index === -1 || index === 0) {
      setOpacity(1);
    }
  }, []);

  const handleSheetChange2 = useCallback((index) => {
    if (index === -1 || index === 0) {
      setOpacity(1);
    }
  }, []);

  const handleSheetChange3 = useCallback((index) => {
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

  const handlePress2 = () => {
    // Mở bottom sheet khi bạn nhấp vào một thành phần trong danh sách
    setOpacity(0.6);
    bottomSheetModalRef2.current?.expand();
    // setIsModal(true);
  };

  const handlePress3 = () => {
    // Mở bottom sheet khi bạn nhấp vào một thành phần trong danh sách
    setOpacity(0.6);
    bottomSheetModalRef3.current?.expand();
    // setIsModal(true);
  };

  const handleClearSearch = () => {
    setDataSearch([]);
  };

  useEffect(() => {
    handleSearchRooms()

  }, []);

  const handleSearchRooms = async () => {
    setLoadinDataSearch(true);
    setDataSearch([]);
    await axios
      .post("https://be-nodejs-project.vercel.app/api/rooms/search", {
        startDate: startDate,
        endDate: endDate,
        numberRoom: roomCount,
        numberPeople: memberCount,
        numberChildren: childrenCount,
        priceMin: rangeValues[0],
        priceMax: rangeValues[1],
        til: valueSelect.til,
        type: valueSelect.type,
      })
      .then((res) => {
        setDataSearch(res.data.data);
      })
      .catch((err) => console.log("err",err));

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
          <SafeAreaView
            style={{
              height: SIZES.height * 0.95,
              opacity: opacity,
              opacity: modalVisible ? 0.2 : 1,
            }}
          >
            <View style={{ flex: 1, marginHorizontal: SIZES.padding }}>
              {/* header  */}
              <View style={styles.header}>
                <Back />
                <Avatar />
              </View>

              {/* View header  */}
              {/* <View style={[styles.search]}> */}
              <View>
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

                <View
                  style={[
                    styles.search,
                    {
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      padding: 12,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{ width: "48%" }}
                    onPress={() => handlePress2()}
                  >
                    <Text style={[styles.title, { textAlign: "center"}]} >Price</Text>
                    <Text style={{ textAlign: "center" }}>
                      ${rangeValues[0]} - ${rangeValues[1]}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      height: 10,
                      borderWidth: 0.5,
                      borderColor: COLORS.gray,
                    }}
                  ></View>
                  <TouchableOpacity
                    style={{ width: "48%" }}
                    onPress={() => handlePress3()}
                  >
                    <Text style={[styles.title, { textAlign: "center"}]}>Arrangement</Text>
                   {
                    valueSelect.name !== "" &&
                    <Text style={{ textAlign: "center" }}>
                    {valueSelect.name}
                  </Text>
                   }
                  </TouchableOpacity>
                </View>
                <Spacer height={8} />
                <View style={[styles.flex, { justifyContent: "flex-end" }]}>
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
            {/* </View> */}
            {/* View header  */}

            <Spacer height={12} />
            {loadingDataSearch === true && dataSearch.length === 0 && (
              <View
                style={{
                  flex: 2.5,
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
                  flex: 2.5,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text>Not search rooms</Text>
              </View>
            )}

            {loadingDataSearch === false && dataSearch.length > 0 && (
              <View style={{ flex: 2.5, marginHorizontal: SIZES.padding }}>
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
                    // contentContainerStyle={{ alignSelf: "flex-start" }}
                    // numColumns={2}
                    // showsVerticalScrollIndicator={false}
                    // showsHorizontalScrollIndicator={false}
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
                todayTextColor="#00adf5"
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

          {/* Price  */}
          <BottomSheet
            ref={bottomSheetModalRef2}
            index={-1}
            snapPoints={snapPoints2}
            onChange={handleSheetChange2}
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
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                textAlign: "left",
                paddingBottom: 10,
                paddingLeft: 20,
              }}
            >
              Price
            </Text>
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: COLORS.grayDefault,
              }}
            ></View>
            <Spacer height={10} />

            <View style={{ marginLeft: 20 }}>
              <Text>Min Price: ${rangeValues[0]}</Text>
              <Text>Max Price: ${rangeValues[1]}</Text>
              <MultiSlider
                // style={{ width: "90%", height: 40, marginLeft: 20 }}
                values={rangeValues}
                min={0}
                max={10000}
                step={100}
                sliderLength={360}
                onValuesChange={onSliderValuesChange}
                allowOverlap={false} // Set to true if you allow handles to cross
                snapped // If you want values to snap to step
                selectedStyle={{ backgroundColor: COLORS.black, height: 3 }}
              />
            </View>
          </BottomSheet>

          {/* Arrangement  */}
          <BottomSheet
            ref={bottomSheetModalRef3}
            index={-1}
            snapPoints={snapPoints3}
            onChange={handleSheetChange3}
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
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                textAlign: "center",
                paddingBottom: 10,
                paddingLeft: 20,
              }}
            >
              Arrangement
            </Text>
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: COLORS.grayDefault,
              }}
            ></View>
            {/* <Spacer height={10} /> */}

            <View style={{ paddingHorizontal: 20 }}>
              {arrMent.map((data, index) => {
                return (
                  <>
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        borderBottomWidth: index === 2 ? 0 : 1,
                        borderColor: COLORS.grayDefault,
                      }}
                      onPress={()=>handleSelectSort(data)}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          fontFamily: "Poppins-Medium",
                          paddingVertical: 16,
                        }}
                      >
                        {data.name}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
              {/* <View
                style={{
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: COLORS.grayDefault,
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    paddingVertical: 16,
                  }}
                >
                  Lowest Price
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: COLORS.grayDefault,
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    paddingVertical: 16,
                  }}
                >
                  Highest Price
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    paddingVertical: 16,
                  }}
                >
                  Moste Rated
                </Text>
              </View> */}
            </View>
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
