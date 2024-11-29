import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { auth } from '@/firebase/firebase.config';
import { firestore } from '@/firebase/firebase.config'; // Certifique-se de ajustar o caminho conforme necessário
import { collection, addDoc } from 'firebase/firestore'; // Funções necessárias do Firestore

export default function FormProntuario() {
    const navigation = useNavigation();

    // Dados Paciente
    const [nomePaciente, setNomePaciente] = useState('');
    const [dataNascPaciente, setDataNascPaciente] = useState('');
    const [cpfPaciente, setCpfPaciente] = useState('');
    const [sexoBiologico, setSexoBiologico] = useState('');
    const [generoPaciente, setGeneroPaciente] = useState('');
    const [emailPaciente, setEmailPaciente] = useState('');
    const [enderecoPaciente, setEnderecoPaciente] = useState('');
    const [telefonePaciente, setTelefonePaciente] = useState('');

    // Contato Emergência
    const [nomeContatoEmergencia, setNomeContatoEmergencia] = useState('');
    const [telefoneContatoEmergencia, setTelefoneContatoEmergencia] = useState('');

    // Dados Clínicos Básicos
    const [pesoPaciente, setPesoPaciente] = useState('');
    const [alturaPaciente, setAlturaPaciente] = useState('');
    const [limitacaoPaciente, setLimitacao] = useState('');
    const [tipoSanguineo, setTipoSanguineo] = useState('');

    // Histórico de Saúde
    const [alergiaPaciente, setAlergiaPaciente] = useState('');
    const [detalheAlergia, setDetalheAlergia] = useState('');
    const [cirurgiaFeita, setCirurgiaFeita] = useState('');
    const [detalheCirurgia, setDetalheCirurgia] = useState('');
    const [tomaMedicamento, setTomaMedicamento] = useState('');
    const [detalheMedicamento, setDetalheMedicamento] = useState('');
    const [fumante, setFumante] = useState('');
    

    // Histórico Familiar
    const [historicoFamiliar, setHistoricoFamiliar] = useState('');
    const [consumoAlcool, setConsumoAlcool] = useState('');
    const [atividadeFisica, setAtividadeFisica] = useState('');
    const [observacoesAdicionais, setObservacoesAdicionais] = useState('');

    const currentUser = auth.currentUser;

    if (currentUser == null) {
        Alert.alert('Atenção', 'É necessário efetuar o login para utilizar este recurso!');
        navigation.navigate('Login');
        return null;
    }

    const handleSave = async () => {
        if (!nomePaciente || !cpfPaciente) {
            Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
            return;
        }
    
        const novoProntuario = {
            nomePaciente,
            dataNascPaciente,
            cpfPaciente,
            sexoBiologico,
            generoPaciente,
            emailPaciente,
            enderecoPaciente,
            telefonePaciente,
            nomeContatoEmergencia,
            telefoneContatoEmergencia,
            pesoPaciente,
            alturaPaciente,
            limitacaoPaciente,
            alergiaPaciente,
            detalheAlergia,
            cirurgiaFeita,
            detalheCirurgia,
            tomaMedicamento,
            detalheMedicamento,
            fumante,
            tipoSanguineo,
            historicoFamiliar,
            consumoAlcool,
            atividadeFisica,
            observacoesAdicionais,
            createdAt: new Date(), // Adiciona timestamp
        };
    
        try {
            // Salvar no Firestore
            const prontuarioRef = collection(firestore, 'prontuarios');
            await addDoc(prontuarioRef, novoProntuario);
    
            Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
            navigation.goBack(); // Retorna para a página anterior
        } catch (error) {
            console.error('Erro ao salvar prontuário:', error);
            Alert.alert('Erro', 'Não foi possível salvar o prontuário.');
        }
    };

    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Animatable.View animation={'fadeInUp'}>
                <Text style={styles.headerTitle}>Prontuário do Paciente</Text>

                <Text style={styles.header}>Dados Pessoais</Text>

                <Text style={styles.title}>Nome Completo</Text>
                <TextInput
                    placeholder='Nome do paciente'
                    style={styles.input}
                    value={nomePaciente}
                    onChangeText={setNomePaciente}
                />
                <Text style={styles.title}>Data de Nascimento</Text>
                <TextInput
                    placeholder='dia/mês/ano'
                    style={styles.input}
                    value={dataNascPaciente}
                    onChangeText={setDataNascPaciente}
                />
                <Text style={styles.title}>CPF</Text>
                <TextInput
                    placeholder='000.000.000-00'
                    style={styles.input}
                    value={cpfPaciente}
                    onChangeText={setCpfPaciente}
                />
                <Text style={styles.title}>Sexo Biológico</Text>
                <Picker
                    selectedValue={sexoBiologico}
                    onValueChange={(itemValue, itemIndex) =>
                        setSexoBiologico(itemValue)
                    }
                    style={styles.input}
                >
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                </Picker>

                <Text style={styles.title}>Gênero</Text>
                <Picker
                    selectedValue={generoPaciente}
                    onValueChange={(itemValue, itemIndex) =>
                        setGeneroPaciente(itemValue)
                    }
                    style={styles.input}
                >
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                    <Picker.Item label="Transgênero" value="T" />
                    <Picker.Item label="Não-binário" value="NB" />
                    <Picker.Item label="Prefiro não informar" value="X" />
                </Picker>
                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    placeholder='exemplo@gmail.com'
                    style={styles.input}
                    value={emailPaciente}
                    onChangeText={setEmailPaciente}
                />
                <Text style={styles.title}>Endereço</Text>
                <TextInput
                    placeholder='RUA, BAIRRO, CIDADE, CEP'
                    style={styles.input}
                    value={enderecoPaciente}
                    onChangeText={setEnderecoPaciente}
                />
                <Text style={styles.title}>Telefone de Contato</Text>
                <TextInput
                    placeholder='(00) 00000-0000'
                    style={styles.input}
                    value={telefonePaciente}
                    onChangeText={setTelefonePaciente}
                    keyboardType='phone-pad'
                />

                <Text style={styles.header}>Contato de Emergência</Text>
                <Text style={styles.title}>Nome do Contato de Emergência</Text>
                <TextInput
                    placeholder='Nome do Contato de Emergência'
                    style={styles.input}
                    value={nomeContatoEmergencia}
                    onChangeText={setNomeContatoEmergencia}
                />
                <Text style={styles.title}>Telefone de Emergência</Text>
                <TextInput
                    placeholder='(00) 00000-0000'
                    style={styles.input}
                    value={telefoneContatoEmergencia}
                    onChangeText={setTelefoneContatoEmergencia}
                    keyboardType='phone-pad'
                />

                <Text style={styles.header}>Dados Clínicos Básicos</Text>

                <Text style={styles.title}>Peso (kg)</Text>
                    <TextInput
                        placeholder="Peso (kg)"
                        style={styles.input}
                        value={pesoPaciente}
                        keyboardType="numeric"
                        onChangeText={(text) => { 
                        setPesoPaciente(text); 
                        }}
                    />

                    <Text style={styles.title}>Altura</Text>
                    <TextInput
                        placeholder="Ex: 1,58"
                        style={styles.input}
                        value={alturaPaciente}
                        keyboardType="numeric"
                        onChangeText={(text) => { 
                        setAlturaPaciente(text); 
                        }}
                    />

                <Text style={styles.title}>Tipo Sanguíneo</Text>
                <Picker
                    selectedValue={tipoSanguineo}
                    onValueChange={(itemValue, itemIndex) =>
                        setTipoSanguineo(itemValue)
                    }
                    style={styles.input}
                >
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                </Picker>

                <Text style={styles.title}>Limitação do Paciente</Text>
                <TextInput
                    placeholder="Informe a limitação do paciente"
                    style={styles.input}
                    value={limitacaoPaciente}
                    onChangeText={setLimitacao}
                />

                <Text style={styles.header}>Histórico de Saúde</Text>

                <Text style={styles.title}>Possui alguma alergia?</Text>
                <View style={styles.radioGroup}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Sim"
                            status={alergiaPaciente === 'Sim' ? 'checked' : 'unchecked'}
                            onPress={() => setAlergiaPaciente('Sim')}
                        />
                        <Text style={styles.radioLabel}>Sim</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Não"
                            status={alergiaPaciente === 'Não' ? 'checked' : 'unchecked'}
                            onPress={() => setAlergiaPaciente('Não')}
                        />
                        <Text style={styles.radioLabel}>Não</Text>
                    </View>
                </View>
                {alergiaPaciente === 'Sim' && (
                    <>
                        <Text style={styles.title}>Se sim, qual/quais?</Text>
                        <TextInput
                            placeholder='Informe a alergia'
                            style={styles.input}
                            value={detalheAlergia}
                            onChangeText={setDetalheAlergia}
                        />
                    </>
                )}
                <Text style={styles.title}>Já fez alguma cirurgia?</Text>
                <View style={styles.radioGroup}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="SIM"
                            status={cirurgiaFeita === 'SIM' ? 'checked' : 'unchecked'}
                            onPress={() => setCirurgiaFeita('SIM')}
                        />
                        <Text style={styles.radioLabel}>Sim</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="NÃO"
                            status={cirurgiaFeita === 'NÃO' ? 'checked' : 'unchecked'}
                            onPress={() => setCirurgiaFeita('NÃO')}
                        />
                        <Text style={styles.radioLabel}>Não</Text>
                    </View>
                </View>
                {cirurgiaFeita === 'SIM' && (
                    <>
                        <Text style={styles.title}>Se sim, qual?</Text>
                        <TextInput
                            placeholder='Descreva a cirurgia'
                            style={styles.input}
                            value={detalheCirurgia}
                            onChangeText={setDetalheCirurgia}
                        />
                    </>
                )}

                <Text style={styles.title}>Toma algum medicamento?</Text>
                <View style={styles.radioGroup}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="SIM"
                            status={tomaMedicamento === 'SIM' ? 'checked' : 'unchecked'}
                            onPress={() => setTomaMedicamento('SIM')}
                        />
                        <Text style={styles.radioLabel}>SIM</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="NÃO"
                            status={tomaMedicamento === 'NÃO' ? 'checked' : 'unchecked'}
                            onPress={() => setTomaMedicamento('NÃO')}
                        />
                        <Text style={styles.radioLabel}>NÃO</Text>
                    </View>
                </View>
                {tomaMedicamento === 'SIM' && (
                    <>
                        <Text style={styles.title}>Se sim, qual?</Text>
                        <TextInput
                            placeholder='Informe o medicamento'
                            style={styles.input}
                            value={detalheMedicamento}
                            onChangeText={setDetalheMedicamento}
                        />
                    </>
                )}

                <Text style={styles.title}>É fumante?</Text>
                <View style={styles.radioGroup}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="SIM"
                            status={fumante === 'SIM' ? 'checked' : 'unchecked'}
                            onPress={() => setFumante('SIM')}
                        />
                        <Text style={styles.radioLabel}>SIM</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="NÃO"
                            status={fumante === 'NÃO' ? 'checked' : 'unchecked'}
                            onPress={() => setFumante('NÃO')}
                        />
                        <Text style={styles.radioLabel}>NÃO</Text>
                    </View>
                </View>

                <Text style={styles.header}>Histórico Familiar</Text>
                <TextInput
                    placeholder="Doenças familiares"
                    style={styles.input}
                    value={historicoFamiliar}
                    onChangeText={setHistoricoFamiliar}
                    multiline
                />

                <Text style={styles.title}>Consumo de Álcool</Text>
                <TextInput
                    placeholder="Ex: Regular, Social, Nenhum"
                    style={styles.input}
                    value={consumoAlcool}
                    onChangeText={setConsumoAlcool}
                />

                <Text style={styles.title}>Atividade Física</Text>
                <TextInput
                    placeholder="Ex: Sedentário, Moderado"
                    style={styles.input}
                    value={atividadeFisica}
                    onChangeText={setAtividadeFisica}
                />

                <Text style={styles.title}>Observações Adicionais</Text>
                <TextInput
                    placeholder="Informe observações"
                    style={styles.input}
                    value={observacoesAdicionais}
                    onChangeText={setObservacoesAdicionais}
                    multiline
                />

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
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
        marginBottom: 5,
        color: '#4A4A4A',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#3D3A72',
        borderRadius: 50,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});