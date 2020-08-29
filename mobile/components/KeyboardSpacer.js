import React from 'react';
import { View } from 'react-native';

import useIsKeyboardShowing from '~/hooks/useIsKeyboardShowing';

function KeyboardSpacer() {
  const { isKeyboardShowing, keyboardHeight } = useIsKeyboardShowing();

  if (!isKeyboardShowing) {
    return null;
  }

  return (
    <View style={{ height: keyboardHeight }} />
  );
}

export default KeyboardSpacer;
