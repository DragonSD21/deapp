import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import Logo from '../../assets/LogoDEA.png'

function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>DÉApp</Text>
            <Image style={styles.icon} source={Logo}></Image>
            <TouchableOpacity style={styles.buttonServos} onPress={() => {
                navigation.navigate('ServosMain')
            }}>
                <Text style={styles.textButton}>Servos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEncontristas} onPress={() => {}}>
                <Text style={styles.textButton}>Encontristas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonExit} onPress={() => {}}>
                <Text style={styles.textExit}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center', //Alinhar na vertical
        alignItems: 'center', //Alinhar na horizontal
        backgroundColor: '#141932',
    },
    textTitle: {
        fontSize: 80,
        color: '#FFF',
        fontWeight: 'bold'
    },
    icon: {
        marginTop: 20,
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    buttonServos: {
        marginTop: 50,
        width: 200,
        height: 60,
        backgroundColor: '#3e56e8',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonEncontristas: {
        marginTop: 20,
        width: 200,
        height: 60,
        backgroundColor: '#3e56e8',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonExit: {
        marginTop: 50,
        width: 120,
        height: 50,
        backgroundColor: '#3e56e8',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textExit: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    }
});

export default Home;