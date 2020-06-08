import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, TextInput, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import api from '../../services/api';

import Logo from '../../../assets/LogoDEA.png';

import styles from './styles';

function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [icon1, setIcon1] = useState("visibility"); // visibility || visibility-off
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);

    const borderBottomWidthUser = useRef(new Animated.Value(1)).current;
    const borderBottomWidthPassword = useRef(new Animated.Value(1)).current;

    const [colorTextUser, setColorTextUser] = useState('#000');
    const [colorTextPassowrd, setColorTextPassowrd] = useState('#000');

    function animationUser(event) {

        if(event) {
            Animated.timing(borderBottomWidthUser, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthUser.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthUser, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthUser.setValue(1);
            });
        }

    }

    function animationPassword(event) {

        if(event) {
            Animated.timing(borderBottomWidthPassword, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthPassword, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword.setValue(1);
            });
        }

    }

    function resetForm() {
        setUser("");
        setColorTextUser('#000');
        setPassword("");
        setIcon1("visibility");
        setSecureTextEntry1(true);
        setColorTextPassowrd('#000');
    }

    async function confirmData() {

        const data = {
            user,
            password,
        }

        try {
            const response = await api.post('sessions', data);

            setOpacityBackground(1);
            setModalVisible(false);

            if(response.data) {
                navigation.navigate('FirstAccess', data);
            }
            else {
                navigation.navigate('Main', {
                    user: user,
                });
            }
            resetForm();

        } catch (err) {
            const errorType = err.response.data;

            if(errorType.errorCode === -1) { //User
                Alert.alert("Usuário não encontrado", "Tente novamente");

                setColorTextUser('#FF0000');
                setColorTextPassowrd('#000');
            }

            if(errorType.errorCode === -2) { //Password
                Alert.alert("Senha incorreta", "Tente novamente");

                setColorTextUser('#000');
                setColorTextPassowrd('#FF0000');
            }

        }

    }

    useEffect(() => {
        setUser("");
        setPassword("");

        setIcon1("visibility");
        setSecureTextEntry1(true);
        
        setOpacityBackground(1);
        setModalVisible(false);

        setColorTextUser('#000');
        setColorTextPassowrd('#000');

        borderBottomWidthUser.setValue(1);
        borderBottomWidthPassword.setValue(1);
    }, []);

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
                        <Text style={[
                            styles.textUserPassword,
                            {
                                color: colorTextUser
                            }
                        ]}>
                            Login
                        </Text>
                        <Animated.View style={{
                            borderBottomWidth: borderBottomWidthUser.interpolate({
                                inputRange: [1, 2],
                                outputRange: [1, 2],
                                extrapolate: 'clamp'
                            }),
                            borderBottomColor: colorTextUser
                        }}>
                            <TextInput
                                style={styles.textInputLogin}
                                placeholder="Digite seu login"
                                placeholderTextColor='#999'
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={user}
                                onChangeText={setUser}
                                onFocus={() => animationUser(1)}
                                onBlur={() => animationUser(0)}
                            />
                        </Animated.View>
                        
                        <Text style={[
                            styles.textUserPassword,
                            {
                                color: colorTextPassowrd
                            }
                        ]}>
                            Senha
                        </Text>
                        <Animated.View style={[
                            styles.containerPassword,
                            {
                                borderBottomWidth: borderBottomWidthPassword.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [1, 2],
                                    extrapolate: 'clamp'
                                }),
                                borderBottomColor: colorTextPassowrd
                            }
                            ]}
                        >
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry1}
                                placeholder="Digite sua senha"
                                placeholderTextColor='#999'
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => animationPassword(1)}
                                onBlur={() => animationPassword(0)}
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
                        </Animated.View>
                    </View>

                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.buttonsModal}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textButtonsModal}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsModal}
                            onPress={confirmData}
                        >
                            <Text style={styles.textButtonsModal}>Confirmar</Text>
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
                }}>
                    <Text style={styles.textButton}>Servos</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonMain} onPress={() => {}}>
                    <Text style={styles.textButton}>Encontristas</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.buttonExit} onPress={() => {
                    const data = {
                        user: "rafaelmontrezol",
                        password: "12345",
                        name: "Rafael Rosman Rodrigues Montrezol",
                        type: "Servo responsável geral",
                        ministry: "Intercessão",
                    }

                    await api.post("servants", data).then(response => {
                        Alert.alert(
                            'Novo servo cadastrado com sucesso!',
                            `Lembre-se de passar o usuário (${user}) e a senha (${password}) para o novo servo conseguir acessar o DÉApp.`,
                        );
                        // resetForm();
                        // navigation.pop();
                    }).catch(err => {
                        alert("erro");
                        // const errorType = err.response.data;
    
                        // if(errorType.errorCode === 1) {
                        //     Alert.alert('Usuário já existe', 'Tente novamente com outro usuário');
                        //     setColorTextName('#000')
                        //     setColorTextLogin('#FF0000');
                        //     setColorTextPassowrd('#000');
                        // }
                    });
                }}>
                    <Text style={styles.textExit}>SAIR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home;