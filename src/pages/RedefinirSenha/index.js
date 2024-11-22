import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Biblioteca de animação
import { useNavigation } from '@react-navigation/native'; // Navegação
import { sendPasswordResetEmail } from 'firebase/auth'; // Assumindo que você está usando Firebase Authentication
import { auth } from '@/firebase/firebase.config'; // Certifique-se de ajustar o caminho conforme necessário

export default function RedefinirSenha() {
  const navigation = useNavigation(); // Navegação para outras telas
  const [email, setEmail] = useState('');

  function redefinirSenha() {
    if (email !== '') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Um e-mail foi enviado para " + email + ". Por favor, verifique a sua caixa de e-mail.");
          navigation.navigate('Login');
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Eita! Alguma coisa não deu certo: " + errorMessage + ". Por favor, tente novamente ou pressione voltar.");
          return;
        });
    } else {
      alert("Por favor, informe um e-mail válido para efetuar a redefinição de senha.");
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Esqueceu a senha? Redefina ela aqui!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder='Digite seu email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={redefinirSenha}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonVoltar} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.voltarText}>Voltar</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3A72',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 19,
    marginTop: 28,
    color: '#4A4A4A',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3D3A72',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonVoltar: {
    marginTop: 11,
  },
  voltarText: {
    color: '#3F3F3F',
    textDecorationLine: 'underline'
  },
});
