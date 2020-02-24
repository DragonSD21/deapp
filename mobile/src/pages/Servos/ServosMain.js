import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function ServosMain({ navigation }) {
    
    var arrayServos = [
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

    return (
        <View style={styles.container}>
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
                <View style={styles.container2SearchServo}>
                <TextInput
                    style={styles.searchServo}
                    placeholder="Pesquisar servo..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                </View>
            </View>

            <FlatList
                contentContainerStyle={styles.list}
                data={arrayServos}
                keyExtractor={item => item._id}
                renderItem={renderItem}
            />

            <View style={styles.containerButtonsBottom}>
                <TouchableOpacity onPress={() => {}} style={[styles.buttonBottom, {marginRight: 30}]}>
                    <Text style={styles.textButtonsBottom}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} style={[styles.buttonBottom, {marginRight: 30}]}>
                    <Text style={styles.textButtonsBottom}>Alterar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} style={styles.buttonBottom}>
                    <Text style={styles.textButtonsBottom}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
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
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    container2SearchServo: {
        backgroundColor: "#fff",
        borderRadius: 25,
    },
    searchServo: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        marginLeft: 20,
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
        borderRadius: 20,
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