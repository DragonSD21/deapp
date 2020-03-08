import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function ServosMain({ navigation }) {
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
                            <Picker.Item label="Servo responsável pela chamada" value="ResponsávelC" />
                            <Picker.Item label="Servo responsável geral" value="ResponsávelGeral" />
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
                            navigation.navigate('ServosCall')
                        }}
                        style={styles.buttonChamada}
                    >
                        <MaterialIcons name="add-circle-outline" size={30} color="#FFF" />
                        <Text style={[styles.textButtonsTop, {marginLeft: 10}]}>Chamada</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ServosCallHistory')
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
                            navigation.navigate('ServosChange')
                        }}
                        style={[styles.buttonBottom, {marginRight: 30}]}
                    >
                        <Text style={styles.textButtonsBottom}>Alterar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ServosDelete')
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 270,
        marginTop: 120,
        marginBottom: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textModalHeader: {
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 30,
    },
    textInputNewServo: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: 300,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 8,
    },
    containerPickerTypeServo: {
        backgroundColor: "#fff",
        marginTop: 10,
    },
    pickerTypeServo: {
        height: 50,
        width: 300,
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
    
    //Botões superiores
    containerButtonsTop: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonChamada: {
        backgroundColor: "#3e56e8",
        width: 150,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonHistorico: {
        backgroundColor: "#3e56e8",
        width: 150,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    textButtonsTop: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },

    //Pesquisar servos
    containerSearchServo: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: -5,
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

    //Botões inferiores
    containerButtonsBottom: {
        padding: 20,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonBottom: {
        backgroundColor: "#3e56e8",
        width: 80,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonsBottom: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default ServosMain;