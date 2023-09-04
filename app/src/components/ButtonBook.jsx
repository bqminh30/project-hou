import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../config/theme'

const ButtonBook = () => {
  return (
    <TouchableOpacity style={styles.button}>
        <Text style={{padding: 8, color: 'white'}}>Book Now</Text>
    </TouchableOpacity>
  )
}

export default ButtonBook
const styles= StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: COLORS.main,
        width: 120
    }
})