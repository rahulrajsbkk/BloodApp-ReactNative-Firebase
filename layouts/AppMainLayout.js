import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActionBar from '../components/ActionBar';
import AppStatusBar from '../components/AppStatusBar';

const AppMainLayout = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar backgroundColor="white" barStyle={'dark-content'} />
      <ActionBar />
      {children}
    </SafeAreaView>
  );
};

export default AppMainLayout;

const styles = StyleSheet.create({
  container: {backgroundColor: '#ffffff', flex: 1},
});
