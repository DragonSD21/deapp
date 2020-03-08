import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';

function ServosCallHistoryDetail({ navigation }) {

    const date = navigation.getParam('date');
    const schedule = navigation.getParam('schedule');
    const dateSchedule = date + " - " + schedule.substring(0, 5) + " " + schedule.substring(22);
    const [arrayServos, setArrayServos] = useState([]);

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

    function renderItem(item) {
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.containerNameJustificativa}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <View style={styles.containerJustificativa}>
                            <Text
                                style={styles.textJustificativa}
                            >
                                Justificativa...
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.containerFaltas, {backgroundColor: colorFaltas}]}>
                        <Text style={styles.textFaltas}>{item.faltas}</Text>
                    </View>
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
            <View style={styles.containerTop}>
                <Text style={styles.textDate}>{dateSchedule}</Text>
            </View>

            <View style={styles.containerSearchServo}>
                <View style={styles.container2SearchServo}>
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
            </View>

            <FlatList
                contentContainerStyle={styles.list}
                data={
                    arrayServosFiltered && arrayServosFiltered.length > 0 ? arrayServosFiltered : arrayServos
                }
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem(item)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    containerTop: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDate: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center',
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
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerNameJustificativa: {
        height: 100,
        width: 200,
        marginRight: 10,
    },
    textName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: 'center',
    },
    containerFaltas: {
        height: 80,
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
    containerJustificativa: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#cbcbcb",
        justifyContent: 'center',
        marginTop: 5,
    },
    textJustificativa: {
        fontSize: 16,
    },

});

export default ServosCallHistoryDetail;