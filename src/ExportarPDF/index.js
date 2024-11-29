import React from 'react';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const generatePDF = async (prontuario) => {
    try {
        // Obter a data e horário atual
        const currentDateTime = new Date();
        const formattedDate = currentDateTime.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const formattedTime = currentDateTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const currentYear = currentDateTime.getFullYear(); 

        // HTML Template para o PDF
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            color: #333;
                            background-color: #f8f9fa;
                        }
                        .container {
                            padding: 20px;
                            max-width: 800px;
                            margin: auto;
                            background: #fff;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                        }
                        .header {
                            text-align: center;
                            color: #3D3A72;
                            margin-bottom: 20px;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 22px;
                        }
                        .header p {
                            font-size: 12px;
                            color: #555;
                        }
                        .section {
                            margin-bottom: 20px;
                        }
                        .section h2 {
                            font-size: 16px;
                            margin-bottom: 10px;
                            color: #3D3A72;
                            border-bottom: 2px solid #3D3A72;
                            padding-bottom: 5px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 6px;
                            text-align: left;
                            font-size: 12px;
                        }
                        th {
                            background-color: #3D3A72;
                            color: #fff;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            font-size: 12px;
                            color: #555;
                        }
                        .signature {
                            margin-top: 30px;
                            text-align: center;
                        }
                        .signature div {
                            border-top: 1px solid #333;
                            width: 200px;
                            margin: auto;
                            margin-top: 10px;
                        }
                        .timestamp {
                            font-size: 10px;
                            text-align: center;
                            margin-top: 10px;
                            color: #555;
                        }
                        @page {
                            size: A4;
                            margin: 10mm;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Prontuário Médico</h1>
                            <p>Documento gerado em ${formattedDate} às ${formattedTime}</p>
                        </div>
                        
                        <div class="section">
                            <h2>Dados Pessoais</h2>
                            <table>
                                <tr><th>Nome</th><td>${prontuario.nomePaciente}</td></tr>
                                <tr><th>Data de Nascimento</th><td>${prontuario.dataNascPaciente}</td></tr>
                                <tr><th>CPF</th><td>${prontuario.cpfPaciente}</td></tr>
                                <tr><th>Sexo Biológico</th><td>${prontuario.sexoBiologico}</td></tr>
                                <tr><th>Gênero</th><td>${prontuario.generoPaciente}</td></tr>
                                <tr><th>E-mail</th><td>${prontuario.emailPaciente}</td></tr>
                                <tr><th>Endereço</th><td>${prontuario.enderecoPaciente}</td></tr>
                                <tr><th>Telefone de Contato</th><td>${prontuario.telefonePaciente}</td></tr>
                            </table>
                        </div>

                        <div class="section">
                            <h2>Contato de Emergência</h2>
                            <table>
                                <tr><th>Nome</th><td>${prontuario.nomeContatoEmergencia}</td></tr>
                                <tr><th>Telefone</th><td>${prontuario.telefoneContatoEmergencia}</td></tr>
                            </table>
                        </div>

                        <div class="section">
                            <h2>Dados Clínicos Básicos</h2>
                            <table>
                                <tr><th>Peso</th><td>${prontuario.pesoPaciente} kg</td></tr>
                                <tr><th>Altura</th><td>${prontuario.alturaPaciente}</td></tr>
                                <tr><th>Tipo Sanguíneo</th><td>${prontuario.tipoSanguineo}</td></tr>
                                <tr><th>Limitação</th><td>${prontuario.limitacaoPaciente}</td></tr>
                            </table>
                        </div>

                        <div class="section">
                            <h2>Histórico de Saúde</h2>
                            <table>
                                <tr><th>Alergia</th><td>${prontuario.alergiaPaciente}</td></tr>
                                <tr><th>Detalhes</th><td>${prontuario.detalheAlergia}</td></tr>
                                <tr><th>Cirurgia</th><td>${prontuario.cirurgiaFeita}</td></tr>
                                <tr><th>Detalhes da Cirurgia</th><td>${prontuario.detalheCirurgia}</td></tr>
                                <tr><th>Medicamentos</th><td>${prontuario.detalheMedicamento}</td></tr>
                                <tr><th>Fumante</th><td>${prontuario.fumante}</td></tr>
                            </table>
                        </div>

                        <div class="section">
                            <h2>Histórico Familiar</h2>
                            <table>
                                <tr><th>Doenças Familiares</th><td>${prontuario.historicoFamiliar}</td></tr>
                                <tr><th>Consumo de Álcool</th><td>${prontuario.consumoAlcool}</td></tr>
                                <tr><th>Atividade Física</th><td>${prontuario.atividadeFisica}</td></tr>
                                <tr><th>Observações</th><td>${prontuario.observacoesAdicionais}</td></tr>
                            </table>
                        </div>

                        <div class="signature">
                            <p>Médico Responsável:</p>
                            <div></div>
                        </div>

                        <div class="footer">
                            <p>© ${currentYear} MedDocs. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Gerar o PDF
        const { uri } = await Print.printToFileAsync({ html: htmlContent });

        // Compartilhar o PDF
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
        } else {
            Alert.alert('Sucesso', `PDF gerado em: ${uri}`);
        }
    } catch (error) {
        console.error('Erro ao exportar para PDF:', error);
        Alert.alert('Erro', 'Não foi possível gerar o PDF.');
    }
};

export default generatePDF;
