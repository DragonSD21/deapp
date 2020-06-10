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
    const [arrayServants, setArrayServants] = useState([]);
    const [oldJustification, setOldJustification] = useState(false);

    const [textSearchServant, setTextSearchServant] = useState("");
    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);

    const [temp, setTemp] = useState(true);

    const date = new Date();
    const formattedDate = format(date, 'dd/MM/yyyy');

    async function getLastCall() {

        await api.get("lastcall", {
            params: { day: formattedDate }
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
        var hour = (dateAtt.getHours() < 10 ? '0' : '') + dateAtt.getHours();
        var min = (dateAtt.getMinutes() < 10 ? '0' : '') + dateAtt.getMinutes();
        var sec = (dateAtt.getSeconds() < 10 ? '0' : '') + dateAtt.getSeconds();
        var time = hour + ':' + min + ':' + sec;

        await api.post("calls", {
            day: formattedDate,
            time: time,
            servants: arrayServants
        }).then(response => {
            Alert.alert('Chamada realizada com sucesso!');
            navigation.goBack();
        }).catch(err => {
            Alert.alert("Erro no servidor", "Tente novamente mais tarde");
        });

    }

    function setAbsences(index) {
        arrayServants[index].present = !arrayServants[index].present;
        // var aux = parseFloat(arrayServants[index].absences);
        var aux = arrayServants[index].absences;
        if(arrayServants[index].present) {
            if(arrayServants[index].justification === "") {
                aux--;
            }
            else {
                arrayServants[index].justification = "";
                aux -= 0.5;
            }
        } 
        else {
            if(arrayServants[index].justification === "") {
                aux++;
            }
            else {
                aux += 0.5;
            }
        }
        arrayServants[index].absences = aux;
        setArrayServants(arrayServants);
    }

    function controllJustification() {

    }
    
    function renderItem(item) {
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
                onPress={() => {
                    setAbsences(indexServant);
                    setTemp(!temp);
                }}
                style={[
                    styles.containerItem,
                    { backgroundColor: item.present ? '#B2B6BD' : '#fff' }
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
                    defaultValue={arrayServants[indexServant].justification}
                    value={arrayServants[indexServant].justification}
                    onChangeText={text => {
                        arrayServants[indexServant].justification = text;
                        setArrayServants(arrayServants);
                        setTemp(!temp);
                    }}
                    onFocus={() => {
                        if(!arrayServants[indexServant].present) {
                            if(arrayServants[indexServant].justification === "") {
                                // oldJustification = false;
                                setOldJustification(false);
                            }
                            else {
                                // oldJustification = true;
                                setOldJustification(true);
                            }
                        }
                    }}
                    onBlur={() => {
                        if(!arrayServants[indexServant].present) {
                            var aux = parseFloat(arrayServants[indexServant].absences);
                            if(!oldJustification) {
                                if(arrayServants[indexServant].justification !== "") {
                                    aux -= 0.5;
                                }
                            }
                            else {
                                if(arrayServants[indexServant].justification === "") {
                                    aux += 0.5;
                                }
                            }
                            arrayServants[indexServant].absences = aux;
                            setArrayServants(arrayServants);
                            setTemp(!temp);
                        }
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
        getLastCall();
        setArrayServantsFiltered([]);

        arrayServants.forEach(element => {
            element.absences = parseFloat(element.absences);
        });
        setArrayServants(arrayServants);

        setTemp(!temp);

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
                    renderItem={({ item }) => renderItem(item)}
                />
                
                <View style={styles.containerBottom}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.goBack();
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