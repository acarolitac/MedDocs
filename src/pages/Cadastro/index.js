import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config' // Supondo que você tenha configurado o Firebase

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Cadastro() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para lidar com o cadastro de usuários
  function newUser() {
    if (nomeUsuario === '' || email === '' || senha === '' || confirmarSenha === '') {
      Alert.alert("Atenção!", "Por favor, preencha todos os campos.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Atenção!", "Por favor, insira um e-mail válido.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Atenção!", "As senhas precisam ser iguais.");
      return;
    }

    // Tentando criar o usuário no Firebase
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Sucesso!', 'Seu cadastro foi realizado com sucesso! Faça o login.');
        navigation.navigate('Login'); // Navega para a tela de Login
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro!", `Desculpe, houve um erro durante o cadastro: ${errorMessage}`);
      });
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>  
        <Text style={styles.message}>Cadastre-se</Text>
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder='Digite seu nome completo'
          style={styles.input}
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
        />

        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder='Digite seu email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Digite uma senha'
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons 
              name={passwordVisible ? 'eye-off' : 'eye'} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Confirmar Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Digite a senha novamente'
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons 
              name={passwordVisible ? 'eye-off' : 'eye'} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={newUser}> 
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Animatable.View animation="fadeInRight" delay={500}>
          <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Login')}>
            <Text>
              <Text style={styles.registerText}>Já possui uma conta? </Text>
              <Text style={styles.underlineText}>Entre aqui</Text>
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

// Estilos
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
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#3F3F3F',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});
