import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable'; //biblioteca de animação
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; //biblioteca de icons
import { useState } from 'react';

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const navigation = useNavigation(); //navegar até a tela Cadastro através do botão "Não possui uma conta? Cadastre-se"
  const [passwordVisible, setPasswordVisible] = useState(false); //usado para o usuário também ter a opção de visualizar a senha que está digitando
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');

  //função para lidar com o login
  const handleLogin = async () => {
    if (email.length === 0 || senha.length === 0) {
      Alert.alert("Atenção!", "Por favor, insira um e-mail e uma senha.");
      return false;
    }   
    if (!isValidEmail(email)) {
      Alert.alert("Atenção!", "Por favor, insira um e-mail válido.");
      return false;
    }

    //consultando o banco de dados para verificar o email e a senha
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha],
          (txObj, resultSet) => {
            if (resultSet.rows.length > 0) {
              //se encontrou um usuário correspondente
              resolve(true);
            } else {
              //se não encontrou nenhum usuário correspondente
              Alert.alert("Erro!", "E-mail ou senha incorretos.");
              resolve(false);
            }
          },
          (txObj, error) => {
            console.error('Erro ao consultar o banco de dados:', error);
            //Alert.alert("Erro!", "Erro ao consultar o banco de dados.");
            resolve(false);
          }
        );
      });
    });
  };
    
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
          secureTextEntry={!passwordVisible} //secureTextEntry para mostrar apenas * ao digitar a senha e, !passwordVisible para o usuário também ter a opção de visualizar a senha que está digitando
          value={senha}
          onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              /* botão de olhinho para visualizar ou não a senha que está sendo digitada */
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* BOTÃO COM FUNÇÕES     
                <TouchableOpacity 
          style={styles.button} 
          onPress={async () => {
            const success = await handleLogin(); //executa a função handleLogin e aguarda o resultado
            if (success) {
              navigation.navigate('Home'); //navega para a tela Home se os dados estiverem corretos
            }
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        */}

        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Home')}> 
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={ () => navigation.navigate('Cadastro')}>
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
  // Container da parte de cima azul onde está a mensagem "Bem-Vindo!"
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  // Estilos para o "Bem-Vindo!"
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  // Container do formulário de login
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
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
    fontSize: 16
  },
  button: {
    backgroundColor: '#3D3A72',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center',
  },
  //texto do 'botão' "Não possui uma conta? Cadastre-se"
  registerText:{
    color: '#3F3F3F'
  },
  underlineText:{
    textDecorationLine: 'underline'
  }
});