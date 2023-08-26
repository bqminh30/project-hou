import React from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../config/theme";
import Avatar from "../components/Avatar";
import Menu from "../components/Menu";
import Spacer from "../components/Spacer";

import { hotel_type, hotels_data } from "../config/data";
import VerticalHome from "../components/VerticalHome";
import VerticalType from "../components/VerticalType";
import VerticalRecommend from "../components/VerticalRecommend";
const Home = () => {
  const [searchText, setSearchText] = React.useState("");
  return (
    <>
      <StatusBar backgroundColor="#009387" barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <View style={styles.header}>
            <Menu />
            <Avatar />
          </View>
          <Spacer height={20} />
          <View style={styles.content}>
            <Text style={styles.name}>Hello, MinhBui</Text>
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
            data={hotels_data}
            scrollEventThrottle={20}
            horizontal={true}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <VerticalHome item={item} key={item.id} />
            )}
            style={{ marginLeft: SIZES.padding }}
          />
          <Spacer height={20} />
          <FlatList
            data={hotel_type}
            scrollEventThrottle={10}
            horizontal={true}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <VerticalType item={item} key={item.id} />
            )}
            style={{ marginLeft: SIZES.padding }}
          />
          <Spacer height={20} />
          <FlatList
            data={hotels_data}
            scrollEventThrottle={10}
            horizontal={true}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <VerticalRecommend item={item} key={item.id} />
            )}
            style={{ marginLeft: SIZES.padding}}
          />
        </View>
      </SafeAreaView>
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
