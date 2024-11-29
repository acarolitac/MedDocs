import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#3D3A72" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
