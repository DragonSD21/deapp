import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MaterialIcons } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import { YellowBox } from 'react-native';

import styles from './styles';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested'
]);

function Call({ navigation }) {
    const [selected, setSelected] = useState(new Map());
    const [arrayServos, setArrayServos] = useState([]);

    const [textSearchServo, setTextSearchServo] = useState("");
    const [arrayServosFiltered, setArrayServosFiltered] = useState([]);

    var varArrayServos = [
        {
            id: "1",
            name: "ARafael Rosman Rodrigues Montrezol",
            faltas: 1,
            justificativa: "",
        },
        {
            id: "2",
            name: "Nathalia Emily de Oliveira Pinto",
            faltas: 3,
            justificativa: "",
        },
        {
            id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
            justificativa: "",
        },
        {
            id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
            justificativa: "",
        },
        {
            id: "5",
            name: "João Carlos de Jesus Silva Dias",
            faltas: 3,
            justificativa: "",
        },
        {
            id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
            justificativa: "",
        },
    ];

    useEffect(() => {
        setSelected(new Map());
        setArrayServos(
            varArrayServos.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServosFiltered([]);
    }, []);

    const onSelect = useCallback(
        (id, confirm) => {
                const newSelected = new Map(selected);
                if(confirm) newSelected.set(id, !selected.get(id));
                setSelected(newSelected);
        },
        [selected],
    );
    
    function renderItem(item, selected) {
        var colorFaltas;
        var indexServo = arrayServos.indexOf(item);

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
                onPress={() => onSelect(item.id, 1)}
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
                                defaultValue={""}
                                value={arrayServos[indexServo].justificativa}
                                onChangeText={text => {
                                    let aux = arrayServos;
                                    aux[indexServo].justificativa = text;
                                    // alert([indexServo, aux[indexServo].justificativa]);
                                    setArrayServos(aux);
                                    onSelect(item.id, 0); //<<<<<<<<<<<<<<< ARRUMAR ISSO AQUI
                                    // alert([arrayServos[indexServo].justificativa]);
                                }}
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

    function filterServos(searchText) {
        setTextSearchServo(searchText);

        let arrayFiltered  = arrayServos.filter(
            function (item) {
                return item.name.includes(searchText);
            }
        )

        setArrayServosFiltered(arrayFiltered);
    }

    function confirmCall() {
        // for(var servo in arrayServos) {
        //     if(selected.get(servo.id)) {
        //         if(servo.justificativa == "") servo.faltas++;
        //         else servo.faltas++;
        //     }
        // }
        // for(var servo in arrayServos) {
        //     alert(servo.faltas);
        // }
    }

    return (
        <View style={styles.container}>

            <KeyboardAwareScrollView>
            
                <View style={styles.containerTop}>
                    <Text style={styles.date}>{formattedDate}</Text>
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
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderItem(item, selected)}
                    extraData={onSelect}
                />
                
                <View style={styles.containerBottom}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Main');
                        }}
                        style={styles.buttonBottom}
                    >
                        <Text style={styles.textButtonsBottom}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            confirmCall();
                            // navigation.navigate('ServosMain');
                        }}
                        style={styles.buttonBottom}
                    >
                        <Text style={styles.textButtonsBottom}>Confirmar</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
            
            <KeyboardSpacer/>
            
        </View>
    );
}

export default Call;