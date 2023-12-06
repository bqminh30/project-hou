import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const Avatar = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
        <Image style={styles.avatar} source={{
          uri : "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
        }} />
    </TouchableOpacity>
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    resizeMode: "center"
  }
})