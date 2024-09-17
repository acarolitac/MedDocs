import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable'; //biblioteca de animação
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; //biblioteca de icons
import { useState } from 'react';

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Cadastro() {

    const navigation = useNavigation(); //navegar de volta até a tela de Login através do botão "Já possui uma conta? Entre aqui" e até a tela Home pelo botão cadastrar
    const [passwordVisible, setPasswordVisible] = useState(false); //usado para o usuário também ter a opção de visualizar a senha que está digitando
    //variáveis usadas para armazenar e atualizar valores específicos que são relevantes para o cadastro do usuário
    const[nomeUsuario, setNomeUsuario] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[confirmarSenha, setConfirmarSenha] = useState('');

    //função para lidar com o cadastro de usuários
    const handleCadastro = async () => {
      if (nomeUsuario.length === 0 || email.length === 0 || senha.length === 0 || confirmarSenha.length === 0) {
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
  
      //cerificação e inserção no banco de dados
      verificarUsuario(email, (result) => {
        if (result.length > 0) {
          Alert.alert("Atenção!", "O e-mail inserido já está em uso.");
        } else {
          cadastrarUsuario(
            nomeUsuario,
            email,
            senha,
            () => {
              Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
              navigation.navigate('Home', { Usuario: nomeUsuario });
            },
            (error) => {
              console.error("Erro ao cadastrar usuário.", error);
              Alert.alert("Erro!", "Desculpe, houve um erro durante o cadastro.");
            }
          );
        }
      });
    };
  
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
            secureTextEntry={!passwordVisible} //secureTextEntry para mostrar apenas * ao digitar a senha e, !passwordVisible para o usuário também ter a opção de visualizar a senha que está digitando
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons /*botão de olhinho para visualizar ao não a senha que está sendo digitada*/
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
            secureTextEntry={!passwordVisible}//secureTextEntry para mostrar apenas * ao digitar a senha e, !passwordVisible para o usuário também ter a opção de visualizar a senha que está digitando
          />

          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons /*botão de olhinho para visualizar ao não a senha que está sendo digitada*/
              name={passwordVisible ? 'eye-off' : 'eye'} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>

        
        {/* BOTÃO COM FUNÇÕES              
        <TouchableOpacity style={styles.button} onPress={handleCadastro}> 
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        */}
        
        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Home')}> 
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>


        <Animatable.View animation="fadeInRight" delay={500}>
            <TouchableOpacity style={styles.buttonRegister} onPress={ () => navigation.navigate('Login')}>
                <Text>
                    <Text style={styles.registerText}>Já possui uma conta? </Text>
                    <Text style={styles.underlineText}>Entre aqui</Text>
                </Text>
            </TouchableOpacity>
        </Animatable.View>

      </Animatable.View>

    </View>
    )
}
//estilização
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3D3A72',
    },
    // Container da parte de cima azul onde está a mensagem "Cadastre-se"
    containerHeader: {
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%'
    },
    // Estilos para o "Cadastre-se"
    message: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff'
    },
    // Container do formulário de cadastro
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
      alignSelf: 'center'
    },
    //texto do 'botão' "Já possui uma conta? Entre aqui"
    registerText:{
      color: '#3F3F3F'
    },
    underlineText:{
      textDecorationLine: 'underline'
    }
  });