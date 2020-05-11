import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Text, Picker, Alert, Animated } from 'react-native';

import api from '../../../services/api';

import styles from './styles';

function AddServant({ navigation }) {
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("12345");
    const [ministry, setMinistry] = useState("Dança");
    const [type, setType] = useState("Servo");

    const borderBottomWidthName = useRef(new Animated.Value(1)).current;
    const borderBottomWidthLogin = useRef(new Animated.Value(1)).current;
    const borderBottomWidthPassword = useRef(new Animated.Value(1)).current;

    const [colorTextName, setColorTextName] = useState('#000');
    const [colorTextLogin, setColorTextLogin] = useState('#000');
    const [colorTextPassowrd, setColorTextPassowrd] = useState('#000');

    function animationName(event) {

        if(event) {
            Animated.timing(borderBottomWidthName, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthName.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthName, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthName.setValue(1);
            });
        }

    }

    function animationLogin(event) {

        if(event) {
            Animated.timing(borderBottomWidthLogin, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthLogin.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthLogin, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthLogin.setValue(1);
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

    function confirmPassword(password) {

        if(password.indexOf(' ') >= 0) {
            Alert.alert(
                'Erro na senha',
                'Senha não pode conter espaço. Tente novamente'
            );
            return false;
        }

        if(password === "") {
            Alert.alert(
                'Erro na senha',
                'Senha não pode ser vazia. Tente novamente'
            );
            return false;
        }

        return true;
    }

    function confirmLogin(login) {

        if(login.indexOf(' ') >= 0) {
            Alert.alert(
                'Erro no usuário',
                'Usuário não pode conter espaço. Tente novamente'
            );
            return false;
        }

        if(login === "") {
            Alert.alert(
                'Erro no usuário',
                'Usuário não pode ser vazia. Tente novamente'
            );
            return false;
        }

        return true;
    }

    function removeUnnecessarySpaces(string) {
        let stringSplit = string.split(' ');
        let index = stringSplit.indexOf('');
        while(index >= 0){
            stringSplit.splice(index, 1);
            index = stringSplit.indexOf('');
        }
        return stringSplit.join(' ');
    }

    function resetForm() {
        setName("");
        setColorTextName('#000');

        setUser("");
        setColorTextLogin('#000');

        setPassword("12345");
        setColorTextPassowrd('#000');

        setType("Servo");
    }

    async function confirmInsert() {

        if(confirmPassword(password)) {
            if(confirmLogin(user)) {

                const data = {
                    user,
                    password,
                    name,
                    type,
                    ministry
                }
                
                await api.post("servants", data).then(response => {
                    Alert.alert(
                        'Novo servo cadastrado com sucesso!',
                        `Lembre-se de passar o usuário (${user}) e a senha (${password}) para o novo servo conseguir acessar o DÉApp.`,
                    );
                    resetForm();
                    navigation.pop();
                }).catch(err => {
                    const errorType = err.response.data;

                    if(errorType.errorCode === 1) {
                        Alert.alert('Usuário já existe', 'Tente novamente com outro usuário');
                        setColorTextName('#000')
                        setColorTextLogin('#FF0000');
                        setColorTextPassowrd('#000');
                    }
                });

            }
            else {
                setColorTextName('#000')
                setColorTextLogin('#FF0000');
                setColorTextPassowrd('#000');
            }
        }
        else {
            setColorTextName('#000')
            setColorTextLogin('#000');
            setColorTextPassowrd('#FF0000');
        }

    }

    useEffect(() => {
        resetForm();
    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.containerForm}>
                <View>
                    <Text style={[
                        styles.textPropTitle,
                        {
                            color: colorTextName,
                        }
                    ]}>
                        Nome
                    </Text>
                    <Animated.View style={{
                        borderBottomWidth: borderBottomWidthName.interpolate({
                            inputRange: [1, 2],
                            outputRange: [1, 2],
                            extrapolate: 'clamp'
                        }),
                        borderBottomColor: colorTextName
                    }}>
                        <TextInput
                            style={styles.textInputPropValue}
                            placeholder="Digite o nome do novo servo"
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={name}
                            onChangeText={setName}
                            onFocus={() => animationName(1)}
                            onBlur={() => {
                                animationName(0);
                                let nameServant = removeUnnecessarySpaces(name);
                                setName(nameServant);
                                nameServant = nameServant
                                    .normalize("NFD") // Normaliza para o unicode NFD
                                    .toLowerCase() // Coloca todas as letras em minúsculo
                                    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
                                    .split(' ');
                                let user = nameServant[0] + nameServant[nameServant.length - 1];
                                setUser(user);
                            }}
                        />
                    </Animated.View>
                </View>

                <View>
                    <Text style={[
                        styles.textPropTitle,
                        {
                            color: colorTextLogin,
                        }
                    ]}>
                        Login (por padrão, o primeiro e último nome)
                    </Text>
                    <Animated.View style={{
                        borderBottomWidth: borderBottomWidthLogin.interpolate({
                            inputRange: [1, 2],
                            outputRange: [1, 2],
                            extrapolate: 'clamp'
                        }),
                        borderBottomColor: colorTextLogin
                    }}>
                        <TextInput
                            style={styles.textInputPropValue}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={user}
                            onChangeText={setUser}
                            onFocus={() => animationLogin(1)}
                            onBlur={() => animationLogin(0)}
                        />
                    </Animated.View>
                </View>
                
                <View>
                    <Text style={[
                        styles.textPropTitle,
                        {
                            color: colorTextPassowrd,
                        }
                    ]}>
                        Senha (provisória)
                    </Text>
                    <Animated.View style={{
                        borderBottomWidth: borderBottomWidthPassword.interpolate({
                            inputRange: [1, 2],
                            outputRange: [1, 2],
                            extrapolate: 'clamp'
                        }),
                        borderBottomColor: colorTextPassowrd
                    }}>
                        <TextInput
                            style={styles.textInputPropValue}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => animationPassword(1)}
                            onBlur={() => animationPassword(0)}
                        />
                    </Animated.View>
                </View>

                <View>
                    <Text style={styles.textPropTitle}>Ministério</Text>
                    <View style={styles.containerPickerTypes}>
                        <Picker
                            selectedValue={ministry}
                            onValueChange={(itemValue, itemIndex) => {
                                setMinistry(itemValue);
                            }}
                        >
                            <Picker.Item label="Dança" value="Dança" />
                            <Picker.Item label="Música" value="Música" />
                            <Picker.Item label="Teatro" value="Teatro" />
                            <Picker.Item label="Intersseção" value="Intersseção" />
                            <Picker.Item label="Espiritualidade" value="Espiritualidade" />
                            <Picker.Item label="Acolhimento" value="Acolhimento" />
                            <Picker.Item label="Comunicação" value="Comunicação" />
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={styles.textPropTitle}>Tipo do novo servo</Text>
                    <View style={styles.containerPickerTypes}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue, itemIndex) => {
                                setType(itemValue);
                            }}
                        >
                            <Picker.Item label="Servo" value="Servo" />
                            <Picker.Item label="Servo responsável pela chamada" value="Servo responsável pela chamada" />
                            <Picker.Item label="Servo responsável geral" value="Servo responsável geral" />
                        </Picker>
                    </View>
                </View>
            </View>

            <View style={styles.containerButtonsBottom}>

                <TouchableOpacity
                    style={styles.buttonsBottom}
                    onPress={() => {
                        navigation.pop();
                    }}
                >
                    <Text style={styles.textButtonsBottom}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonsBottom}
                    onPress={confirmInsert}
                >
                    <Text style={styles.textButtonsBottom}>Confirmar</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default AddServant;