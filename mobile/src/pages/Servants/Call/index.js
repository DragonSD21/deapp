import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MaterialIcons } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import { YellowBox } from 'react-native';

import api from '../../../services/api';

import styles from './styles';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested'
]);

function Call({ navigation }) {
    const [selected, setSelected] = useState(new Map());
    const [arrayServants, setArrayServants] = useState([]);

    const [textSearchServant, setTextSearchServant] = useState("");
    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);

    const [temp, setTemp] = useState(true);

    const date = new Date();
    const formattedDate = format(date, 'dd/MM/yyyy');
    const formattedDateBD = format(date, 'yyyy-MM-dd');

    async function getLastCall() {

        await api.get("lastcall", {
            params: { day: formattedDateBD }
        }).then(response => {
            setArrayServants(
                response.data.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                })
            );
        });

    }

    async function confirmCall() {
        const dateAtt = new Date();
        var hour = dateAtt.getHours();
        var min = dateAtt.getMinutes();
        var time = hour + ':' + min;

        // await api.post("calls", {
        //     day: formattedDateBD,
        //     time: time,
        //     servants: arrayServants
        // }).then(response => {
        //     Alert.alert('Chamada realizada com sucesso!');
        //     navigation.pop();
        // }).catch(err => {
        //     Alert.alert("Erro no servidor", "Tente novamente mais tarde");
        // });

    }

    function setAbsences(user, index) {
        if(!selected.get(user)) {
            if(arrayServants[index].justification === "") {
                arrayServants[index].absences -= 1;
            }
            else {
                arrayServants[index].justification = "";
                arrayServants[index].absences -= 0.5;
            }
        } 
        else {
            if(arrayServants[index].justification === "") {
                arrayServants[index].absences += 1;
            }
            else {
                arrayServants[index].absences += 0.5;
            }
        }
        setArrayServants(arrayServants);
    }

    const onSelect = useCallback((user) => {
        const newSelected = new Map(selected);
        newSelected.set(user, !selected.get(user));
        setSelected(newSelected);
    }, [selected]);
    
    function renderItem(item, selected) {
        var colorAbsences;
        var indexServant = arrayServants.indexOf(item);
        var oldJustification = false;

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
                onPress={() => {
                    onSelect(item.user);
                    setAbsences(item.user, indexServant);
                }}
                style={[
                    styles.containerItem,
                    { backgroundColor: selected.get(item.user) ? '#B2B6BD' : '#fff' }
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
                        arrayServants[indexServant].justification = text;
                        setArrayServants(arrayServants);
                        setTemp(!temp);
                    }}
                    onFocus={() => {
                        if(arrayServants[indexServant].justification === "") {
                            oldJustification = false;
                        }
                        else {
                            oldJustification = true;
                        }
                    }}
                    onBlur={() => {
                        if(!selected.get(item.user)) {
                            if(!oldJustification) {
                                if(arrayServants[indexServant].justification !== "") {
                                    arrayServants[indexServant].absences -= 0.5;
                                }
                            }
                            else {
                                if(arrayServants[indexServant].justification === "") {
                                    arrayServants[indexServant].absences += 0.5;
                                }
                            }
                        }
                        setArrayServants(arrayServants);
                        setTemp(!temp);
                    }}
                />
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

    useEffect(() => {
        setSelected(new Map());
        getLastCall();
        setArrayServantsFiltered([]);

        arrayServants.forEach(element => {
            element.absences = parseFloat(element.absences);
        });

        setArrayServants(arrayServants);

    }, []);


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
                    keyExtractor={item => item.user}
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
                        onPress={confirmCall}
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