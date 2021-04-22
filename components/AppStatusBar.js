import React from 'react';
import {StatusBar} from 'react-native';

const AppStatusBar = ({backgroundColor, barStyle, style}) => {
  return <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />;
};

export default AppStatusBar;
