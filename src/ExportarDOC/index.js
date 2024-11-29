import React from 'react';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const exportToDOC = async (prontuario) => {
    const docContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.5; }
                h1 { text-align: center; }
                p { margin: 0 0 10px; }
            </style>
        </head>
        <body>
            <h1>Prontuário de ${prontuario.nomePaciente}</h1>

            <h2>Dados Pessoais</h2>
            <p><strong>Nome:</strong> ${prontuario.nomePaciente}</p>
            <p><strong>Data de Nascimento:</strong> ${prontuario.dataNascPaciente}</p>
            <p><strong>CPF:</strong> ${prontuario.cpfPaciente}</p>
            <p><strong>Sexo Biológico:</strong> ${prontuario.sexoBiologico}</p>
            <p><strong>Gênero:</strong> ${prontuario.generoPaciente}</p>
            <p><strong>E-mail:</strong> ${prontuario.emailPaciente}</p>
            <p><strong>Endereço:</strong> ${prontuario.enderecoPaciente}</p>
            <p><strong>Telefone:</strong> ${prontuario.telefonePaciente}</p>
            <hr />

            <h2>Contato de Emergência</h2>
            <p><strong>Nome:</strong> ${prontuario.nomeContatoEmergencia}</p>
            <p><strong>Telefone:</strong> ${prontuario.telefoneContatoEmergencia}</p>
            <hr />
            
            <h2>Dados Clínicos Básicos</h2>
            <p><strong>Peso(kg):</strong> ${prontuario.pesoPaciente}</p>
            <p><strong>Altura:</strong> ${prontuario.alturaPaciente}</p>
            <p><strong>Tipo Sanguíneo:</strong> ${prontuario.tipoSanguineo}</p>
            <p><strong>Limitação:</strong> ${prontuario.limitacaoPaciente}</p>
            <hr />

            <h2>Histórico de Saúde</h2>
            <p><strong>Alergia:</strong> ${prontuario.alergiaPaciente} ${prontuario.detalheAlergia}</p>
            <p><strong>Já fez alguma cirurgia?</strong> ${prontuario.cirurgiaFeita} ${prontuario.detalheCirurgia}</p>
            <p><strong>Toma algum medicamento?</strong> ${prontuario.tomaMedicamento} ${prontuario.detalheMedicamento}</p>
            <p><strong>Fumante:</strong> ${prontuario.fumante}</p>
            <hr />

            <h2>Histórico de Saúde</h2>
            <p><strong>Doenças Familiares:</strong> ${prontuario.historicoFamiliar}</p>
            <p><strong>Consumo de Álcool:</strong> ${prontuario.consumoAlcool}</p>
            <p><strong>Atividade Física:</strong> ${prontuario.atividadeFisica}</p>
            <p><strong>Observações Adicionais:</strong> ${prontuario.observacoesAdicionais}</p>
            <hr />
        </body>
        </html>
    `;

    try {
        const filePath = `${FileSystem.documentDirectory}Prontuario_${prontuario.nomePaciente.replace(/\s/g, '_')}.doc`;
        await FileSystem.writeAsStringAsync(filePath, docContent, { encoding: FileSystem.EncodingType.UTF8 });
        Alert.alert('Sucesso', `DOC gerado em: ${filePath}`);
    } catch (error) {
        console.error('Erro ao gerar DOC:', error);
        Alert.alert('Erro', 'Não foi possível gerar o DOC.');
    }
};
