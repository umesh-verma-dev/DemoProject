import React, {Fragment} from 'react';

import NavContainer from './src/navigation';
import Loader from './src/component/loader';
import {StatusBar} from 'react-native';
import {store} from './src/context/store';
import {Provider} from 'react-redux';

console.disableYellowBox = true;

export default () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <NavContainer />
      <Loader />
    </Provider>
  );
};
