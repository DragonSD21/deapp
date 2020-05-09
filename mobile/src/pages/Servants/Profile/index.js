import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
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

    function updateBD() {
        
    }

    function getPasswordBD() {
        // Buscar qual a senha do usuário no banco de dados
        return password1;
    }

    function confirmChangePassword() {

        if(password1 === getPasswordBD()) {
            if(password2 === password3) {
                updateBD();
                Alert.alert('Senha alterada com sucesso!');
                setOpacityBackground(1);
                setModalVisible(!modalVisible)
            }
            else {
                // Ver o que fazer neste caso
                alert('Senhas diferentes. Digite novamente.');
            }
        }
        else {
            // Ver o que fazer neste caso
            alert('Senha atual incorreta. Tente novamente.');
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
                }}
            >
                <View style={styles.containerModal}>
                    <Text style={styles.textHeaderModal}>Alterar senha</Text>

                    <View style={styles.containerForm}>

                        <Text style={styles.textTitle}>Senha antiga:</Text>
                        <View style={styles.containerPassword}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry1}
                                placeholder="Digite sua senha antiga"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password1}
                                onChangeText={setPassword1}
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
                            
                        <Text style={styles.textTitle}>Nova senha:</Text>
                        <View style={styles.containerPassword}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry2}
                                placeholder="Digite sua nova senha"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password2}
                                onChangeText={setPassword2}
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

                        <Text style={styles.textTitle}>Confirmar nova senha:</Text>
                        <View style={styles.containerPassword}>
                            <TextInput
                                style={styles.textInputPassword}
                                secureTextEntry={secureTextEntry3}
                                placeholder="Confirmar sua nova senha"
                                placeholderTextColor="#999"
                                autoCapitalize={"none"}
                                autoCorrect={false}
                                value={password3}
                                onChangeText={setPassword3}
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
                        </View>

                        <View style={styles.containerButtonsModal}>
                            <TouchableOpacity
                                style={styles.buttonsModal}
                                onPress={() => { 
                                    setOpacityBackground(1);
                                    setModalVisible(!modalVisible) 
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