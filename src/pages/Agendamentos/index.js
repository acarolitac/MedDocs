import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Agenda } from 'react-native-calendars'; // importa o calendário da biblioteca react-native-calendars 

export default function Agendamento() {
  const navigation = useNavigation();

  //exemplo de dados para o calendário
  const items = {
    '2024-09-03': [{ name: 'Consulta com nomePaciente', height: 80 }],
    '2024-09-10': [{ name: 'Receitar novos remédios nomePaciente', height: 80 }],
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerWrapper}>
        <Text style={styles.message}>Agendamentos</Text>
        <Text style={styles.subtexto}>Confira todos os seus compromissos.</Text>
      </View>

      {/* Corpo da tela */}
      <View style={styles.containerHome}>
        <Agenda
          items={items}
          renderItem={(item) => (
            <TouchableOpacity
              style={styles.mainCard}
              onPress={() => navigation.navigate('Agendamento')}
            >
              <Text style={styles.agendamentoText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          theme={{
            agendaDayTextColor: '#3D3A72',
            agendaDayNumColor: '#3D3A72',
            agendaTodayColor: '#6762BC',
            agendaKnobColor: '#3D3A72',
          }}
        />
      </View>

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

        {/*{<View style={styles.centralIconWrapper}>
          <TouchableOpacity style={styles.centralIcon} onPress={() => navigation.navigate('FormProntuario')}>
            <View style={styles.circle}>
              <Ionicons name="add" size={36} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>*/}

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
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'stretch', // Ajuste para "stretch" ao invés de "center"
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },
  mainCard: {
    backgroundColor: '#3D3A72',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2,
  },
  agendamentoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#3D3A72',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 20,
    paddingBottom: 20,
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