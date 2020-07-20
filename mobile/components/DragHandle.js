import React from 'react';
import { View } from 'react-native';

import Colors from '~/constants/Colors';

const DragHandle = ({
  width = 20,
  height = 5,
}) => {
  return (
    <View
      style={{
        width,
        height,
        borderRadius: 5,
        backgroundColor: Colors.gray,
      }}
    />
  );
}

export default DragHandle;
