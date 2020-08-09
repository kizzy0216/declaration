import React, {
  useState,
  createContext,
} from 'react';
import { setStatusBarStyle } from 'expo-status-bar';

export const InterfaceContext = createContext({
  isVisible: true,
  theme: 'dark',
  setIsVisible: () => {},
});

export const InterfaceContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [theme, setTheme] = useState('dark');

  const handleSetTheme = (theme) => {
    setTheme(theme);
    setStatusBarStyle(theme);
  }

  return (
    <InterfaceContext.Provider
      value={{
        isVisible,
        theme,
        setIsVisible,
        setTheme: handleSetTheme,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
