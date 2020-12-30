import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppValue = () => React.useContext(AppContext);
