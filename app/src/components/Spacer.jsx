import React from 'react';
import {View, Text} from 'react-native';

const Spacer = ({height}) => {
  return (
    <View
      style={{
        width: '100%',
        height: height ? height : 15,
      }}
    />
  );
};

export default Spacer;
