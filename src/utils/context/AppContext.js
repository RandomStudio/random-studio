import React from 'react';

const appDefaultState = {
  isToastVisible: false,
  setIsToastVisible: () => {}
}

const AppContext = React.createContext(appDefaultState);
const AppProvider = AppContext.Provider;
const AppConsumer = AppContext.Consumer;

export { appDefaultState, AppContext, AppConsumer, AppProvider };
