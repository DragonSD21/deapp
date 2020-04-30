import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles';

function ChangeServant({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    
    const [idServant, setIdServant] = useState("");
    const [nameServant, setNameServant] = useState("");
    const [absencesServant, setAbsencesServant] = useState("");
    const [typeServant, setTypeServant] = useState("");

    const [textSearchServant, setTextSearchServant] = useState("");
    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);
    
    var varArrayServants = [
        {
            _id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
        },
        {
            _id: "2",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
        },
        {
            _id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
        },
        {
            _id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
        },
        {
            _id: "5",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
        },
        {
            _id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
        },
    ];
    const [arrayServants, setArrayServants] = useState([]);
    useEffect(() => {
        setArrayServants(
            varArrayServants.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServantsFiltered([]);
    }, []);

    function updateServant() {indIndex(obj => obj._id === idServant);
        arrayServants[indexServant].name = nameServant;
        if(absencesServant == "") arrayServants[indexServant].absences = "0";
        else arrayServants[indexServant].absences = absencesServant;
        arrayServants[indexServant].type = typeServant;

        setArrayServants(arrayServants);
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
                onPress={() => {
                    setNameServant(item.name);
                    setAbsencesServant(item.absences);
                    setIdServant(item._id);
                    setTypeServant(item.type);
                    
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
                    <Text style={styles.textModalHeader}>Alterar servo</Text>

                    <View style={styles.containerForm}>
                        <Text style={styles.textPropTitle}>Nome</Text>
                        <TextInput
                            style={styles.textInputPropValue}
                            defaultValue={nameServant}
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={nameServant}
                            onChangeText={setNameServant}
                        />

                        <Text style={styles.textPropTitle}>Faltas</Text>
                        <TextInput
                            style={styles.textInputPropValue}
                            defaultValue={String(absencesServant)}
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="numeric"
                            value={String(absencesServant)}
                            onChangeText={setAbsencesServant}
                        />

                        <Text style={styles.textPropTitle}>Tipo do servo</Text>
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
                            onPress={() => {
                                updateServant();
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible)
                            }}
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
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                />

            </View>
        </View>
    );
}

export default ChangeServant;