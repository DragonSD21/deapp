import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../../services/api';

import styles from './styles';

function Profile({ route, navigation }) {

    const { user } = route.params;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ministry, setMinistry] = useState('');
    const [absences, setAbsences] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);

    const [password1, setPassword1] = useState("");
    const [icon1, setIcon1] = useState("visibility"); // visibility || visibility-off
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);

    const [password2, setPassword2] = useState("");
    const [icon2, setIcon2] = useState('visibility'); // visibility || visibility-off
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);

    const [password3, setPassword3] = useState("");
    const [icon3, setIcon3] = useState('visibility'); // visibility || visibility-off
    const [secureTextEntry3, setSecureTextEntry3] = useState(true);

    const borderBottomWidthPassword1 = useRef(new Animated.Value(1)).current;
    const borderBottomWidthPassword2 = useRef(new Animated.Value(1)).current;
    const borderBottomWidthPassword3 = useRef(new Animated.Value(1)).current;

    const [colorTextPassowrd1, setColorTextPassowrd1] = useState('#000');
    const [colorTextPassowrd2, setColorTextPassowrd2] = useState('#000');
    const [colorTextPassowrd3, setColorTextPassowrd3] = useState('#000');

    function animationPassword1(event) {

        if(event) {
            Animated.timing(borderBottomWidthPassword1, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword1.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthPassword1, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword1.setValue(1);
            });
        }

    }

    function animationPassword2(event) {

        if(event) {
            Animated.timing(borderBottomWidthPassword2, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword2.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthPassword2, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword2.setValue(1);
            });
        }

    }

    function animationPassword3(event) {

        if(event) {
            Animated.timing(borderBottomWidthPassword3, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword3.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthPassword3, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthPassword3.setValue(1);
            });
        }

    }

    function confirmPassword(password) {

        if(password.indexOf(' ') >= 0) {
            Alert.alert(
                'Erro ao alterar a senha',
                'Senha não pode conter espaço. Tente novamente'
            );
            return false;
        }

        if(password === "") {
            Alert.alert(
                'Erro ao alterar a senha',
                'Senha não pode ser vazia. Tente novamente'
            );
            return false;
        }

        return true;
    }

    function resetForm() {
        setPassword1("");
        setIcon1("visibility");
        setSecureTextEntry1(true);
        setColorTextPassowrd1('#000');
        setPassword2("");
        setIcon2("visibility");
        setSecureTextEntry2(true);
        setColorTextPassowrd2('#000');
        setPassword3("");
        setIcon3("visibility");
        setSecureTextEntry3(true);
        setColorTextPassowrd3('#000');
    }

    function confirmChangePassword() {

        if(confirmPassword(password2)) {
            if(confirmPassword(password3)) {

                if(password2 === password3) {
                    api.put(`profile/${user}`, {
                        oldPassword: password1,
                        newPassword: password2,
                    }).then(response => {
                        Alert.alert('Senha alterada com sucesso!');
                        resetForm();
                        setOpacityBackground(1);
                        setModalVisible(!modalVisible);
                    }).catch(err => {
                        const errorType = err.response.data;
        
                        if(errorType.errorCode === 1) {
                            Alert.alert(
                                'Erro ao alterar a senha',
                                'Senha antiga não confere com a do banco de dados. Tente novamente'
                            );
                            setColorTextPassowrd1('#FF0000');
                            setColorTextPassowrd2('#000');
                            setColorTextPassowrd3('#000');
                        }
                        else {
                            Alert.alert(
                                'Erro no servidor',
                                'Tente novamente mais tarde'
                            );
                        }
                    });
                }
                else {
                    Alert.alert(
                        'Erro ao alterar a senha',
                        'Confirmação da nova senha sem sucesso. Tente novamente'
                    );
                    setColorTextPassowrd1('#000');
                    setColorTextPassowrd2('#FF0000');
                    setColorTextPassowrd3('#FF0000');
                }

            }
            else {
                setColorTextPassowrd1('#000');
                setColorTextPassowrd2('#000');
                setColorTextPassowrd3('#FF0000');
            }
        }
        else {
            setColorTextPassowrd1('#000');
            setColorTextPassowrd2('#FF0000');
            setColorTextPassowrd3('#000');
        }
        
    }

    useEffect(() => {
        
        api.get(`profile/${user}`)
            .then(response => {
                setName(response.data.name);
                setType(response.data.type);
                setMinistry(response.data.ministry);
                setAbsences(response.data.absences);
            });

        resetForm();
        
    }, []);

    return (
        <View style={styles.container}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { 
                    setOpacityBackground(1);
                    setModalVisible(!modalVisible);
                    resetForm();
                }}
            >
                <View style={styles.containerModal}>
                    <Text style={styles.textHeaderModal}>Alterar senha</Text>

                    <View style={styles.containerForm}>

                        <Text style={[
                            styles.textTitle, 
                            {
                                color: colorTextPassowrd1
                            }
                        ]}>
                            Senha antiga:
                        </Text>
                        <Animated.View style={[
                            styles.containerPassword, 
                            {
                                borderBottomWidth: borderBottomWidthPassword1.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [1, 2],
                                    extrapolate: 'clamp'
                                }),
                                borderBottomColor: colorTextPassowrd1
                            }
                        ]}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry1}
                                placeholder="Digite sua senha antiga"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password1}
                                onChangeText={setPassword1}
                                onFocus={() => animationPassword1(1)}
                                onBlur={() => animationPassword1(0)}
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
                            
                        <Text style={[
                            styles.textTitle, 
                            {
                                color: colorTextPassowrd2
                            }
                        ]}>
                            Nova senha:
                        </Text>
                        <Animated.View style={[
                            styles.containerPassword, 
                            {
                                borderBottomWidth: borderBottomWidthPassword2.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [1, 2],
                                    extrapolate: 'clamp'
                                }),
                                borderBottomColor: colorTextPassowrd2
                            }
                        ]}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry2}
                                placeholder="Digite sua nova senha"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password2}
                                onChangeText={setPassword2}
                                onFocus={() => animationPassword2(1)}
                                onBlur={() => animationPassword2(0)}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if(icon2 === "visibility") {
                                        setIcon2("visibility-off");
                                        setSecureTextEntry2(false);
                                    }
                                    else {
                                        setIcon2("visibility");
                                        setSecureTextEntry2(true);
                                    }
                                }}
                            >
                                <MaterialIcons name={icon2} size={24} color="#6D6A69" />
                            </TouchableOpacity>
                        </Animated.View>

                        <Text style={[
                            styles.textTitle, 
                            {
                                color: colorTextPassowrd3
                            }
                        ]}>
                            Confirmar nova senha:
                        </Text>
                        <Animated.View style={[
                            styles.containerPassword, 
                            {
                                borderBottomWidth: borderBottomWidthPassword3.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [1, 2],
                                    extrapolate: 'clamp'
                                }),
                                borderBottomColor: colorTextPassowrd3
                            }
                        ]}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry3}
                                placeholder="Confirmar sua nova senha"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password3}
                                onChangeText={setPassword3}
                                onFocus={() => animationPassword3(1)}
                                onBlur={() => animationPassword3(0)}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if(icon3 === "visibility") {
                                        setIcon3("visibility-off");
                                        setSecureTextEntry3(false);
                                    }
                                    else {
                                        setIcon3("visibility");
                                        setSecureTextEntry3(true);
                                    }
                                }}
                            >
                                <MaterialIcons name={icon3} size={24} color="#6D6A69" />
                            </TouchableOpacity>
                        </Animated.View>

                        <View style={styles.containerButtonsModal}>
                            <TouchableOpacity
                                style={styles.buttonsModal}
                                onPress={() => { 
                                    setOpacityBackground(1);
                                    setModalVisible(!modalVisible);
                                    resetForm();
                                }}
                            >
                                <Text style={styles.textButtonsModal}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonsModal}
                                onPress={confirmChangePassword}
                            >
                                <Text style={styles.textButtonsModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                </View>
            </Modal>

            <View style={{ opacity: opacityBackground }}>
                <Text style={styles.textPropTitle}>Nome</Text>
                <Text style={styles.textPropValue}>{name}</Text>

                <Text style={styles.textPropTitle}>Usuário</Text>
                <Text style={styles.textPropValue}>{user}</Text>

                <Text style={styles.textPropTitle}>Faltas</Text>
                <Text style={styles.textPropValue}>{absences}</Text>

                <Text style={styles.textPropTitle}>Tipo de servo</Text>
                <Text style={styles.textPropValue}>{type}</Text>

                <Text style={styles.textPropTitle}>Ministério</Text>
                <Text style={styles.textPropValue}>{ministry}</Text>

                <TouchableOpacity
                    style={styles.buttonChangePassword}
                    onPress={() => {
                        setOpacityBackground(0.5);
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.textButtonChangePassword}>Alterar senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Profile;