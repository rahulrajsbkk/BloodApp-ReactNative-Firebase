import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();
function AuthContextProvider({children}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loginLoading, setLoginLoading] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(userParam) {
    setUser(userParam);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function login(email, password) {
    setLoginLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  }

  return (
    <AuthContext.Provider value={{initializing, user, login, loginLoading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
