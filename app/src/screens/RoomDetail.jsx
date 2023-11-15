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
import { MaterialIcons } from '@expo/vector-icons';
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
  const [isModal, setIsModal] = useState(false);
  const snapPoints = useMemo(() => [1, "25%", "40%", "60%"], []);

  const { booking, saveBooking } = useBooking();

  const dispath = useDispatch();
  const init = async () => {
    await dispath(getRoom(room_id));
    await dispath(getReviews(room_id));
  };

  useEffect(() => {
    setLoading(true);
    init();
    setTimeout(() => {
      setLoading(false);
    }, 500);
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

      setSelectedDates([
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0],
      ]);
      setDateObject({ ...dateObject, ...newSelectedDates });
    }
  };

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
      setIsModal(false);
    }
  }, []);

  const handlePress = () => {
    // Mở bottom sheet khi bạn nhấp vào một thành phần trong danh sách
    bottomSheetModalRef.current?.expand();
    setIsModal(true);
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
          total: room?.priceSale ? room?.priceSale * dateCount : room?.price * dateCount,
          memberCount: memberCount,
          childrenCount: childrenCount,
          dateCount: dateCount,
        };
  
        // Check if there's an existing booking with the same room_id
        if (booking && Array.isArray(booking.bookings)) {
          const existingBooking = booking.bookings.find(
            (bookingItem) => bookingItem.room_id === room_id
          );
  
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

  const handleBook = () => {
    setModalVisible(!modalVisible);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
      >
        <GestureHandlerRootView style={styles.safeview}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                  <View style={{ margin: SIZES.margin, paddingBottom: 50 }}>
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
                        keyExtractor={({ item, index }) => index}
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
                          style={[
                            styles.card,
                            { backgroundColor: COLORS.main },
                          ]}
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
                    <Spacer height={5} />
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
                        <Text style={{ color: COLORS.gray_main }}>
                          {" "}
                          ratings
                        </Text>
                      </Text>
                      <Text>
                        {room?.totalReview}
                        <Text style={{ color: COLORS.gray_main }}>
                          {" "}
                          reviews
                        </Text>
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
                    <Spacer height={5} />
                    <View>
                      <Text style={styles.key}>Amenties</Text>
                      <FlatList
                        data={services}
                        horizontal={true}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => (
                          <VerticalServices item={item} key={item.id} />
                        )}
                      />
                    </View>
                    <View>
                      <View
                        style={[
                          styles.flex,
                          { justifyContent: "space-between" },
                        ]}
                      >
                        <Text style={styles.key}>Description</Text>

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
                          <Text
                            style={styles.paragraph}
                            numberOfLines={maxLines}
                          >
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
                        data={reviews}
                        horizontal={false}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => (
                          <VerticalReviews item={item} key={item.id} />
                        )}
                      />
                    </View>
                  </View>
                </SafeAreaView>
              </View>
            </TouchableWithoutFeedback>

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
                    Numbers of people renting a room
                  </Text>

                  {/* Adults  */}
                  <View
                    style={[
                      styles.flex,
                      { flexDirection: "column", marginBottom: 12 },
                    ]}
                  >
                    <Text style={{ paddingBottom: 4, color: COLORS.gray_main }}>
                      Adults (Maximum: {room?.numberPeople} total guest/ room)
                    </Text>
                    <View style={styles.flex}>
                      <TouchableOpacity
                        onPress={() =>
                          handleDecrement(memberCount, setMemberCount, 1)
                        }
                        style={styles.buttonStyle}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>-</Text>
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
                            room?.numberPeople
                          )
                        }
                        style={styles.buttonStyle}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>+</Text>
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
                      Childrens (Maximum: {room.numberChildren} total guest/
                      room)
                    </Text>
                    <View style={styles.flex}>
                      <TouchableOpacity
                        onPress={() =>
                          handleDecrement(childrenCount, setChildrenCount, 0)
                        }
                        style={styles.buttonStyle}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>-</Text>
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
                            room.numberChildren
                          )
                        }
                        style={styles.buttonStyle}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Select Dates   */}
                  <View
                    style={[
                      styles.flex,
                      { flexDirection: "column", marginBottom: 12 },
                    ]}
                  >
                    <Text style={{ paddingBottom: 4, color: COLORS.gray_main }}>
                      Dates Stay
                    </Text>
                    <TouchableOpacity
                      style={[styles.inputStyle, { width: "70%" }]}
                      value={`${childrenCount}`}
                      onPressIn={handleBook}
                    >
                      <View
                        style={[
                          styles.flex,
                          {
                            height: 40,
                            justifyContent: "center",
                          },
                        ]}
                      >
                        <MaterialIcons name="date-range" size={24} color="black" />
                        <Text>{selectedDates[0]}</Text>
                        <Text> - </Text>
                        <Text>{selectedDates[1]}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </BottomSheetView>
              )}
            </BottomSheet>
          </KeyboardAvoidingView>

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
        </GestureHandlerRootView>
      </ScrollView>
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
            </Text>
          </Text>
          {!isModal ? (
            <ButtonBook title={"BOOKING"} onPress={() => handlePress()} />
          ) : (
            <ButtonBook
              title={"BOOK NOW"}
              onPress={() => handleSaveBooking()}
            />
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
  images: {},
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
    height: 46,
    width: "100%",
    backgroundColor: COLORS.white,
    // opacity: 0.2
  },
  price: {
    fontFamily: "Poppins-MediumItalic",
    fontSize: 24,
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
    // flex: 1,
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
    marginHorizontal: 20,
    marginTop: SIZES.height / 4,
    backgroundColor: "white", fontSize: 18,
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
  buttonClose: {
    backgroundColor: COLORS.black,
    borderRadius: 20,
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
  inputStyle: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: "50%",
    textAlign: "center",
    borderRadius: 10,
    marginVertical: 2,
    marginHorizontal: 4
  },
});
