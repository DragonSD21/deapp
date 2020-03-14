import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function ServosDelete({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [arrayServos, setArrayServos] = useState([]);
    
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
    
    useEffect(() => {
        setArrayServos(
            varArrayServos.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServosFiltered([]);
    }, []);

    function deleteServo() {
        var indexServo = arrayServos.findIndex(obj => obj._id === idServo);
        arrayServos.splice(indexServo, 1);
        setArrayServos(arrayServos);
    }

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
                    <Text style={styles.textModalNameServo}>{nameServo}</Text>

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
                                deleteServo();
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 280,
        marginTop: 80,
        marginBottom: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textModalHeader: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
    },
    textModalNameServo: {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: 'center',
    },
    containerButtonsDoneClear: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        width: 280,
    },
    buttonsDoneClear: {
        height: 50,
        width: 60,
        borderWidth: 2,
        borderColor: "#979191",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    //Pesquisar servos
    containerSearchServo: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: 10,
    },
    searchServo: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingHorizontal: 20,
    },

    //Lista de servos
    list: {
        paddingHorizontal: 20,
    },
    containerItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerName: {
        flex: 1,
    },
    textName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: 'center',
    },
    containerFaltas: {
        height: 50,
        width: 80,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#cbcbcb",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    textFaltas: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ServosDelete;