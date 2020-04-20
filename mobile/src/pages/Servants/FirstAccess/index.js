import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

function FirstAccess({ navigation }) {
    const [icon1, setIcon1] = useState("visibility"); // visibility || visibility-off
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [icon2, setIcon2] = useState('visibility'); // visibility || visibility-off
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);

    return (

        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <View style={{ alignItems: 'center' }}>

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
                        defaultValue={'rafaelmontrezol'}
                        editable={false}
                    />
                        
                    <Text style={styles.textTitle}>Senha definitiva:</Text>
                    <View style={styles.containerPassword}>
                        <TextInput
                            style={styles.textInputPassword}
                            secureTextEntry={secureTextEntry1}
                            placeholder="Senha"
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

                    <Text style={styles.textTitle}>Confirmar senha definitiva:</Text>
                    <View style={styles.containerPassword}>
                        <TextInput
                            style={styles.textInputPassword}
                            secureTextEntry={secureTextEntry2}
                            placeholder="Confirmar senha"
                            placeholderTextColor="#999"
                            autoCapitalize={"none"}
                            autoCorrect={false}
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
                    </View>

                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Alert.alert('Senha alterada com sucesso!', 'Bem vindo ao DÉApp! =D');
                        navigation.pop();
                        navigation.navigate('Main');
                    }}
                >
                    <Text style={styles.textButton}>Confirmar</Text>
                </TouchableOpacity>

            </View>

            </KeyboardAvoidingView>
    );

}

export default FirstAccess;