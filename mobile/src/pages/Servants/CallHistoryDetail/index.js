import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

import api from '../../../services/api';

import styles from './styles';

function CallHistoryDetail({ route, navigation }) {

    const { date } = route.params;
    const { time } = route.params;
    const dateTime = date + " - " + time;
    const [arrayServants, setArrayServants] = useState([]);

    const [textSearchServant, setTextSearchServant] = useState("");
    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);

    const [temp, setTemp] = useState(false);

    var varArrayServants = [
        {
            id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
        },
        {
            id: "2",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
        },
        {
            id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
        },
        {
            id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
        },
        {
            id: "5",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
        },
        {
            id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
        },
    ];

    async function getSpecificCall() {
        let timeAux = time.split(' : ');

        timeAux.forEach((element, index) => {
            if(element[0] === '0') {
                timeAux[index] = element[1];
            }
        });
        timeAux = timeAux.join(':');

        await api.get("specificcall", {
            params: { 
                day: date.split('/').reverse().join('-'),
                time: timeAux
             }
        }).then(response => {
            setArrayServants(
                response.data.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                })
            );
        }).catch(err => {
            Alert.alert("Erro no servidor", "Tente novamente mais tarde");
        })

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
            <View style={[
                styles.containerItem,
                { backgroundColor: item.present ? '#B2B6BD' : '#fff' }
            ]}>
                <View style={styles.containerHorizontal}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <View style={[styles.containerAbsences, {backgroundColor: colorAbsences}]}>
                        <Text style={styles.textAbsences}>{item.absences}</Text>
                    </View>
                </View>
                <Text style={styles.textJustification}>{item.justification}</Text>
            </View>
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
        getSpecificCall();
        setTemp(!temp);
        setArrayServantsFiltered([]);
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.textDate}>{dateTime}</Text>
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
                    textSearchServant !== "" ? arrayServantsFiltered : arrayServants
                }
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem(item)}
            />

        </View>
    );
}

export default CallHistoryDetail;