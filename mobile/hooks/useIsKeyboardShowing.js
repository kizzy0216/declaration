import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

function useIsKeyboardShowing() {
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(300);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", handleKeyboardShow);
      Keyboard.removeListener("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  function handleKeyboardShow(event) {
    setKeyboardHeight(event.endCoordinates.height);
    setIsKeyboardShowing(true);
  };

  function handleKeyboardHide() {
    setIsKeyboardShowing(false);
  };

  return { isKeyboardShowing, keyboardHeight };
}

export default useIsKeyboardShowing;
