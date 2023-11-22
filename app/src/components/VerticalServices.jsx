import React from 'react'
import {View, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../config/theme';

const VerticalServices = ({item}) => {
  return (
    <View key={item?.id} style={styles.card}>
        <MaterialCommunityIcons name={`${item}`} size={24} color={`${COLORS.main}`}/>
    </View>
  )
}

export default VerticalServices

const styles = StyleSheet.create({
    card: {
        height: 60, width: 60,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems:"center",
        marginRight: SIZES.margin,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: "white",
        marginVertical: 10,
    }
})