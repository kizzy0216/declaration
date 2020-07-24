import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

function useIsKeyboardShowing() {
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", handleKeyboardShow);
      Keyboard.removeListener("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  function handleKeyboardShow() {
    setIsKeyboardShowing(true);
  };

  function handleKeyboardHide() {
    setIsKeyboardShowing(false);
  };

  return isKeyboardShowing;
}

export default useIsKeyboardShowing;
