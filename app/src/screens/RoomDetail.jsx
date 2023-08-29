import React from 'react'
import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native'
import Back from '../components/Back';
import Avatar from '../components/Avatar';
import { SIZES } from '../config/theme';


const RoomDetail = () => {
  return (
    <>
      <StatusBar backgroundColor="#009387" barStyle="dark-content" />
      <SafeAreaView>
        <View>
        <View style={styles.header}>
            <Back />
            <Avatar />
          </View>

        </View>
      </SafeAreaView>   
      </>
  )
}

export default RoomDetail;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: SIZES.padding,
      },
})