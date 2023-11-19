import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
//components
import Back from "../../components/Back";
import Avatar from "../../components/Avatar";
import Spacer from "../../components/Spacer";
// config
import { COLORS, SIZES } from "../../config/theme";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <View style={{ margin: SIZES.margin }}>
          <View style={styles.header}>
            <Back />
            <Avatar />
          </View>
        </View>
        
        <View style={styles.profile}>
          <View style={styles.container}>
            <View style={[styles.flex, { justifyContent: "space-between" }]}>
              {/* Avatar  */}
              <View style={styles.flex}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000",
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.name}>Bui Quang Minh</Text>
                  <Text style={styles.date}>bqminh30@gmail.com</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Spacer height={15} />
        <View style={styles.store}>
          <TouchableOpacity>
            <View style={[styles.flex, styles.button]}>
              <FontAwesome name="history" size={20} color="white" />
              <Text style={styles.textButton}>History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.flex, styles.button]}>
              <MaterialIcons name="favorite" size={20} color="white" />
              <Text style={styles.textButton}>Favorite Room</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <View style={styles.content}>
           
            <TouchableOpacity
              onPress={() => navigation.navigate("Thông tin cá nhân")}
            >
              <View style={styles.actionPush}>
                {/* <Image
                source={require("../../../assets/Icon-profile/Icon_student.png")}
                style={styles.bellIcon}
              /> */}
                <Text style={styles.textAction}>Thông tin cá nhân</Text>
                <MaterialIcons
                  style={{ position: "absolute", right: 0 }}
                  name="navigate-next"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Đổi mật khẩu")}
            >
              <View style={styles.actionPush}>
                {/* <Image
                source={require("../../../assets/Icon-profile/Icon_change.png")}
                style={styles.bellIcon}
              /> */}
                <Text style={styles.textAction}>Đổi mật khẩu</Text>
                <MaterialIcons
                  style={{ position: "absolute", right: 0 }}
                  name="navigate-next"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionPush}>
                {/* <Image
                source={require("../../../assets/Icon-profile/Icon_logout.png")}
                style={styles.bellIcon}
              /> */}
                <Text style={styles.textAction}>Đăng xuất</Text>
                <MaterialIcons
                  style={{ position: "absolute", right: 0 }}
                  name="navigate-next"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    marginHorizontal: SIZES.margin,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  data: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginTop: SIZES.spacing,
  },
  textInfo: {
    color: COLORS.white,
    fontSize: SIZES.h14,
  },
  bellIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  name: {
    fontSize: SIZES.h1,
    color: COLORS.white,
    fontWeight: 600,
  },
  // action: {
  //   flex: 1,
  // },
  content: {
    marginHorizontal: SIZES.margin,
  },
  actionPush: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.spacing,
  },
  textAction: {
    fontWeight: 600,
    fontSize: SIZES.h14,
    paddingLeft: SIZES.spacing,
  },
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray,
    marginVertical: 10,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingVertical: 10,
  },
  name: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.black,
  },
  store: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: SIZES.margin,
    gap: 10
  },
  button: {
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.black,
    width: "100%",
  },
  textButton: {
    color: COLORS.white,
    paddingLeft: 4,
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
});
