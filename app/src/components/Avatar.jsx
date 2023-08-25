import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import {COLORS, SIZES} from '../config/theme'

const Avatar = () => {
  return (
    // <View style={styles.avatar}>
        <Image style={styles.avatar} source={{
          uri : "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
        }} />
    // </View>
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