import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore } from '@/firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export default function Prontuarios() {
    const navigation = useNavigation();
    const currentUser = auth.currentUser;
    const [prontuarios, setProntuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Verifica se o usuário está logado
    if (!currentUser) {
        useEffect(() => {
            Alert.alert('Atenção', 'É necessário efetuar o login para utilizar este recurso!');
            navigation.navigate('Login');
        }, []);
        return null;
    }

    // Função para buscar os prontuários no Firestore
    const fetchProntuarios = async () => {
        try {
            setLoading(true);
            const prontuariosCollection = collection(firestore, 'prontuarios');
            const snapshot = await getDocs(prontuariosCollection);

            if (!snapshot.empty) {
                const prontuariosList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProntuarios(prontuariosList);
            } else {
                setProntuarios([]);
            }
        } catch (error) {
            console.error('Erro ao buscar prontuários:', error);
            Alert.alert('Erro', 'Não foi possível carregar os prontuários.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch na montagem do componente
    useEffect(() => {
        fetchProntuarios();
    }, []);

    // Exibição enquanto carrega
    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#3D3A72" />
                <Text style={styles.loadingText}>Carregando prontuários...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.headerWrapper}>
                <Text style={styles.message}>Prontuários</Text>
                <Text style={styles.subtexto}>Aqui estão os prontuários dos seus pacientes!</Text>
            </View>

            {/* Lista de prontuários */}
            <View style={styles.containerHome}>
                <Text style={styles.headerText}>Pacientes cadastrados</Text>
                <FlatList
                    data={prontuarios}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.mainCard}
                            onPress={() =>
                                navigation.navigate('DetalhesProntuario', { prontuario: item, id: item.id })
                            }
                        >
                            <View style={styles.cardText}>
                                <Text style={styles.patientName}>{item.nomePaciente}</Text>
                                <Text style={styles.patientDetail}>CPF: {item.cpfPaciente}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum prontuário cadastrado.</Text>}
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

                <View style={styles.centralIconWrapper}>
                    <TouchableOpacity
                        style={styles.centralIcon}
                        onPress={() => navigation.navigate('FormProntuario')}
                    >
                        <View style={styles.circle}>
                            <Ionicons name="add" size={36} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>

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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
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
        flex: 4,
        paddingHorizontal: '5%',
        backgroundColor: '#fff',
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
    cardText: {
        flex: 1,
        marginLeft: 16,
    },
    patientName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    patientDetail: {
        fontSize: 14,
        color: '#ddd',
    },
    emptyText: {
        textAlign: 'center',
        color: '#555',
        fontSize: 16,
        marginTop: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
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
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#4A4A4A',
      marginVertical: 10,
    },
});
