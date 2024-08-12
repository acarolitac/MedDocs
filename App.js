import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import Routes from '../projetoMEDdocs/src/routes/index';
import { initializeDatabase } from '../projetoMEDdocs/src/database/db';

// Em algum lugar no início do seu aplicativo
//initializeDatabase();

// Configuração do App
export default function App() {
  //useEffect(() => {
    //initializeDatabase();
 // }, []);

  return (
      <NavigationContainer>
        <StatusBar backgroundColor='#3D3A72' barStyle='light-content' />
        <Routes />
      </NavigationContainer>
  );
}