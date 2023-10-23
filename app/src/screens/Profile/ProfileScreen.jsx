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
// import { Provider, useDispatch, useSelector } from "react-redux";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../config/theme";
// import { logoutAction } from "../../redux/actions/authActions";
//redux
// import { userList } from "../../redux/actions/userActions";

var pkg = require('../../../app.json')

const ProfileScreen = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authReducer);
  // const { data } = useSelector((state) => state.userReducer);
  let data, user;
  
  // useEffect(() => {
  //   dispatch(userList(user.id));
  // }, [dispatch]);

  const logout = async () => {
    // await dispatch(logoutAction());
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: COLORS.green }}></SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* <Image
            style={styles.avatar}
            source={require("../../../assets/avatar_default.jpg")}
          /> */}
          <Text style={styles.name}>{user?.fullname}</Text>

          <Text style={styles.verion}>Phiên bản: {pkg?.expo?.version}</Text>
        </View>

        <View style={styles.data}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textInfo}>Email</Text>
            <Text style={[styles.textInfo, { fontWeight: 600, fontSize: 18 }]}>
              {data?.class}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textInfo}>Số điện thoại</Text>
            <Text style={[styles.textInfo, { fontWeight: 600, fontSize: 18 }]}>
              {data?.student}
            </Text>
          </View>
          {/* <View style={{ alignItems: "center" }}>
            <Text style={styles.textInfo}>Kỳ thi</Text>
            <Text style={[styles.textInfo, { fontWeight: 600, fontSize: 18 }]}>
              {data?.event}
            </Text>
          </View> */}
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Lịch sử đặt phòng")}
          >
            <View style={styles.actionPush}>
              {/* <Image
                source={require("../../../assets/Icon-profile/Icon_parent.png")}
                style={styles.bellIcon}
              /> */}
              <Text style={styles.textAction}>Lịch sử đặt phòng</Text>
              <MaterialIcons
                style={{ position: "absolute", right: 0 }}
                name="navigate-next"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
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
    </View>
  )
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    height: 200,
  },
  headerContent: {
    alignItems: "center",
    marginTop: 40,
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
  action: {
    flex: 1,
  },
  content: {
    padding: SIZES.padding,
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
  verion: {
    color: 'white',
    fontSize: 13,
    padding: 4
  }
});
