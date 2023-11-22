import React from 'react';
import {View, Text} from 'react-native';

const Spacer = ({height, width}) => {
  return (
    <View
      style={{
        width: width ? width : '100%',
        height: height ? height : 15,
      }}
    />
  );
};

export default Spacer;
