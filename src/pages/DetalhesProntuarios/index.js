import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { firestore } from '@/firebase/firebase.config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; // 
import generatePDF from '@/ExportarPDF/index';
import { exportToDOC } from '@/ExportarDOC/index';

export default function DetalhesProntuario({ route, navigation }) {
    const { prontuario, id } = route.params;
    const [editable, setEditable] = useState(false); // Controle de edição
    const [formData, setFormData] = useState(prontuario); // Dados do prontuário

    // Atualizar prontuário no Firestore
    const handleSave = async () => {
        try {
            const prontuarioRef = doc(firestore, 'prontuarios', id); // Certifique-se de que 'id' está correto
            await updateDoc(prontuarioRef, formData); // Atualiza o documento no Firestore
            Alert.alert('Sucesso', 'Prontuário atualizado com sucesso!');
            setEditable(false); // Desabilita o modo de edição
        } catch (error) {
            console.error('Erro ao atualizar prontuário:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o prontuário.');
        }
    };

    // Excluir prontuário do Firestore
    const handleDelete = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este prontuário?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            const prontuarioRef = doc(firestore, 'prontuarios', id); // Certifique-se de que 'id' está correto
                            await deleteDoc(prontuarioRef); // Exclui o documento no Firestore
                            Alert.alert('Sucesso', 'Prontuário excluído com sucesso!');
                            navigation.goBack(); // Volta para a lista de prontuários
                        } catch (error) {
                            console.error('Erro ao excluir prontuário:', error);
                            Alert.alert('Erro', 'Não foi possível excluir o prontuário.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Prontuário de {formData.nomePaciente}</Text>

            {/* Dados Pessoais */}
            <Text style={styles.subHeader}>Dados Pessoais</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.nomePaciente}
                onChangeText={(text) => setFormData({ ...formData, nomePaciente: text })}
                placeholder="Nome Completo"
            />
            <Text style={styles.title}>Data de Nascimento</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.dataNascPaciente}
                onChangeText={(text) => setFormData({ ...formData, dataNascPaciente: text })}
                placeholder="Data de Nascimento"
            />
            <Text style={styles.title}>CPF</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.cpfPaciente}
                onChangeText={(text) => setFormData({ ...formData, cpfPaciente: text })}
                placeholder="CPF"
            />
            <Text style={styles.title}>Sexo Biológico</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.sexoBiologico}
                onChangeText={(text) => setFormData({ ...formData, sexoBiologico: text })}
                placeholder="Sexo Biológico"
            />
            <Text style={styles.title}>Gênero</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.generoPaciente}
                onChangeText={(text) => setFormData({ ...formData, generoPaciente: text })}
                placeholder="Gênero Paciente"
            />
            <Text style={styles.title}>E-mail</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.emailPaciente}
                onChangeText={(text) => setFormData({ ...formData, emailPaciente: text })}
                placeholder="E-mail"
            />
            <Text style={styles.title}>Endereço</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.enderecoPaciente}
                onChangeText={(text) => setFormData({ ...formData, enderecoPaciente: text })}
                placeholder="Endereço"
            />
            <Text style={styles.title}>Telefone de Contato</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.telefonePaciente}
                onChangeText={(text) => setFormData({ ...formData, telefonePaciente: text })}
                placeholder="Telefone de Contato"
            />
            
            {/* Contato Emergência */}
            <Text style={styles.subHeader}>Contato de Emergência</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.nomeContatoEmergencia}
                onChangeText={(text) => setFormData({ ...formData, nomeContatoEmergencia: text })}
                placeholder="Nome do Contato de Emergência"
            />
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.telefoneContatoEmergencia}
                onChangeText={(text) => setFormData({ ...formData, telefoneContatoEmergencia: text })}
                placeholder="Telefone de Emergência"
            />
            
            {/*Dados Clínicos Básicos*/}
            <Text style={styles.subHeader}>Dados Clínicos Básicos</Text>
            <Text style={styles.title}>Peso(kg)</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.pesoPaciente}
                onChangeText={(text) => setFormData({ ...formData, pesoPaciente: text })}
                placeholder="Peso(kg)"
            />
            <Text style={styles.title}>Altura</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.alturaPaciente}
                onChangeText={(text) => setFormData({ ...formData, alturaPaciente: text })}
                placeholder="Altura"
            />
            <Text style={styles.title}>Tipo Sanguíneo</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.tipoSanguineo}
                onChangeText={(text) => setFormData({ ...formData, tipoSanguineo: text })}
                placeholder="Tipo Sanguineo"
            />
            <Text style={styles.title}>Limitação</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.limitacaoPaciente}
                onChangeText={(text) => setFormData({ ...formData, limitacaoPaciente: text })}
                placeholder="Limitação Paciente"
            />

            {/* Histórico de Saúde */}
            <Text style={styles.subHeader}>Histórico de Saúde</Text>
            <Text style={styles.title}>Alergia</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.alergiaPaciente}
                onChangeText={(text) => setFormData({ ...formData, alergiaPaciente: text })}
                placeholder="Alergias"
            />
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.detalheAlergia}
                onChangeText={(text) => setFormData({ ...formData, detalheAlergia: text })}
                placeholder="Detalhes da Alergia"
            />
            <Text style={styles.title}>Já fez alguma cirurgia?</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.cirurgiaFeita}
                onChangeText={(text) => setFormData({ ...formData, cirurgiaFeita: text })}
                placeholder="Cirurgias?"
            />
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.detalheCirurgia}
                onChangeText={(text) => setFormData({ ...formData, detalheCirurgia: text })}
                placeholder="Detalhes da Cirurgia"
            />
            <Text style={styles.title}>Toma algum medicamento?</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.tomaMedicamento}
                onChangeText={(text) => setFormData({ ...formData, tomaMedicamento: text })}
                placeholder="Toma algum medicamento?"
            />
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.detalheMedicamento}
                onChangeText={(text) => setFormData({ ...formData, detalheMedicamento: text })}
                placeholder="Medicamentos que o paciente toma"
            />
            <Text style={styles.title}>É fumante?</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.fumante}
                onChangeText={(text) => setFormData({ ...formData, fumante: text })}
                placeholder="Fumante?"
            />

            {/*Histórico Familiar*/}
            <Text style={styles.subHeader}>Histórico Familiar</Text>
            <Text style={styles.title}>Doenças Familiares</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.historicoFamiliar}
                onChangeText={(text) => setFormData({ ...formData, historicoFamiliar: text })}
                placeholder="Doenças Familiares"
            />
            <Text style={styles.title}>Consumo de Álcool?</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.consumoAlcool}
                onChangeText={(text) => setFormData({ ...formData, consumoAlcool: text })}
                placeholder="Consumo de Álcool"
            />
            <Text style={styles.title}>Atividade Física</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.atividadeFisica}
                onChangeText={(text) => setFormData({ ...formData, atividadeFisica: text })}
                placeholder="Atividade Física"
            />
            <Text style={styles.title}>Observações Adicionais</Text>
            <TextInput
                style={[styles.input, !editable && styles.readOnly]}
                editable={editable}
                value={formData.observacoesAdicionais}
                onChangeText={(text) => setFormData({ ...formData, observacoesAdicionais: text })}
                placeholder="Observações Adicionais"
            />

            {/* Botões de exportação */}
            <TouchableOpacity
                style={styles.exportButton}
                onPress={() => generatePDF(formData)}
            >
                <Ionicons name="document-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}> Exportar para PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.exportButton}
                onPress={() => exportToDOC(formData)} 
            >
                <Ionicons name="document-text-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}> Exportar para DOC</Text>
            </TouchableOpacity>

            {/* Botões de ação */}
            <View style={styles.buttonContainer}>
                {editable ? (
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={() => setEditable(true)}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3D3A72',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#4A4A4A',
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
    readOnly: {
        backgroundColor: '#f9f9f9',
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#3D3A72',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D3A72',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});
