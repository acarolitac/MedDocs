import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Biblioteca de animação
import { useNavigation } from '@react-navigation/native'; // Navegação
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config'; // Importando o Firebase

// Função para validar o e-mail
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const navigation = useNavigation(); // Navegação para outras telas
  const [passwordVisible, setPasswordVisible] = useState(false); // Controle da visibilidade da senha
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail
  const [senha, setSenha] = useState(''); // Estado para armazenar a senha

  // Função para redefinir a senha
  function redefinirSenha() {
    navigation.replace('/redefinirSenha');
  }

  // Função para o login
  function userLogin() {
    if (email.length === 0 || senha.length === 0) {
      Alert.alert("Atenção!", "Por favor, insira um e-mail e uma senha.");
      return false;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Atenção!", "Por favor, insira um e-mail válido.");
      return false;
    }

    // Tentativa de login com o Firebase
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const user = userCredential.user;
          alert('Login efetuado com sucesso!');
          console.log(user);
          resolve(true); // Login bem-sucedido
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage); // Exibe erro de login
          resolve(false); // Login falhou
        });
    });
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder='Digite seu email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <View>
          <TextInput
            placeholder='Digite sua senha'
            style={styles.input}
            secureTextEntry={!passwordVisible} // Controla a visibilidade da senha
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonEsqueciSenha} onPress={() => navigation.navigate('RedefinirSenha')}>
          <Text>
            <Text style={styles.buttonEsqueciSenha}>Esqueci a Senha</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const success = await userLogin(); // Executa a função userLogin e aguarda o resultado
            if (success) {
              navigation.navigate('Home'); // Navega para a tela Home se o login for bem-sucedido
            }
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Cadastro')}>
          <Text>
            <Text style={styles.registerText}>Não possui uma conta? </Text>
            <Text style={styles.underlineText}>Cadastre-se</Text>
          </Text>
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
  buttonEsqueciSenha: {
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});
