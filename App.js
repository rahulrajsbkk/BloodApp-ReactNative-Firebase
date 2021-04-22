import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppDrawer from './navigator/AppDrawerNavigator';
import AuthContextProvider from './contexts/AuthContext';

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 600);
  });
  return (
    <AuthContextProvider>
      <AppDrawer />
    </AuthContextProvider>
  );
};

export default App;
