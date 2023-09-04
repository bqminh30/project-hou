import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../config/theme";
import Back from "../components/Back";
import Avatar from "../components/Avatar";
import Spacer from "../components/Spacer";

const image = {
  uri: "https://pix8.agoda.net/hotelImages/22423667/-1/c8b11fd11884172c23959f0ccb4ebfc0.jpg?ca=19&ce=1",
};

const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState("");
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <SafeAreaView>
          <View style={{ marginHorizontal: SIZES.margin }}>
            {/* header  */}
            <View style={styles.header}>
              <Back />
              <Avatar />
            </View>
            <Spacer height={20} />
            {/* search  */}
            <View style={[styles.search, {height: 240}]}>
              <View style={{padding: SIZES.default}}>
              <Text>Choose Room</Text>
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

              <View style={[styles.search, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <View>
                    <Text>Choose Date</Text>
                </View>
                <View>
                    <Text>Member of Room</Text>
                </View>
              </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
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
});
