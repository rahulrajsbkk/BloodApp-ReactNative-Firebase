import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddDonorScreen from '../screens/AddDonorScreen';
import {AuthContext} from '../contexts/AuthContext';
import ViewDonorsScreen from '../screens/ViewDonorsScreen';
import LoginScreen from '../screens/LoginScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const {user} = React.useContext(AuthContext);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Add Donor" component={AddDonorScreen} />
        <Drawer.Screen
          name="View Donor"
          component={user?.email ? ViewDonorsScreen : LoginScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
