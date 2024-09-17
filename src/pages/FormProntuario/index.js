import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable'; // biblioteca de animação
import { useNavigation } from '@react-navigation/native';

export default function FormProntuario() {
    const navigation = useNavigation(); // navegar até a tela de Login através do botão "Acessar"
    const [email, setEmail] = useState(''); // controle de estado para o campo de email

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Animatable.View animation={'fadeInUp'}>
                <Text style={styles.headerTitle}>Prontuário do Paciente</Text>

                <Text style={styles.header}>Informações do Paciente</Text>

                <Text style={styles.title}>Nome Completo</Text>
                <TextInput
                    placeholder='Nome do paciente'
                    style={styles.input}
                    /*value={nomePaciente}
                    onChangeText={setNomePaciente}*/
                />
                <Text style={styles.title}>Data de Nascimento</Text>
                <TextInput
                    placeholder='Data de nascimento'
                    style={styles.input}
                    /*value={dataNascPaciente}
                    onChangeText={setDataNascPaciente}*/
                />
                <Text style={styles.title}>CPF</Text>
                <TextInput
                    placeholder='000.000.000-00'
                    style={styles.input}
                    /*value={cpfPaciente}
                    onChangeText={setCpfPaciente}*/
                />
                <Text style={styles.title}>Gênero</Text>
                {/* Adicione os campos de gênero aqui, se necessário */}
                
                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    placeholder='exemplo@gmail.com'
                    style={styles.input}
                    /*value={emailPaciente}
                    onChangeText={setEmailPaciente}*/
                />
                <Text style={styles.title}>Endereço</Text>
                <TextInput
                    placeholder='RUA, BAIRRO, CIDADE, CEP'
                    style={styles.input}
                    /*value={enderecoPaciente}
                    onChangeText={setEnderecoPaciente}*/
                />
                <Text style={styles.title}>Telefone de Contato</Text>
                <TextInput
                    placeholder='(00) 00000-0000'
                    style={styles.input}
                    /*value={telefonePaciente}
                    onChangeText={setTelefonePaciente}*/
                />
                <View style={styles.container}>
                    <Text style={styles.title}>Contato de emergência</Text>
                    <TextInput
                        placeholder='Nome do Contato de Emergência'
                        style={styles.input}
                        /*value={nomeContatoEmergencia}
                        onChangeText={setNomeContatoEmergencia}*/
                    />
                    <TextInput
                        placeholder='(00) 00000-0000'
                        style={styles.input}
                        /*value={telefoneContatoEmergencia}
                        onChangeText={setTelefoneContatoEmergencia}
                        keyboardType='phone-pad' //abre o teclado numérico com símbolos*/
                    />
                </View>

                <Text style={styles.header}>Dados Clínicos Básicos</Text>
                
                <Text style={styles.title}>Peso</Text>
                <TextInput
                    placeholder='Peso do paciente'
                    style={styles.input}
                    /*value={pesoPaciente}
                    onChangeText={setPesoPaciente}*/
                />

                <Text style={styles.title}>Altura</Text>
                <TextInput
                    placeholder='Altura do paciente'
                    style={styles.input}
                    /*value={alturaPaciente}
                    onChangeText={setPesoPaciente}*/
                />

            </Animatable.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4A4A4A',
    },
    header: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3D3A72',
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: '#4A4A4A',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});