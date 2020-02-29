import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import Logo from '../../assets/LogoDEA.png'

function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { 
                    setOpacityBackground(1);
                    setModalVisible(!modalVisible) 
                }}
            >
                <View style={styles.containerModal}>
                    <Text style={styles.textTitleModal}>Servos</Text>
                    <TextInput
                        style={styles.textLoginPassword}
                        placeholder="Digite seu login"
                    />
                    <TextInput
                        style={styles.textLoginPassword}
                        placeholder="Digite sua senha"
                    />

                    <View style={styles.containerButtonsLogin}>
                        <TouchableOpacity
                            style={styles.buttonsLogin}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible) 
                            }}
                        >
                            <MaterialIcons name="clear" size={50} color="#FF0000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsLogin}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible)
                                navigation.navigate('ServosMain')
                            }}
                        >
                            <MaterialIcons name="done" size={50} color="#247E16" />
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            <View style={{ alignItems: 'center', opacity: opacityBackground }}>
                <Text style={styles.textTitle}>DÉApp</Text>
                <Image style={styles.icon} source={Logo}></Image>
                <TouchableOpacity style={styles.buttonServos} onPress={() => {
                    setOpacityBackground(0.5);
                    setModalVisible(true);
                    // navigation.navigate('ServosMain')
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        // justifyContent: 'center', //Alinhar na vertical
        alignItems: 'center', //Alinhar na horizontal
        backgroundColor: '#141932',
    },

    //Login
    containerModal: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        marginTop: 150,
        marginBottom: 200,
        marginHorizontal: 20,
        alignItems: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textTitleModal: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 10,
    },
    textLoginPassword: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: 300,
        height: 50,
    },
    containerButtonsLogin: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        width: 280,
    },
    buttonsLogin: {
        height: 50,
        width: 60,
        borderWidth: 2,
        borderColor: "#979191",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
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
    },

});

export default Home;