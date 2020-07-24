import React from 'react';
import { View } from 'react-native';

import colors from '~/constants/colors';

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
        backgroundColor: colors.gray,
      }}
    />
  );
}

export default DragHandle;
