import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MaterialIcons } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import { YellowBox } from 'react-native';

import styles from './styles';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested'
]);

function Call({ navigation }) {
    const [selected, setSelected] = useState(new Map());
    const [arrayServants, setArrayServants] = useState([]);

    const [textSearchServant, setTextSearchServant] = useState("");
    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);

    var varArrayServants = [
        {
            id: "1",
            name: "ARafael Rosman Rodrigues Montrezol",
            absences: 1,
            justification: "",
        },
        {
            id: "2",
            name: "Nathalia Emily de Oliveira Pinto",
            absences: 3,
            justification: "",
        },
        {
            id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
            justification: "",
        },
        {
            id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
            justification: "",
        },
        {
            id: "5",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
            justification: "",
        },
        {
            id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
            justification: "",
        },
    ];

    useEffect(() => {
        setSelected(new Map());
        setArrayServants(
            varArrayServants.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServantsFiltered([]);
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
        var colorAbsences;
        var indexServant = arrayServants.indexOf(item);

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
                activeOpacity={0.2}
                onPress={() => onSelect(item.id, 1)}
                style={[
                    styles.containerItem,
                    { backgroundColor: selected.get(item.id) ? '#B2B6BD' : '#fff' }
                ]}
            >
                <View style={styles.containerHorizontal}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <View style={[styles.containerAbsences, {backgroundColor: colorAbsences}]}>
                        <Text style={styles.textAbsences}>{item.absences}</Text>
                    </View>
                </View>
                <TextInput 
                    style={styles.textJustification}
                    placeholder="Justificativa..."
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={true}
                    defaultValue={""}
                    value={arrayServants[indexServant].justification}
                    onChangeText={text => {
                        let aux = arrayServants;
                        aux[indexServant].justification = text;
                        // alert([indexServant, aux[indexServant].justification]);
                        setArrayServants(aux);
                        onSelect(item.id, 0); //<<<<<<<<<<<<<<< ARRUMAR ISSO AQUI
                        // alert([arrayServants[indexServant].justification]);
                    }}
                />
            </TouchableOpacity>

        );
    }

    const date = new Date();
    const formattedDate = format(date, 'dd/MM/yyyy');

    function filterServants(searchText) {
        setTextSearchServant(searchText);

        let arrayFiltered  = arrayServants.filter(
            function (item) {
                return item.name.includes(searchText);
            }
        )

        setArrayServantsFiltered(arrayFiltered);
    }

    function confirmCall() {
        // for(var servant in arrayServants) {
        //     if(selected.get(servant.id)) {
        //         if(servant.justification == "") servant.absences++;
        //         else servant.absences++;
        //     }
        // }
        // for(var servant in arrayServants) {
        //     alert(servant.absences);
        // }
    }

    return (
        <View style={styles.container}>

            <KeyboardAwareScrollView>
            
                <View style={styles.containerTop}>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>

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
                            // navigation.navigate('ServantsMain');
                        }}
                        style={styles.buttonBottom}
                    >
                        <Text style={styles.textButtonsBottom}>Confirmar</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
            
        </View>
    );
}

export default Call;