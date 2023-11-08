import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native'
import { COLORS, SIZES } from '../config/theme'

const VerticalType = ({item}) => {
  return (
    <TouchableOpacity key={item?.id} activeOpacity={1} style={styles.component}>
        <Text style={[styles.type]}>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default VerticalType 

const styles = StyleSheet.create({
    component: {
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginRight: SIZES.margin
    },
    type : {
        paddingHorizontal: 20,
        paddingVertical: 4,
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 600,
        color: COLORS.gray
    }
})