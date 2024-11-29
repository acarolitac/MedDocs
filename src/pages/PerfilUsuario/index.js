import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Biblioteca de animação
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import { auth } from '@/firebase/firebase.config'; // Seu arquivo de configuração do Firebase
import { signOut } from 'firebase/auth'; // Importando a função signOut corretamente

export default function Perfil() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);

  // Verifica o status de autenticação do usuário assim que o componente é montado
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUser(user);
    } else {
      alert("É necessário efetuar o login para utilizar este recurso!");
      navigation.navigate('Login');
    }
  }, [navigation]); // Adicionando a dependência de navigation para evitar problemas de navegação

  function logout() {
    signOut(auth)
      .then(() => {
        alert('Logout efetuado com sucesso! Você desconectou-se do sistema.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        alert(error.message); // Corrigido para acessar a mensagem de erro corretamente
      });
  }

  // Verifica se há um usuário autenticado antes de renderizar o conteúdo
  if (!currentUser) {
    return null; // Ou você pode mostrar uma tela de loading até o estado do usuário ser carregado
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerWrapper}>
        <Animatable.View animation="fadeInLeft" delay={200} style={styles.containerHeader}>
          <Text style={styles.message}>Perfil do Usuário</Text>
        </Animatable.View>
      </View>

      {/* Corpo da tela */}
      <Animatable.View animation="fadeInUp" style={styles.containerPerfil}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: currentUser.photoURL || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.username}>{currentUser.displayName || 'Usuário'}</Text>
        <Text style={styles.email}>{currentUser.email}</Text>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditarPerfil')}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
    
        {/* Botão LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Menu inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#fff" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Prontuarios')}>
          <Ionicons name="document-text-outline" size={28} color="#fff" />
          <Text style={styles.menuText}>Prontuário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Agendamento')}>
          <Ionicons name="calendar-outline" size={28} color="#fff" />
          <Text style={styles.menuText}>Agendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-outline" size={28} color="#fff" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    flex: 0.6,
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: '#3D3A72',
  },
  containerHeader: {
    alignItems: 'flex-start',
  },
  message: {
    paddingTop: 20,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  containerPerfil: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },
  profileImageWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  email: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#3D3A72',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#3D3A72',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#3D3A72',
    borderRadius: 50,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
