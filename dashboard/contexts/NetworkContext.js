import React, { useState, createContext } from 'react';

export const NetworkContext = createContext({
  active: null,
  setActive: () => {},
});

export const NetworkContextProvider = ({ children }) => {
  const [active, setActive] = useState(null);

  return (
    <NetworkContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
