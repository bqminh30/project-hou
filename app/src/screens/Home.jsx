import React from 'react'
import {View, Text, Image, Opacity, Pressable, SafeAreaView, StyleSheet, StatusBar} from 'react-native'
import { COLORS, SIZES } from '../config/theme'
const Home = () => {
  return (
    <>
    <StatusBar backgroundColor="#009387" barStyle="dark-content" />
    <SafeAreaView>
      
      <View style={styles.header}>
        <Text>13</Text>
        <Text>23</Text>
      </View>
    </SafeAreaView>
    </>
    
  )
}

export default Home

const styles = StyleSheet.create({
  header : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.padding
  }
})