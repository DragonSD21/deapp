import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { parseISO, format } from 'date-fns'

function ServosCall() {
    const [selected, setSelected] = useState(new Map());

    useEffect(() => {
        setSelected(new Map());
    }, []);

    const onSelect = useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );
    
    var arrayServos = [
        {
            id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
        },
        {
            id: "2",
            name: "Nathalia Emily de Oliveira Pinto",
            faltas: 3,
        },
        {
            id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
        },
        {
            id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
        },
        {
            id: "5",
            name: "João Carlos de Jesus Silva Dias",
            faltas: 3,
        },
        {
            id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
        },
    ];

    function renderItem(item, selected) {
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
                activeOpacity={0.2}
                onPress={() => onSelect(item.id)}
                style={[
                    styles.containerItem,
                    { backgroundColor: selected.get(item.id) ? '#B2B6BD' : '#fff' }
                ]}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.containerNameJustificativa}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <View style={styles.containerJustificativa}>
                            <TextInput 
                                style={styles.textJustificativa}
                                placeholder="Justificativa..."
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                autoCorrect={true}
                            />
                        </View>
                    </View>
                    <View style={[styles.containerFaltas, {backgroundColor: colorFaltas}]}>
                        <Text style={styles.textFaltas}>{item.faltas}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const date = new Date();
    const formattedDate = format(date, 'dd/MM/yyyy');

    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.date}>{formattedDate}</Text>
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
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem(item, selected)}
                extraData={onSelect}
            />

            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.buttonBottom}>
                    <Text style={styles.textButtonsBottom}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom}>
                    <Text style={styles.textButtonsBottom}>Confirmar</Text>
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

    //Parte superior
    containerTop: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        fontSize: 32,
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

    //Parte inferior
    containerBottom: {
        padding: 20,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonBottom: {
        backgroundColor: "#3e56e8",
        width: 100,
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonsBottom: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default ServosCall;