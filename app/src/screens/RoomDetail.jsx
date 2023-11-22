import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Calendar, LocaleConfig } from "react-native-calendars";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import moment from "moment";
// icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
//redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { useBooking } from "../redux/context/BookingContext"; //
//component
import Back from "../components/Back";
import Avatar from "../components/Avatar";
import Spacer from "../components/Spacer";
import VerticalImage from "../components/VerticalImage";
import VerticalServices from "../components/VerticalServices";
import VerticalReviews from "../components/VerticalReviews";
import ButtonBook from "../components/ButtonBook";
//api
import { getRoom, getReviews } from "../redux/actions/roomAction";
//
import { services } from "../config/data";
import { COLORS, SIZES } from "../config/theme";

//============================================================

const RoomDetail = ({ route, navigation }) => {
  const { room_id } = route?.params;
  const { width } = useWindowDimensions();
  const { room, room_images, reviews } = useSelector(
    (state) => state.roomReducer
  );
  const [showImage, setShowImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setAcive] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateObject, setDateObject] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  const [memberCount, setMemberCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(4);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const bottomSheetModalRef = useRef(null);
  const [isModal, setIsModal] = useState(true);
  const snapPoints = useMemo(() => [1, "25%", "40%", "85%"], []);

  const { booking, saveBooking } = useBooking();

  const dispath = useDispatch();
  const init = async () => {
    await dispath(getRoom(room_id));
    await dispath(getReviews(room_id));
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      init();
      setLoading(false);
    }, 500);

    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(timer);
    };
  }, []);

  const handleShowImage = (image) => {
    setShowImage(image);
  };

  const handleActive = (data) => {
    setAcive(data);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 150,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 2000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

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
            color: COLORS.gray_main,
            startingDay: true,
            selected: true,
          };
        } else if (dateString === endDate.toISOString().split("T")[0]) {
          newSelectedDates[dateString] = {
            color: COLORS.gray_main,
            endingDay: true,
            selected: true,
          };
        } else {
          newSelectedDates[dateString] = {
            color: COLORS.gray_main,
            selected: true,
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
  let endDate = moment(selectedDates[1]).format("DD/MM/YYYY 12:00");

  // useEffect(() => {

  //     const formattedStartDate = moment(selectedDates[0]).format("DD/MM/YYYY 15:00");
  //     const formattedEndDate = moment(selectedDates[1]).format("DD/MM/YYYY 12:00");

  //     const updatedEndDate = moment(formattedEndDate, "DD/MM/YYYY HH:mm").add(1, 'days').format("DD/MM/YYYY HH:mm");

  //     setSelectedDates([
  //       formattedStartDate,
  //       updatedEndDate,
  //     ]);

  // }, [selectedDates]);

  const handleSheetChange = useCallback((index) => {
    if (index === -1 || index === 0) {
      setIsModal(true);
    }
  }, []);

  console.log('isModal', isModal)

  const handlePress = () => {
    // Mở bottom sheet khi bạn nhấp vào một thành phần trong danh sách
    bottomSheetModalRef.current?.expand();
    setIsModal(false);
  };

  const handleSaveBooking = () => {
    if (selectedDates.length <= 0) {
      Alert.alert("Marriott", "Select dates.", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      const startDate = moment(selectedDates[0]);
      const endDate = moment(selectedDates[1]);

      if (startDate.isValid() && endDate.isValid()) {
        const dateCount = endDate.diff(startDate, "days");

        const _startDate = startDate.format("DD/MM/YYYY 15:00");
        const _endDate = endDate.format("DD/MM/YYYY 12:00");

        const newBookingItem = {
          checkinDate: _startDate,
          checkoutDate: _endDate,
          room: room,
          room_id: room_id,
          price: room?.priceSale ? room?.priceSale : room?.price,
          total: room?.priceSale
            ? room?.priceSale * dateCount
            : room?.price * dateCount,
          memberCount: memberCount,
          childrenCount: childrenCount,
          dateCount: dateCount,
        };

        // Check if there's an existing booking with the same room_id
        if (booking && Array.isArray(booking.bookings)) {
          const existingBooking = booking.bookings.find(
            (bookingItem) => bookingItem.room_id === room_id
          );
          navigation.navigate("Information Detail");
          if (existingBooking) {
            // Handle scenario where booking for this room already exists
            Alert.alert("Marriott", "A booking for this room already exists.", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          } else {
            // If no existing booking for this room, add the new booking
            const updatedBookings = [...booking.bookings, newBookingItem];
            saveBooking({ ...booking, bookings: updatedBookings });
          }
        } else {
          // If there's no existing booking, create a new booking object with an array containing the new booking
          saveBooking({ bookings: [newBookingItem] });
        }
      } else {
        console.log("Invalid dates");
      }
    }
  };

  var starPush = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= room?.rating) {
      starPush.push(
        <FontAwesome
          key={i}
          name="star"
          size={12}
          color="orange"
          style={{ paddingRight: 4 }}
        />
      );
    } else if (room?.rating % 1 !== 0) {
      // Check if the rating is not a whole number (i.e., it has a decimal part)
      starPush.push(
        <FontAwesome
          key={i}
          name="star-half"
          size={12}
          color="orange"
          style={{ paddingRight: 4 }}
        />
      );
    } else {
      starPush.push(
        <FontAwesome
          key={i}
          name="star-o"
          size={12}
          color="black"
          style={{ paddingRight: 4 }}
        />
      );
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
              <ScrollView nestedScrollEnabled={true}>
                <View style={{ margin: SIZES.margin, paddingBottom: 80 }}>
                  <View style={styles.header}>
                    <Back />
                    <Avatar />
                  </View>

                  <Spacer height={10} />
                  {/* images  */}
                  <View style={styles.images}>
                    <Image
                      source={{ uri: showImage ? showImage : room?.image }}
                      style={styles.imageMain}
                    />
                    <Spacer />
                    <FlatList
                      data={room_images}
                      horizontal={true}
                      keyExtractor={(item, index) => index.toString()}
                      removeClippedSubviews={true}
                      initialNumToRender={10}
                      renderItem={({ item, index }) => (
                        <VerticalImage
                          item={item}
                          key={item.id}
                          handleShowImage={handleShowImage}
                          handleActive={handleActive}
                          active={active}
                        />
                      )}
                    />
                  </View>
                  <Spacer height={10} />
                  <View>
                    <Text style={styles.name}>{room?.name} </Text>
                    <View style={styles.flex}>
                      <View style={[styles.flex, styles.card]}>
                        <Text style={styles.typeroom}>
                          {" "}
                          {(room?.type_room_id === 1 && "Vip") ||
                            (room?.type_room_id === 2 && "Normal") ||
                            (room?.type_room_id === 3 && "New")}
                        </Text>
                        <Text style={styles.label}></Text>
                      </View>
                      <View
                        style={[styles.card, { backgroundColor: COLORS.main }]}
                      >
                        <Text style={styles.label}>
                          {(room?.label === 1 && "Excellent") ||
                            (room?.label === 2 && "Very good") ||
                            (room?.label === 3 && "Exceptional") ||
                            "default"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Spacer height={4} />
                  <Text style={styles.title}>{room?.title}</Text>
                  <Spacer height={5} />
                  <View
                    style={[
                      styles.rating,
                      { justifyContent: "flex-start", gap: 10 },
                    ]}
                  >
                    <View style={styles.flex}>
                      <View style={styles.flex}>{starPush}</View>
                      <Text style={styles.text}>({room?.rating})</Text>
                    </View>

                    <Text>
                      {room?.totalRating}
                      <Text style={{ color: COLORS.gray_main }}> ratings</Text>
                    </Text>
                    <Text>
                      {room?.totalReview}
                      <Text style={{ color: COLORS.gray_main }}> reviews</Text>
                    </Text>
                  </View>
                  <Spacer height={4} />

                  <View style={[styles.flex, { gap: 10 }]}>
                    <View style={[styles.flex, { gap: 4 }]}>
                      <Ionicons name="bed" size={18} color={COLORS.main} />
                      <Text style={{ color: COLORS.gray_main }}>
                        {room?.numberBed} Beds
                      </Text>
                    </View>
                    <View style={[styles.flex, { gap: 4 }]}>
                      <Ionicons name="people" size={18} color={COLORS.main} />
                      <Text style={{ color: COLORS.gray_main }}>
                        {room?.numberPeople} Adults
                      </Text>
                    </View>
                    <View style={[styles.flex, { gap: 4 }]}>
                      <Ionicons name="person" size={18} color={COLORS.main} />
                      <Text style={{ color: COLORS.gray_main }}>
                        {room?.numberChildren} Childrens
                      </Text>
                    </View>
                  </View>
                  <Spacer height={4} />
                  <View>
                    <Text style={styles.key}>Amenties</Text>
                    <ScrollView horizontal={true} style={{ width: "100%" }}>
                      <FlatList
                        data={services}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        style={{paddingLeft: 8}}
                        removeClippedSubviews={true}
                        initialNumToRender={10}
                        renderItem={({ item, index }) => (
                          <VerticalServices item={item} key={item?.id} />
                        )}
                      />
                    </ScrollView>
                  </View>
                  <View>
                    <View
                      style={[styles.flex, { justifyContent: "space-between" }]}
                    >
                      <Text style={styles.key}>Overview</Text>

                      <TouchableOpacity onPress={toggleCollapsed}>
                        <View style={styles.flex}>
                          <Text style={styles.seemore}>
                            {collapsed ? "see more" : "hide less"}
                          </Text>
                          <AntDesign
                            name={collapsed ? "down" : "up"}
                            size={18}
                            color={COLORS.main}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ overflow: "hidden" }}>
                      <Animated.View
                        scrollEventThrottle={1}
                        style={{ maxHeight: animationHeight }}
                      >
                        <Text style={styles.paragraph} numberOfLines={maxLines}>
                          <RenderHtml
                            contentWidth={width}
                            source={{ html: room?.description }}
                          />
                        </Text>
                      </Animated.View>

                      <TouchableOpacity onPress={toggleCollapsed}>
                        <View
                          style={[styles.flex, { justifyContent: "center" }]}
                        >
                          <Text style={styles.seemore}>
                            {!collapsed && "hide less"}
                          </Text>
                          <AntDesign
                            name={!collapsed && "up"}
                            size={18}
                            color={COLORS.main}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.key}>Reviews</Text>
                    <FlatList
                      nestedScrollEnabled={true}
                      data={reviews}
                      horizontal={false}
                      keyExtractor={(item, index) => index.toString()}
                      removeClippedSubviews={true}
                      initialNumToRender={10}
                      renderItem={({ item, index }) => (
                        <VerticalReviews item={item} key={item.id} />
                      )}
                    />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>

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
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <ScrollView nestedScrollEnabled={true}>
                <Spacer height={10} />
                <Text style={styles._title}>Select Date</Text>
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
                    // hideExtraDays={true}
                    hideArrows={false}
                    markedDates={dateObject}
                    style={{
                      height: 320,
                      borderRadius: SIZES.radius,
                      width: SIZES.width - 30,
                    }}
                    theme={{
                      backgroundColor: COLORS.gray,
                      calendarBackground: COLORS.gray,
                      textSectionTitleColor: "#b6c1cd",
                      selectedDayBackgroundColor: "red",
                      selectedDayTextColor: "#ffffff",
                      todayTextColor: COLORS.black,
                      dayTextColor: "#2d4150",
                      textDisabledColor: "#d9efff",
                    }}
                  />
                  <View
                    style={[
                      styles.flex,
                      {
                        margin: 20,
                        gap: 10,
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <View style={styles.passwordContainer}>
                      <TextInput
                        placeholderTextColor={COLORS.gray_main}
                        autoCorrect={false}
                        value={selectedDates[0]}
                        editable={false}
                        selectTextOnFocus={false}
                        placeholder="Check in"
                      />
                      <MaterialIcons
                        name="date-range"
                        size={18}
                        color={COLORS.gray_main}
                      />
                    </View>

                    <View style={styles.passwordContainer}>
                      <TextInput
                        value={selectedDates[1]}
                        placeholderTextColor={COLORS.gray_main}
                        autoCorrect={false}
                        editable={false}
                        selectTextOnFocus={false}
                        placeholder="Check out"
                      />
                      <MaterialIcons
                        name="date-range"
                        size={18}
                        color={COLORS.gray_main}
                      />
                    </View>
                  </View>
                </View>
                <Text style={styles._title}>Note (optional)</Text>
                <View style={{ marginHorizontal: 18 }}>
                  <TextInput
                    style={styles._inputStyle}
                    placeholderTextColor={COLORS.gray_main}
                    numberOfLines={4}
                    multiline={true}
                    placeholder="I hope that this place is good and comforatble during my vacation"
                  />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </BottomSheet>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
      <View style={styles.bottom}>
        <View
          style={[
            styles.flex,
            {
              marginHorizontal: SIZES.margin,
              justifyContent: "space-between",
              marginTop: 6,
            },
          ]}
        >
          <Text style={styles.price}>
            ${room?.priceSale ? room?.priceSale : room?.price}{" "}
            <Text style={styles._price}>
              {room?.priceSale ? room?.price : ""}
            </Text>{" "}
            /
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-MediumItalic",
              }}
            >
              night
            </Text>
          </Text>
          {isModal ? (
            <ButtonBook title={"Booking Now"} onPress={() => handlePress()} />
          ) : (
            <ButtonBook title={"Check"} onPress={() => handleSaveBooking()} />
          )}
        </View>
      </View>
    </>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  see: {
    paddingVertical: SIZES.margin,
    fontWeight: 700,
    fontFamily: "Poppins-Medium",
  },
  imageMain: {
    height: 240,
    borderRadius: SIZES.radius,
  },
  name: {
    fontSize: 24,
    fontFamily: "Poppins-MediumItalic",
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Thin",
  },
  key: {
    fontSize: 16,
    color: COLORS.main,
    fontFamily: "Poppins-Medium",
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    height: 80,
    width: "100%",
    backgroundColor: COLORS.white,
  },
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
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.black,
    padding: 4,
    paddingLeft: 8,
    borderRadius: SIZES.margin,
    marginRight: 4,
  },
  typeroom: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    paddingRight: 4,
    textTransform: "uppercase",
  },
  label: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    paddingRight: 4,
    textTransform: "uppercase",
  },

  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },

  viewPort: {
    overflow: "hidden",
    top: 20,
    marginBottom: 20,
  },
  textBox: {
    flex: 1,
    position: "absolute",
  },
  seemore: {
    textAlign: "center",
    color: COLORS.main,
    paddingRight: 2,
  },

  modalView: {
    justifyContent: "center",
    alignContent: "center",
    fontSize: 18,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: COLORS.white,
  },
  buttonStyle: {
    height: 40,
    backgroundColor: COLORS.black,
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  passwordContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  inputStyle: {
    // width: "50%",
    // color: "red",
  },
  _inputStyle: {
    height: 80,
    backgroundColor: COLORS.grayDefault,
    borderRadius: SIZES.radius,
    marginTop: 4,
    padding: 8,
  },
});
