import { View, Text, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const image_boarding_1 = require('../../assets/boarding/image_boarding_1.jpg')
const image_boarding_2 = require('../../assets/boarding/image_boarding_2.jpg')
const image_boarding_3 = require('../../assets/boarding/image_boarding_3.jpg')

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const DotComponent = ({ selected }) => {
    return (
      <View
        style={[
          {
            width: 4,
            height: 4,
            marginHorizontal: 4,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            padding: 6,
          },
          selected && { borderColor: "red", borderWidth: 1 },
        ]}
      >
        <View
          style={[
            {
              width: 8,
              height: 8,
              borderRadius: 50,
            //   borderWidth: 1
            },
            selected ? { backgroundColor: "red"  } : {backgroundColor: "pink"}
          ]}
        ></View>
      </View>
    );
  };

  return (
    <Onboarding
      onSkip={() => navigation.replace("Welcome")}
      onDone={() => navigation.replace("Welcome")}
      DotComponent={DotComponent}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={image_boarding_1}
              style={{width: 180, height: 180, objectFit: 'contain'}}
            />
          ),
          title: "Tất cả những gì bạn cần ở một nơi",
          subtitle:
            "Khách sạn ở vị trí đắc địa, ở gần trung tâm thương mại, khu vui chơi giải trí",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={image_boarding_2}
              style={{width: 200, height: 200, objectFit: 'contain'}}
            />
          ),
          title: "Dịch vụ đặc biệt",
          subtitle:
            "Bạn sẽ được trải nghiệm những dịch vụ tốt nhất của khách sạn",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={image_boarding_3}
              style={{width: 200, height: 200, objectFit: 'contain'}}
            />
          ),
          title: "Đặt phòng mọi lúc mọi nơi",
          subtitle:
            "Dịch vụ đặt phòng trực tuyến 24/7",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
