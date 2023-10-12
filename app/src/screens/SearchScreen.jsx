import { COLORS, SIZES } from "../config/theme";
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
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

const image = {
  uri: "https://pix8.agoda.net/hotelImages/22423667/-1/c8b11fd11884172c23959f0ccb4ebfc0.jpg?ca=19&ce=1",
};

const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState("");
  const [keyboardStatus, setKeyboardStatus] = useState("");

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
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            height: SIZES.height * 0.95,
            marginHorizontal: SIZES.padding,
          }}
        >
          <View style={{ flex: 1 }}>
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
                    <Text style={styles.title}>Choose Date</Text>
                    <Text>16-Oct To 20-Oct</Text>
                  </View>
                  <View style={styles.option}>
                    <Text style={styles.title}>Member of Room</Text>
                    <Text>3 Adults</Text>
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
          <Spacer height={10}/>
          <View style={{ flex: 1.5 }}>
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
                style={{marginBottom: 24}}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
      {/* </TouchableWithoutFeedback> */}
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
});
