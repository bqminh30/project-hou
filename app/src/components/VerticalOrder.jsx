import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native'
import { COLORS, SIZES } from '../config/theme'

import { FontAwesome } from "@expo/vector-icons";

const stars = 5;
const VerticalOrder = ({item}) => {
    var starPush = [];
  for (var i = 1; i <= stars; i++) {
    starPush.push(
      <FontAwesome
        key={i}
        name={i <= item.star ? "star" : "star-o"}
        size={10}
        color={i <= item.star ? "orange" : "gray"}
        style={{ paddingRight: 4 }}
      />
    );
  }
  return (
    <>
        <View style={styles.component}>
        <View style={styles.left}>
            <Text style={styles.name}>Royal Lancaster</Text>
            <Text style={styles.title}>Royal Lancaster</Text>
            <Text style={styles.title}>Royal Lancaster</Text>
            <View style={styles.rating}>
          <View style={styles.rate}>{starPush}</View>
          <Text style={styles.text}>{item.rate}</Text>
        </View>
        </View>
        <View style={styles.right}>
            <Text>11 Review</Text>
            <Text>Excelent</Text>
        </View>
    </View>
    <View style={styles.componentDate}>
        <View style={styles.left}>
            <Text style={{color:'white'}}>Royal Lancaster</Text>
            <Text style={{color:'white'}}>Royal Lancaster</Text>
        </View>
        <View style={styles.right}>
            <Text style={{color:'white'}}>11 Review</Text>
            <Text>Excelent</Text>
        </View>
    </View>
    </>
  )
}

export default VerticalOrder 

const styles = StyleSheet.create({
    component: {
        borderRadius: SIZES.radius,
        display: 'flex',
        flexDirection:'row',
        marginBottom: 12
    },
    componentDate: {
        borderRadius: SIZES.radius,
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 12
    },
    left: {
        width: '70%'
    },
    name:{
        fontSize: 16,
        fontWeight: 600,

    },
    rating: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      rate: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      text: {
        color: COLORS.gray,
        fontSize: 12,
      },
    right: {
        width: '30%'
    }
    
})