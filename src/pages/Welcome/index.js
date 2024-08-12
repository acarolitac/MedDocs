import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'; //biblioteca de animação
import { useNavigation } from '@react-navigation/native'

export default function Welcome() {
    const navigation = useNavigation(); //navegar até a tela de Login através do botão "Acessar"

  return (
    <View style={styles.container}> 

        <View style={styles.containerLogo}> 
            <Animatable.Image
                animation="flipInY"
                source={require('../../assets/MedDocsLogo1.png')}
                style={{ width: 150, height: 150}}
                resizeMode="contain"
            />
        </View>

        <Animatable.View delay={550} animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>Gerencie os prontuários de seus pacientes de qualquer lugar!</Text>
            <Text style={styles.text}>Faça o login para começar</Text>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
        </Animatable.View>
      
    </View>
  );
}

const styles = StyleSheet.create({
    //container geral
    container:{
        flex:1, //tamanho que tá ocupando
        backgroundColor: '#3D3A72'
    },
    //container da logo
    containerLogo:{
        flex:1.7, //tamanho que tá ocupando
        backgroundColor: '#3D3A72',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //container do texto
    containerForm:{
        flex:1, //tamanho que tá ocupando
        backgroundColor: '#fff', 
        borderTopLeftRadius: 25, //arredondar borda esquerda
        borderTopRightRadius: 25, //arredondar borda direita
        paddingStart: '5%', //espaçamento interno (usar % pois o tamanho vai se comportar de acordo com o tamanho da tela)
        paddingEnd: '5%' //espaçamento no final
    },
    //tÍtulo "Gerencia e organize os prontuários dos seus pacientes de qualquer lugar!"
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginTop: 28,
        marginBottom: 12,
    },
    //texto "Faça o login para começar"
    text:{
        color: '#3F3F3F'
    },
    //botão "Acessar"
    button:{
        position: 'absolute',
        backgroundColor: '#3D3A72',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%', //(usar % pois o tamanho vai se comportar de acordo com o tamanho da tela)
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
})