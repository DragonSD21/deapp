import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function ServosChange({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    
    const [idServo, setIdServo] = useState("");
    const [nameServo, setNameServo] = useState("");
    const [faltasServo, setFaltasServo] = useState("");
    const [typeServo, setTypeServo] = useState("");
    
    var varArrayServos = [
        {
            _id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: "1",
            type: "Servo responsável geral",
        },
        {
            _id: "2",
            name: "João Carlos de Jesus Silva Dias",
            faltas: "3",
            type: "Servo responsável pela chamada",
        },
        {
            _id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: "2.5",
            type: "Servo",
        },
        {
            _id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: "1",
            type: "Servo",
        },
        {
            _id: "5",
            name: "João Carlos de Jesus Silva Dias",
            faltas: "3",
            type: "Servo",
        },
        {
            _id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: "2.5",
            type: "Servo",
        },
    ];
    const [arrayServos, setArrayServos] = useState(varArrayServos);

    function updateServo() {
        var indexServo = arrayServos.findIndex(obj => obj._id === idServo);
        varArrayServos[indexServo].name = nameServo;
        if(faltasServo == "") varArrayServos[indexServo].faltas = "0";
        else varArrayServos[indexServo].faltas = faltasServo;
        varArrayServos[indexServo].type = typeServo;

        setArrayServos(varArrayServos);
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
                            defaultValue={faltasServo}
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="numeric"
                            value={faltasServo}
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
                    />
                </View>

                <FlatList
                    contentContainerStyle={styles.list}
                    data={arrayServos}
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
        height: 320,
        marginTop: 80,
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
    textInputNameServo: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: 300,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 8,
    },
    containerTextInputFaltasServo: {
        backgroundColor: "#fff",
        flexDirection: "row",
        marginTop: 10,
        width: 300,
        height: 40,
        paddingHorizontal: 8,
        alignItems: "center",
    },
    textInputFaltasServo: {
        backgroundColor: "#fff",
        width: 200,
        fontSize: 16,
        marginTop: 3,
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

export default ServosChange;