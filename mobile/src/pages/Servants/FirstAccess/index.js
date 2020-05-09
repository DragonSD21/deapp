import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Animated } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../../services/api';
import styles from './styles';

function FirstAccess({ route, navigation }) {

    const { user, password } = route.params;
    const oldPassword = password;

    const [password1, setPassword1] = useState("");
    const [icon1, setIcon1] = useState("visibility"); // visibility || visibility-off
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);

    const [password2, setPassword2] = useState("");
    const [icon2, setIcon2] = useState('visibility'); // visibility || visibility-off
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);

    const borderBottomWidthPassword1 = useRef(new Animated.Value(1)).current;
    const borderBottomWidthPassword2 = useRef(new Animated.Value(1)).current;

    const [colorTextPassowrd1, setColorTextPassowrd1] = useState('#000');
    const [colorTextPassowrd2, setColorTextPassowrd2] = useState('#000');

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
    }

    function confirmChangePassword() {

        if(confirmPassword(password1)) {
            if(confirmPassword(password2)) {

                if(password1 === password2) {
                    api.put(`profile/${user}`, {
                        oldPassword: oldPassword,
                        newPassword: password2,
                    }).then(response => {
                        Alert.alert('Senha alterada com sucesso', 'Favor faça o login novamente com sua nova senha');
                        resetForm();
                        navigation.pop();
                    }).catch(err => {
                        Alert.alert(
                            'Erro no servidor',
                            'Tente novamente mais tarde'
                        );
                    });
                }
                else {
                    Alert.alert(
                        'Erro ao alterar a senha',
                        'Confirmação da nova senha sem sucesso. Tente novamente'
                    );
                    setColorTextPassowrd1('#FF0000');
                    setColorTextPassowrd2('#FF0000');
                }

            }
            else {
                setColorTextPassowrd1('#000');
                setColorTextPassowrd2('#FF0000');
            }
        }
        else {
            setColorTextPassowrd1('#FF0000');
            setColorTextPassowrd2('#000');
        }
        
    }

    useEffect(() => {

    }, []);

    return (

        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>

                <View style={styles.containerWarning}>
                    <Text style={styles.textWarning}>
                        {"> > > ATENÇÃO < < <"}
                    </Text>
                    <Text style={styles.textWarning}>
                        Este é seu primeiro acesso ao aplicativo com sua senha provisória. Favor defina sua senha definitiva para usa-lá em seus próximos acessos:
                    </Text>
                </View>

                <View style={styles.containerForm}>

                    <Text style={styles.textTitle}>Usuário (não editável):</Text>
                    <TextInput
                        style={styles.textInputUser}
                        defaultValue={user}
                        editable={false}
                    />
                        
                    <Text style={[
                        styles.textTitle,
                        {
                            color: colorTextPassowrd1
                        }
                    ]}>
                        Senha definitiva:
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
                            placeholder="Senha"
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
                        Confirmar senha definitiva:
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
                            placeholder="Confirmar senha"
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

                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={confirmChangePassword}
                >
                    <Text style={styles.textButton}>Confirmar</Text>
                </TouchableOpacity>

            </View>

            </KeyboardAvoidingView>
    );

}

export default FirstAccess;