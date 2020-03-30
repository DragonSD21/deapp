import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles';

function ServosChange({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    
    const [idServo, setIdServo] = useState("");
    const [nameServo, setNameServo] = useState("");
    const [faltasServo, setFaltasServo] = useState("");
    const [typeServo, setTypeServo] = useState("");

    const [textSearchServo, setTextSearchServo] = useState("");
    const [arrayServosFiltered, setArrayServosFiltered] = useState([]);
    
    var varArrayServos = [
        {
            _id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
        },
        {
            _id: "2",
            name: "João Carlos de Jesus Silva Dias",
            faltas: 3,
        },
        {
            _id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
        },
        {
            _id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
        },
        {
            _id: "5",
            name: "João Carlos de Jesus Silva Dias",
            faltas: 3,
        },
        {
            _id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
        },
    ];
    const [arrayServos, setArrayServos] = useState([]);
    useEffect(() => {
        setArrayServos(
            varArrayServos.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServosFiltered([]);
    }, []);

    function updateServo() {
        var indexServo = arrayServos.findIndex(obj => obj._id === idServo);
        arrayServos[indexServo].name = nameServo;
        if(faltasServo == "") arrayServos[indexServo].faltas = "0";
        else arrayServos[indexServo].faltas = faltasServo;
        arrayServos[indexServo].type = typeServo;

        setArrayServos(arrayServos);
    }

    function renderItem({ item }) {
        var colorFaltas;
        var faltas = parseFloat(item.faltas);

        if(faltas < 1.5) {
            colorFaltas = "#70aa5e";
        }
        else if(faltas < 3) {
            colorFaltas = "#f6e745";
        }
        else {
            colorFaltas = "#c10020";
        }
        
        return (
            <TouchableOpacity
                onPress={() => {
                    setNameServo(item.name);
                    setFaltasServo(item.faltas);
                    setIdServo(item._id);
                    setTypeServo(item.type);
                    
                    setOpacityBackground(0.5);
                    setModalVisible(true);
                }}
                style={styles.containerItem}
            >
                <View style={styles.containerName}>
                    <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={[styles.containerFaltas, {backgroundColor: colorFaltas}]}>
                    <Text style={styles.textFaltas}>{item.faltas}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function filterServos(searchText) {
        setTextSearchServo(searchText);

        let arrayFiltered  = arrayServos.filter(
            function (item) {
                return item.name.includes(searchText);
            }
        )

        setArrayServosFiltered(arrayFiltered);
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

                    <TextInput
                        style={styles.textInputNameServo}
                        defaultValue={nameServo}
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={nameServo}
                        onChangeText={setNameServo}
                    />

                    <View style={styles.containerTextInputFaltasServo}>
                        <Text style={{ fontSize: 16 }}>Faltas: </Text>
                        <TextInput
                            style={styles.textInputFaltasServo}
                            defaultValue={String(faltasServo)}
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="numeric"
                            value={String(faltasServo)}
                            onChangeText={setFaltasServo}
                        />
                    </View>

                    <View style={styles.containerPickerTypeServo}>
                        <Picker
                            selectedValue={typeServo}
                            style={styles.pickerTypeServo}
                            onValueChange={(itemValue, itemIndex) => {
                                setTypeServo(itemValue);
                            }}
                        >
                            <Picker.Item label="Servo" value="Servo" />
                            <Picker.Item label="Servo responsável pela chamada" value="Servo responsável pela chamada" />
                            <Picker.Item label="Servo responsável geral" value="Servo responsável geral" />
                        </Picker>
                    </View>

                    <View style={styles.containerButtonsDoneClear}>
                        <TouchableOpacity
                            style={styles.buttonsDoneClear}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible) 
                            }}
                        >
                            <MaterialIcons name="clear" size={50} color="#FF0000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsDoneClear}
                            onPress={() => {
                                updateServo();
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <MaterialIcons name="done" size={50} color="#247E16" />
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
            
            <View style={{ flex: 1, opacity: opacityBackground }}>

                <View style={styles.containerSearchServo}>
                    <TextInput
                        style={styles.searchServo}
                        placeholder="Pesquisar servo..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={textSearchServo}
                        onChangeText={filterServos}
                    />
                </View>

                <FlatList
                    contentContainerStyle={styles.list}
                    data={
                        arrayServosFiltered && arrayServosFiltered.length > 0 ? arrayServosFiltered : arrayServos
                    }
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                />

            </View>
        </View>
    );
}

export default ServosChange;