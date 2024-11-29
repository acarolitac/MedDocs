import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Agenda } from 'react-native-calendars';
import { auth, firestore } from '@/firebase/firebase.config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function Agendamento() {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [items, setItems] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setCurrentUser(user);
            fetchPacientes();
            fetchAgendamentos();
        } else {
            Alert.alert('Atenção', 'É necessário efetuar o login para utilizar este recurso!');
            navigation.navigate('Login');
        }
    }, [navigation]);

    // Buscar pacientes cadastrados no Firestore
    const fetchPacientes = async () => {
        try {
            const snapshot = await getDocs(collection(firestore, 'prontuarios'));
            const pacientesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPacientes(pacientesList);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            Alert.alert('Erro', 'Não foi possível carregar os pacientes.');
        }
    };

    // Buscar agendamentos no Firestore
    const fetchAgendamentos = async () => {
        try {
            const snapshot = await getDocs(collection(firestore, 'agendamentos'));
            const agendamentos = {};
            snapshot.docs.forEach((doc) => {
                const { date, name } = doc.data();
                if (!agendamentos[date]) agendamentos[date] = [];
                agendamentos[date].push({ name, height: 80, id: doc.id, date });
            });
            setItems(agendamentos);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os agendamentos.');
        }
    };

    // Adicionar novo agendamento
    const handleAddAgendamento = async () => {
        if (!selectedPaciente || !descricao || !selectedDate) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        try {
            const novoAgendamento = {
                name: `Consulta com ${selectedPaciente.nomePaciente} - ${descricao}`,
                date: selectedDate,
            };
            const docRef = await addDoc(collection(firestore, 'agendamentos'), novoAgendamento);
            const updatedItems = { ...items };
            if (!updatedItems[selectedDate]) updatedItems[selectedDate] = [];
            updatedItems[selectedDate].push({ name: novoAgendamento.name, height: 80, id: docRef.id, date: selectedDate });
            setItems(updatedItems);
            setModalVisible(false);
            Alert.alert('Sucesso', 'Agendamento adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar agendamento:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o agendamento.');
        }
    };

    // Excluir agendamento
    const handleDeleteAgendamento = async (date, id) => {
        Alert.alert(
            'Confirmação',
            'Deseja excluir este agendamento?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(firestore, 'agendamentos', id));
                            const updatedItems = { ...items };
                            updatedItems[date] = updatedItems[date].filter((item) => item.id !== id);
                            if (updatedItems[date].length === 0) delete updatedItems[date];
                            setItems(updatedItems);
                            Alert.alert('Sucesso', 'Agendamento excluído com sucesso!');
                        } catch (error) {
                            console.error('Erro ao excluir agendamento:', error);
                            Alert.alert('Erro', 'Não foi possível excluir o agendamento.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.message}>Agendamentos</Text>
                <Text style={styles.subtexto}>Confira e gerencie seus compromissos.</Text>
            </View>

            <View style={styles.containerHome}>
                <Agenda
                    items={items}
                    renderItem={(item) => (
                        <View style={styles.mainCard}>
                            <Text style={styles.agendamentoText}>{item.name}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteAgendamento(item.date, item.id)}
                            >
                                <Ionicons name="trash-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                        setModalVisible(true);
                    }}
                    theme={{
                        agendaDayTextColor: '#3D3A72',
                        agendaDayNumColor: '#3D3A72',
                        agendaTodayColor: '#6762BC',
                        agendaKnobColor: '#3D3A72',
                    }}
                />
            </View>

            {/* Modal para adicionar agendamento */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Agendamento</Text>
                        <Text style={styles.label}>Paciente</Text>
                        <FlatList
                            data={pacientes}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.pacienteItem,
                                        selectedPaciente?.id === item.id && styles.selectedPacienteItem,
                                    ]}
                                    onPress={() => setSelectedPaciente(item)}
                                >
                                    <Text>{item.nomePaciente}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição do compromisso"
                            value={descricao}
                            onChangeText={setDescricao}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.button} onPress={handleAddAgendamento}>
                                <Text style={styles.buttonText}>Adicionar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PerfilUsuario')}>
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
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: '#3D3A72',
  },
  message: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtexto: {
    fontSize: 15,
    color: '#fff',
  },
  containerHome: {
    flex: 1,
    padding: 10,
  },
  mainCard: {
    backgroundColor: '#3D3A72',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  agendamentoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3D3A72',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  pacienteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedPacienteItem: {
    backgroundColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3D3A72',
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});
