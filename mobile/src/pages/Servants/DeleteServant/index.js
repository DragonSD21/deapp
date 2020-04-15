import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

function DeleteServant({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [arrayServants, setArrayServants] = useState([]);
    
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
    
    useEffect(() => {
        setArrayServants(
            varArrayServants.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServantsFiltered([]);
    }, []);

    function deleteServant() {
        var indexServant = arrayServants.findIndex(obj => obj._id === idServant);
        arrayServants.splice(indexServant, 1);
        setArrayServants(arrayServants);
    }

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
        <View style={styles.container} >

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
                    <Text style={styles.textModalHeader}>
                        Deseja confirmar a exclusão do(a) servo(a) abaixo? ESSA AÇÃO NÃO PODERÁ SER DESFEITA
                    </Text>
                    <Text style={styles.textModalNameServant}>{nameServant}</Text>

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
                                deleteServant();
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

export default DeleteServant;