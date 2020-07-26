import React from 'react';
import { View } from 'react-native';

import useIsKeyboardShowing from '~/hooks/useIsKeyboardShowing';

function KeyboardSpacer({ height = 300 }) {
  const isKeyboardShowing = useIsKeyboardShowing();

  if (!isKeyboardShowing) {
    return null;
  }

  return (
    <View style={{ height }} />
  );
}

export default KeyboardSpacer;
