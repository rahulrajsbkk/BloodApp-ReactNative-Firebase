import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ActionBar = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    Keyboard.dismiss();
    navigation.openDrawer();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.toggleButton} onPress={openDrawer}>
          <Image
            style={styles.menuIcon}
            source={require('../assets/menu-icon.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.appIconContainer}>
          <Text style={styles.header}>Test App</Text>
        </View>
      </View>
    </>
  );
};

export default ActionBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  toggleButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '100%',
    justifyContent: 'center',
  },

  menuIcon: {marginHorizontal: 20, width: 30, height: 30},

  appIconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
