import React, { useEffect, useState } from "react";
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
} from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { FontAwesome } from "@expo/vector-icons";
// import { TabView, TabBar, SceneMap } from "react-native-tab-view";
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
import ButtonBook from "../components/ButtonBook";
//api
import { getRoom } from "../redux/actions/roomAction";
//
import { services } from "../config/data";

//============================================================

const RoomDetail = ({ route, navigation }) => {
  const { room_id } = route?.params;
  const { width } = useWindowDimensions();
  const { room, room_services, room_images } = useSelector(
    (state) => state.roomReducer
  );
  const [showImage, setShowImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Description" },
    { key: "second", title: "Reviews" },
  ]);

  const dispath = useDispatch();
  const init = async () => {
    await dispath(getRoom(room_id));
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

  // view tab view
  // const _renderTabBar = (props) => {
  //   return (
  //     <View style={[styles.headerTabView]}>
  //       <View style={styles.tabBar}>
  //         {routes?.map((route, i) => {
  //           return (
  //             <TouchableOpacity
  //               style={styles.tabItem}
  //               key={i}
  //               onPress={() => {
  //                 setIndex(i);
  //               }}
  //             >
  //               <Feather
  //                 name={route?.icon}
  //                 size={20}
  //                 color={i == index ? COLORS.black : COLORS.gray}
  //               />
  //               <Animated.Text
  //                 style={{
  //                   fontSize: 15,
  //                   fontWeight: "600",
  //                   color: i == index ? COLORS.black : COLORS.gray,
  //                 }}
  //               >
  //                 {route?.title}
  //               </Animated.Text>

  //               {i == index && (
  //                 <Animated.View
  //                   style={[
  //                     {
  //                       height: 2,
  //                       width: 36,
  //                       backgroundColor: COLORS.black,
  //                       position: "absolute",
  //                       top: Platform.OS == "ios" ? 36 : 36,
  //                     },
  //                   ]}
  //                 ></Animated.View>
  //               )}
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </View>
  //     </View>
  //   );
  // };

  // const FirstRoute = () => {
  //   <View style={{ height: 200 }}>
  //     <RenderHtml contentWidth={width} source={{ html: room?.description }} />
  //   </View>;
  // };
  const SecondRoute = () => (
    <TouchableWithoutFeedback>
      <View style={{ backgroundColor: "#673ab7" }}>
        <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
    >
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123122</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>12312</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>1232</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
          <Text>123123213</Text>
        </ScrollView>
        
      </View>
      </TouchableWithoutFeedback>
  );

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

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
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} keyboardShouldPersistTaps='always'>
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
                  <View style={{ margin: SIZES.margin , paddingBottom: 50}}>
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
                    <View style={styles.rating}>
                      <View style={styles.flex}>{starPush}</View>
                      <Text style={styles.text}>
                        ({room?.totalReview} reviews)
                      </Text>
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
                    

                    {/* <ScrollView nestedScrollEnabled={true} contentContainerStyle={{flexGrow: 1}}>
                      <TouchableWithoutFeedback>
                        <TabView
                          navigationState={{ index, routes }}
                          renderScene={renderScene}
                          onIndexChange={setIndex}
                          initialLayout={{
                            width: width,
                            height: SIZES.height / 3,
                          }}
                          renderTabBar={_renderTabBar}
                          style={{ height: SIZES.height / 3 }}
                        />
                      </TouchableWithoutFeedback>
                    </ScrollView> */}
                    <SecondRoute/>
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
});
