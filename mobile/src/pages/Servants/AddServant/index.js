import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Text, Picker, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

function AddServant({ navigation }) {
    const [nameNewServant, setNameNewServant] = useState("");
    const [loginNewServant, setLoginNewServant] = useState("");
    const [passwordNewServant, setPasswordNewServant] = useState("12345");
    const [typeServant, setTypeServant] = useState("Servo");

    useEffect(() => {
        setNameNewServant("");
        setLoginNewServant("");
        setPasswordNewServant("12345");
        setTypeServant("Servo");
    }, []);

    function removeUnnecessarySpaces(string) {
        let stringSplit = string.split(' ');
        let index = stringSplit.indexOf('');
        while(index >= 0){
            stringSplit.splice(index, 1);
            index = stringSplit.indexOf('');
        }
        return stringSplit.join(' ');
    }

    return (

        <View style={styles.container}>

            <View style={styles.containerForm}>
                <View>
                    <Text style={styles.textPropTitle}>Nome</Text>
                    <TextInput
                        style={styles.textInputPropValue}
                        placeholder="Digite o nome do novo servo"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={nameNewServant}
                        onChangeText={setNameNewServant}
                        onBlur={() => {
                            let nameServant = removeUnnecessarySpaces(nameNewServant);
                            setNameNewServant(nameServant);
                            nameServant = nameServant
                                .normalize("NFD") // Normaliza para o unicode NFD
                                .toLowerCase() // Coloca todas as letras em minúsculo
                                .replace(/[\u0300-\u036f]/g, '') // Remove acentos
                                .split(' ');
                            let user = nameServant[0] + nameServant[nameServant.length - 1];
                            setLoginNewServant(user);
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.textPropTitle}>Login (por padrão, o primeiro e último nome)</Text>
                    <TextInput
                        style={styles.textInputPropValue}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={loginNewServant}
                        onChangeText={setLoginNewServant}
                    />
                </View>
                
                <View>
                    <Text style={styles.textPropTitle}>Senha (provisória)</Text>
                    <TextInput
                        style={styles.textInputPropValue}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={passwordNewServant}
                        onChangeText={setPasswordNewServant}
                    />
                </View>

                <View>
                    <Text style={styles.textPropTitle}>Tipo do novo servo</Text>
                    <View style={styles.containerPickerTypeServants}>
                        <Picker
                            selectedValue={typeServant}
                            onValueChange={(itemValue, itemIndex) => {
                                setTypeServant(itemValue);
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
                        // navigation.navigate('Main');
                    }}
                >
                    <Text style={styles.textButtonsBottom}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonsBottom}
                    onPress={() => {
                        Alert.alert(
                            'Novo servo cadastrado com sucesso!',
                            `Lembre-se de passar o usuário (${loginNewServant}) e a senha (${passwordNewServant}) para o novo servo conseguir acessar o DÉApp.`,
                        );
                        // navigation.navigate('Main');
                    }}
                >
                    <Text style={styles.textButtonsBottom}>Confirmar</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default AddServant;