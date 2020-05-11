import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker, Alert, Animated } from 'react-native';

import api from '../../../services/api';

import styles from './styles';

function ChangeServant({ navigation }) {
    const [arrayServants, setArrayServants] = useState([]);

    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);
    const [textSearchServant, setTextSearchServant] = useState("");

    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [absences, setAbsences] = useState("");
    const [type, setType] = useState("");
    const [ministry, setMinistry] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    
    const borderBottomWidthName = useRef(new Animated.Value(1)).current;
    const borderBottomWidthAbsences = useRef(new Animated.Value(1)).current;

    const [colorTextName, setColorTextName] = useState('#000');
    const [colorTextAbsences, setColorTextAbsences] = useState('#000');

    function confirmName(name) {

        if(name === "") {
            Alert.alert(
                'Erro no nome',
                'Nome não pode ser vazio. Tente novamente'
            );
            return false;
        }

        return true;
    }

    function confirmAbsences(absences) {

        if(absences === "") {
            Alert.alert(
                'Erro nas faltas',
                'Falta não pode ser vazia. Tente novamente'
            );
            return false;
        }

        const numberAbsences = parseFloat(absences);

        if(numberAbsences < 0) {
            Alert.alert(
                'Erro nas faltas',
                'Falta não pode ser negativa. Tente novamente'
            );
            return false;
        }

        if(isNaN(numberAbsences)) {
            Alert.alert(
                'Erro nas faltas',
                'Falta não é um número. Tente novamente'
            );
            return false;
        }

        return true;
    }

    function resetForm() {
        setColorTextName('#000');
        setColorTextAbsences('#000');
    }

    async function getServants() {
        api.get("servants").then(response => {
            setArrayServants(
                response.data.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                })
            );
        });
    }

    async function getProfile() {
        await api.get(`profile/${user}`)
            .then(response => {
                setName(response.data.name);
                setType(response.data.type);
                setMinistry(response.data.ministry);
                setAbsences(response.data.absences);
            });
    }

    async function updateServant() {

        if(confirmName(name)) {
            if(confirmAbsences(absences)) {
                const data = {
                    name,
                    type,
                    ministry,
                    absences
                }

                await api.put(`servants/${user}`, data)
                    .then(response => {
                        Alert.alert('Dados do servo alterado com sucesso!');
                    })
                    .catch(err => {
                        Alert.alert("Erro no servidor", "Tente novamente mais tarde");
                    });

                getServants();
                resetForm();
                setOpacityBackground(1);
                setModalVisible(!modalVisible);
            }
            else {
                setColorTextName('#000');
                setColorTextAbsences('#FF0000');
            }
        }
        else {
            setColorTextName('#FF0000');
            setColorTextAbsences('#000');
        }

    }

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

    function animationAbsences(event) {

        if(event) {
            Animated.timing(borderBottomWidthAbsences, {
                toValue: 2,
                duration: 300,
            }).start(() => {
                borderBottomWidthAbsences.setValue(2);
            });
        }
        else {
            Animated.timing(borderBottomWidthAbsences, {
                toValue: 1,
                duration: 300,
            }).start(() => {
                borderBottomWidthAbsences.setValue(1);
            });
        }

    }

    function renderItem({ item }) {
        var colorAbsences;
        var absences = parseFloat(item.absences);

        if(absences < 1.5) {
            colorAbsences = "#70aa5e";
        }
        else if(absences < 3) {
            colorAbsences = "#f6e745";
        }
        else {
            colorAbsences = "#c10020";
        }
        
        return (
            <TouchableOpacity
                onPress={ async () => {
                    setUser(item.user);                    
                    setOpacityBackground(0.5);
                    setModalVisible(true);
                }}
                style={styles.containerItem}
            >
                <View style={styles.containerName}>
                    <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={[styles.containerAbsences, {backgroundColor: colorAbsences}]}>
                    <Text style={styles.textAbsences}>{item.absences}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function filterServants(searchText) {
        setTextSearchServant(searchText);

        let arrayFiltered  = arrayServants.filter(
            function (item) {
                return item.name.includes(searchText);
            }
        )

        setArrayServantsFiltered(arrayFiltered);
    }

    useEffect(() => {
        getServants();

        setArrayServantsFiltered([]);
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
                onShow={getProfile}
            >

                <View style={styles.containerModal}>
                    <Text style={styles.textModalHeader}>Alterar servo</Text>

                    <View style={styles.containerForm}>
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
                                defaultValue={name}
                                autoCapitalize="words"
                                autoCorrect={false}
                                value={name}
                                onChangeText={setName}
                                onFocus={() => animationName(1)}
                                onBlur={() => animationName(0)}
                            />
                        </Animated.View>

                        <Text style={[
                            styles.textPropTitle,
                            {
                                color: colorTextAbsences,
                            }
                        ]}>
                            Faltas
                        </Text>
                        <Animated.View style={{
                            borderBottomWidth: borderBottomWidthAbsences.interpolate({
                                inputRange: [1, 2],
                                outputRange: [1, 2],
                                extrapolate: 'clamp'
                            }),
                            borderBottomColor: colorTextAbsences
                        }}>
                            <TextInput
                                style={styles.textInputPropValue}
                                defaultValue={String(absences)}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType="numeric"
                                value={String(absences)}
                                onChangeText={setAbsences}
                                onFocus={() => animationAbsences(1)}
                                onBlur={() => animationAbsences(0)}
                            />
                        </Animated.View>

                        <View>
                            <Text style={styles.textPropTitle}>Ministério</Text>
                            <View style={styles.containerPickerType}>
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

                        <Text style={styles.textPropTitle}>Tipo do servo</Text>
                        <View style={styles.containerPickerType}>
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

                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.buttonsModal}
                            onPress={() => {
                                resetForm();
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textButtonsModal}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsModal}
                            onPress={updateServant}
                        >
                            <Text style={styles.textButtonsModal}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
            
            <View style={{ flex: 1, opacity: opacityBackground }}>

                <View style={styles.containerSearchServant}>
                    <TextInput
                        style={styles.searchServant}
                        placeholder="Pesquisar servo..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={textSearchServant}
                        onChangeText={filterServants}
                    />
                </View>

                <FlatList
                    contentContainerStyle={styles.list}
                    data={
                        arrayServantsFiltered && arrayServantsFiltered.length > 0 ? arrayServantsFiltered : arrayServants
                    }
                    keyExtractor={item => item.user}
                    renderItem={renderItem}
                />

            </View>
        </View>
    );
}

export default ChangeServant;