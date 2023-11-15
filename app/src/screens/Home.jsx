import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../config/theme";
//component
import Avatar from "../components/Avatar";
import Menu from "../components/Menu";
import Spacer from "../components/Spacer";

import VerticalHome from "../components/VerticalHome";
import VerticalType from "../components/VerticalType";
import VerticalRecommend from "../components/VerticalRecommend";


const Home = () => {
  const [searchText, setSearchText] = React.useState("");
  const [roomLimit, setRoomLimit] = React.useState([]);
  const [roomData, setRoomData] = React.useState([])
  const { user } = useSelector((state) => state.authReducer);
  const { typerooms, rooms } = useSelector((state) => state.roomReducer);
  const title = 'HOME'

  const callApiLimit = async () => {
    const res = await axios.get(
      "https://be-nodejs-project.vercel.app/api/rooms/limit/5"
    );
    setRoomLimit(res.data);
  };
  
  useEffect(() => {
    setRoomData(rooms)
  },[rooms])

  useEffect(() => {
    callApiLimit();
  }, []);

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

      <SafeAreaView >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View onStartShouldSetResponder={() => true}>
            <View style={styles.header}>
              <Menu />
              <Avatar />
            </View>
            <Spacer height={20} />
            <View style={styles.content}>
              <Text style={styles.name}>Hello, {user.fullname}</Text>
              <Text style={styles.title}>Best Hotel to Stay In</Text>
            </View>
            <Spacer height={10} />
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
            <Spacer height={20} />
            <FlatList
              onStartShouldSetResponder={() => true}
              data={roomLimit}
              scrollEventThrottle={20}
              horizontal={true}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <VerticalHome item={item} key={item.id} title={title}/>
              )}
              style={{ marginLeft: SIZES.padding }}
            />
            <Spacer height={20} />
            <FlatList
              data={typerooms}
              onStartShouldSetResponder={() => true}
              scrollEventThrottle={10}
              horizontal={true}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <VerticalType item={item} key={item.id} />
              )}
              style={{ marginLeft: SIZES.padding }}
            />
            <Spacer height={20} />
            <View onStartShouldSetResponder={() => true}>
              <FlatList
                data={roomData}
                scrollEventThrottle={10}
                horizontal={true}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => (
                  <VerticalRecommend item={item} key={item.id} title={title}/>
                )}
                style={{ marginLeft: SIZES.padding }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
  },
  content: {
    marginHorizontal: SIZES.padding,
  },
  name: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "Poppins-Bold",
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    height: 46,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
  },
  imageStyle: {
    padding: 8,
  },
});
