import React from 'react';
import { View } from 'react-native';

import { GRAY }from '~/constants';

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
        backgroundColor: GRAY,
      }}
    />
  );
}

export default DragHandle;
