import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

function Main({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [arrayServos, setArrayServos] = useState([]);
    const [typeServo, setTypeServo] = useState("Servo");
    
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

    useEffect(() => {
        setArrayServos(
            varArrayServos.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServosFiltered([]);
    }, []);

    function renderItem({ item }) {
        var colorFaltas;

        if(item.faltas < 1.5) {
            colorFaltas = "#70aa5e";
        }
        else if(item.faltas < 3) {
            colorFaltas = "#f6e745";
        }
        else {
            colorFaltas = "#c10020";
        }
        
        return (
            <View style={styles.containerItem}>
                <View style={styles.containerName}>
                    <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={[styles.containerFaltas, {backgroundColor: colorFaltas}]}>
                    <Text style={styles.textFaltas}>{item.faltas}</Text>
                </View>
            </View>
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
                    <Text style={styles.textModalHeader}>Novo servo</Text>

                    <TextInput
                        style={styles.textInputNewServo}
                        placeholder="Digite o nome do novo servo"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />

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

                <View style={styles.containerButtonsTop}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Call')
                        }}
                        style={styles.buttonChamada}
                    >
                        <MaterialIcons name="add-circle-outline" size={30} color="#FFF" />
                        <Text style={[styles.textButtonsTop, {marginLeft: 10}]}>Chamada</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CallHistory')
                    }} style={styles.buttonHistorico}>
                        <Text style={styles.textButtonsTop}>Histórico</Text>
                    </TouchableOpacity>
                </View>

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

                <View style={styles.containerButtonsBottom}>
                    <TouchableOpacity
                        onPress={() => {
                            setOpacityBackground(0.5);
                            setModalVisible(true);
                        }}
                        style={[styles.buttonBottom, {marginRight: 30}]}
                    >
                        <Text style={styles.textButtonsBottom}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('ProfileChange')
                        }}
                        style={[styles.buttonBottom, {marginRight: 30}]}
                    >
                        <Text style={styles.textButtonsBottom}>Alterar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ProfileDelete')
                        }}
                        style={styles.buttonBottom}
                    >
                        <Text style={styles.textButtonsBottom}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Main;