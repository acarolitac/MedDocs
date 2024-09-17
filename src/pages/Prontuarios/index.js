import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable'; //biblioteca de animação
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; //biblioteca de icons
import { useState } from 'react';

export default function Prontuarios() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/*cabeçalho*/}
      <View style={styles.headerWrapper}>
        {/*<Animatable.View animation="fadeInLeft" delay={200} style={styles.containerHeader}>*/}
          <Text style={styles.message}>Prontuários</Text>
          <Text style={styles.subtexto}>Aqui estão os prontuários dos seus pacientes!</Text>
          {/*</Animatable.View>*/}
      </View>

      {/*corpo da tela*/}
      <View animation="fadeInLeft" delay={200} style={styles.containerHome}>
        {/*seção lista de prontuários*/}
        <View style={styles.section}>
          <View style={styles.header}>
            
          </View>

          {/*cartão principal*/}
          <TouchableOpacity style={styles.mainCard} onPress={() => navigation.navigate('')}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Coloque aqui a URL da imagem do paciente
              style={styles.patientImage}
            />
            <View style={styles.cardText}>
              <Text style={styles.patientName}>NomePaciente</Text>
              <Text style={styles.patientDetail}>Lorem ipsum</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/*menu inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#fff" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Prontuarios')}>
          <Ionicons name="document-text-outline" size={28} color="#fff" />
          <Text style={styles.menuText}>Prontuário</Text>
        </TouchableOpacity>

        <View style={styles.centralIconWrapper}>
          <TouchableOpacity style={styles.centralIcon} onPress={() => navigation.navigate('FormProntuario')}>
            <View style={styles.circle}>
              <Ionicons name="add" size={36} color="#fff" />
            </View>            
          </TouchableOpacity>
        </View>

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
    flex: 0.6, // Diminui a altura do cabeçalho
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '5%', // Reduz a altura do padding para equilibrar
    backgroundColor: '#3D3A72',
  },
  containerHeader: {
    alignItems: 'left',
    paddingTop: 15,
  },
  message: {
    paddingTop: 20,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtexto: {
    fontSize: 15,
    color: '#fff',
  },
  containerHome: {
    flex: 4, // Aumenta a altura da área do corpo
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },
  section: {
    width: '100%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#4A4A4A',
  },
  headerLink: {
    color: '#3F3F3F',
    fontSize: 14,
    marginTop: 14,
  },
  mainCard: {
    backgroundColor: '#3D3A72',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2,
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  patientDetail: {
    fontSize: 12,
    color: '#ddd',
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
  centralIconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  centralIcon: {
    position: 'relative',
    top: -30,
  },
  circle: {
    width: 70,
    height: 70,
    backgroundColor: '#6762BC',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 5,
  },
  menuText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});