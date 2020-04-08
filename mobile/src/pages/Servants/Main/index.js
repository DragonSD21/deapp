import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

function Main({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [arrayServants, setArrayServants] = useState([]);
    const [typeServant, setTypeServant] = useState("Servo");
    
    const [textSearchServants, setTextSearchServants] = useState("");
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

    useEffect(() => {
        setArrayServants(
            varArrayServants.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServantsFiltered([]);
    }, []);

    function renderItem({ item }) {
        var colorAbsences;

        if(item.absences < 1.5) {
            colorAbsences = "#70aa5e";
        }
        else if(item.absences < 3) {
            colorAbsences = "#f6e745";
        }
        else {
            colorAbsences = "#c10020";
        }
        
        return (
            <View style={styles.containerItem}>
                <View style={styles.containerName}>
                    <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={[styles.containerAbsences, {backgroundColor: colorAbsences}]}>
                    <Text style={styles.textAbsences}>{item.absences}</Text>
                </View>
            </View>
        );
    }

    function filterServants(searchText) {
        setTextSearchServants(searchText);

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
                    <Text style={styles.textModalHeader}>Novo servo</Text>

                    <TextInput
                        style={styles.textInputNewServants}
                        placeholder="Digite o nome do novo servo"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />

                    <View style={styles.containerPickerTypeServants}>
                        <Picker
                            selectedValue={typeServant}
                            style={styles.pickerTypeServant}
                            onValueChange={(itemValue, itemIndex) => {
                                setTypeServants(itemValue);
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
                        style={styles.buttonsTop}
                    >
                        <MaterialIcons name="add-circle-outline" size={30} color="#FFF" />
                        <Text style={[styles.textButtonsTop, {marginLeft: 5}]}>Chamada</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CallHistory')
                        }}
                        style={styles.buttonsTop}
                    >
                        <Text style={styles.textButtonsTop}>Histórico</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSearchServants}>
                    <TextInput
                        style={styles.searchServants}
                        placeholder="Pesquisar servo..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={textSearchServants}
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

                <View style={styles.containerButtonsBottom}>
                    <TouchableOpacity
                        onPress={() => {
                            setOpacityBackground(0.5);
                            setModalVisible(true);
                        }}
                        style={[styles.buttonsBottom, {marginRight: 30}]}
                    >
                        <Text style={styles.textButtonsBottom}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('ProfileChange')
                        }}
                        style={[styles.buttonsBottom, {marginRight: 30}]}
                    >
                        <Text style={styles.textButtonsBottom}>Alterar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ProfileDelete')
                        }}
                        style={styles.buttonsBottom}
                    >
                        <Text style={styles.textButtonsBottom}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Main;