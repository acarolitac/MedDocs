import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome/index';
import Login from '../pages/Login/Index';
import Cadastro from '../pages/Cadastro/index';
import Home from '../pages/Home/index';

const Stack = createNativeStackNavigator(); //função utilizada no React Navigation, especificamente com o pacote @react-navigation/native-stack, para criar um "stack navigator" nativo, que permite navegar entre diferentes telas em um aplicativo React Native. Um "stack navigator" gerencia uma pilha de telas onde você pode empilhar novas telas sobre as anteriores e, eventualmente, voltar para a tela anterior ao desempilhar a tela do topo.

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false}}
      />
    </Stack.Navigator>
  );
}