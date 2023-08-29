import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Back from "../components/Back";
import Avatar from "../components/Avatar";
import { SIZES } from "../config/theme";
import Spacer from "../components/Spacer";
import { hotels_data } from "../config/data";
import VerticalImage from "../components/VerticalImage";
import VerticalServices from "../components/VerticalServices";
import Button from "../components/Button";
import ButtonBook from "../components/ButtonBook";

const RoomDetail = () => {
  return (
    <>
      <StatusBar backgroundColor="#009387" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          style={{ marginHorizontal: SIZES.margin, marginBottom: 40 }}
        >
          <View style={styles.header}>
            <Back />
            <Avatar />
          </View>
          <Spacer height={20} />
          {/* images  */}
          <View style={styles.images}>
            <Image
              source={{ uri: hotels_data[0].image }}
              style={styles.imageMain}
            />

            <Text style={styles.see}>See All Room</Text>
            <FlatList
              data={hotels_data[0]?.images}
              horizontal={true}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <VerticalImage item={item} key={item.id} />
              )}
            />
          </View>
          <Spacer height={15} />
          <View>
            <Text style={styles.name}>{hotels_data[0].name}</Text>
            <Text style={styles.title}>{hotels_data[0].type}</Text>
          </View>
          <Spacer height={15} />
          <View>
            <Text style={styles.key}>Amenties</Text>
            <FlatList
              data={hotels_data[0]?.services}
              horizontal={true}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <VerticalServices item={item} key={item.id} />
              )}
            />
          </View>
          <Spacer height={15} />
          <View>
            <Text style={styles.key}>Description</Text>
            <Text style={{ marginTop: 10 }}>{hotels_data[0].description}</Text>
            <Text style={{ marginTop: 10 }}>{hotels_data[0].description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: SIZES.margin,
          }}
        >
          <Text>$450</Text>
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
    fontSize: 20,
    fontFamily: "Poppins-Regular",
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
    height: 60,
    width: "100%",
  },
});
