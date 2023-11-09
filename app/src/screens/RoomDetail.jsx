import React, { useEffect, useState, useRef } from "react";
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
  Easing,
  Dimensions,
  Button,
} from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// icons
import { Feather } from "@expo/vector-icons";
//redux
import { Provider, useDispatch, useSelector } from "react-redux";
//component
import Back from "../components/Back";
import Avatar from "../components/Avatar";
import { COLORS, SIZES } from "../config/theme";
import Spacer from "../components/Spacer";
import VerticalImage from "../components/VerticalImage";
import VerticalServices from "../components/VerticalServices";
import VerticalReviews from "../components/VerticalReviews";
import ButtonBook from "../components/ButtonBook";
//api
import { getRoom , getReviews } from "../redux/actions/roomAction";
//
import { services } from "../config/data";

//============================================================

const RoomDetail = ({ route, navigation }) => {
  const { room_id } = route?.params;
  const { width } = useWindowDimensions();
  const { room, room_services, room_images, reviews } = useSelector(
    (state) => state.roomReducer
  );
  const [showImage, setShowImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispath = useDispatch();
  const init = async () => {
    await dispath(getRoom(room_id));
    await dispath(getReviews(room_id));
  };

  useEffect(() => {
    // setLoading(true)
    init();
    // setTimeout(()=> {
    //   setLoading(false)
    // }, 500)
  }, []);

  const handleShowImage = (image) => {
    setShowImage(image);
  };

  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 80,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 1000,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  var starPush = [];
  for (var i = 1; i <= 5; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= room?.rating ? "star" : "star-o"}
        size={12}
        color={i <= room?.rating ? "orange" : "black"}
        style={{ paddingRight: 4 }}
      />
    );
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
                          />
                        )}
                      />
                    </View>
                    <Spacer height={15} />
                    <View style={styles.flex}>
                      <Text style={styles.name}>{room?.name} </Text>
                      <View style={[styles.flex, styles.card]}>
                        <Text style={styles.typeroom}>
                          {" "}
                          {(room?.type_room_id === 1 && "Vip") ||
                            (room?.type_room_id === 2 && "Normal") ||
                            (room?.type_room_id === 3 && "New")}
                        </Text>
                      </View>
                    </View>
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
                    <View style={styles.rating}></View>
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
                      <Text style={styles.key}>Description</Text>
                      <View style={{ overflow: "hidden" }}>
                        <Animated.View style={{ maxHeight: animationHeight }}>
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
                        <Button
                        style={{fontSize: 12}}
                          title="see more"
                          onPress={toggleCollapsed}
                        />
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
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </ScrollView>
      <View style={styles.bottom}>
        <View
          style={[
            styles.flex,
            {
              marginHorizontal: SIZES.margin,
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={styles.price}>
            ${room?.priceSale ? room?.priceSale : room?.price}{" "}
            <Text style={styles._price}>
              {room?.priceSale ? room?.price : ""}
            </Text>
          </Text>
          <ButtonBook />
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
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    height: 40,
    width: "100%",
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
    borderRadius: SIZES.margin,
  },
  typeroom: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 600,
    paddingRight: 4,
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
});
