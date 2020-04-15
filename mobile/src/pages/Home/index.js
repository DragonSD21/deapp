import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import Logo from '../../../assets/LogoDEA.png';

import styles from './styles';

function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [icon1, setIcon1] = useState("visibility"); // visibility || visibility-off
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);

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

                    <View style={styles.containerForm}>
                        <Text style={styles.textUserPassword}>Login</Text>
                        <TextInput
                            style={styles.textInputLogin}
                            placeholder="Digite seu login"
                            placeholderTextColor="#999"
                            autoCapitalize={"none"}
                            autoCorrect={false}
                        />
                        
                        <Text style={styles.textUserPassword}>Senha</Text>
                        <View style={styles.containerPassword}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry1}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if(icon1 === "visibility") {
                                        setIcon1("visibility-off");
                                        setSecureTextEntry1(false);
                                    }
                                    else {
                                        setIcon1("visibility");
                                        setSecureTextEntry1(true);
                                    }
                                }}
                            >
                                <MaterialIcons name={icon1} size={24} color="#6D6A69" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerButtonsDoneClear}>
                        <TouchableOpacity
                            style={styles.buttonsDoneClear}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <MaterialIcons name="clear" size={50} color="#FF0000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsDoneClear}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible);
                                // navigation.navigate('Main');
                                navigation.navigate('FirstAccess');
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
                <TouchableOpacity style={[styles.buttonMain, { marginTop: 40 }]} onPress={() => {
                    setOpacityBackground(0.5);
                    setModalVisible(true);
                    // navigation.navigate('ServosMain')
                }}>
                    <Text style={styles.textButton}>Servos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMain} onPress={() => {}}>
                    <Text style={styles.textButton}>Encontristas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonExit} onPress={() => {}}>
                    <Text style={styles.textExit}>SAIR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home;