import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Back = ({step}) => {
  const navigation = useNavigation()
  return (
    <Ionicons name="chevron-back" size={24} color="black" onPress={() => navigation.navigate('Trang chủ')}/>
  )
}

export default Back
