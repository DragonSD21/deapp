import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, Modal, Alert, FlatList } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../../services/api';

import styles from './styles';

function CallHistory({ route, navigation }) {

    const { type } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [activeSections, setActiveSections] = useState([]);
    const [arrayDays, setArrayDays] = useState([]);

    const [textSearchDay, setTextSearchDay] = useState("");
    const [arrayDaysFiltered, setArrayDaysFiltered] = useState([]);

    async function getDays() {
        await api.get("calls").then(response => {
            let aux = response.data
            aux.sort(function(a,b) {
                return a.day < b.day ? -1 : a.day > b.day ? 1 : 0;
            });
            setArrayDays(aux);
        });
    }

    async function resetCall() {
        await api.delete("calls").then(response => {
            Alert.alert("Chamadas excluídas!", "Todas as faltas foram zeradas!!");
        }).catch(err => {
            Alert.alert("Erro no servidor", "Tente novamente mais tarde");
        });
    }

    function renderItem(item) {
        return (
            <TouchableOpacity style={styles.buttonDay} onPress={() => {
                navigation.navigate('CallHistoryDetail', { 
                    date: item.day,
                    time: item.time
                });
            }}>
                <Text style={styles.textButtonDay}>{item.day}</Text>
            </TouchableOpacity>
        )
    }

    function filterDays(searchText) {
        setTextSearchDay(searchText);

        let arrayFiltered  = arrayDays.filter(
            function (item) {
                return item.day.includes(searchText);
            }
        )

        setArrayDaysFiltered(arrayFiltered);
    }

    useEffect(() => {
        getDays();

        setArrayDays(arrayDays);

        setArrayDaysFiltered([]);
    }, []);

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
                    <Text style={styles.textModalHeader}>
                        Deseja confirmar a exclusão do histórico de chamadas? ESSA AÇÃO NÃO PODERÁ SER DESFEITA!
                    </Text>

                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.buttonsModal}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible) 
                            }}
                        >
                            <Text style={styles.textButtonsModal}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsModal}
                            onPress={() => {
                                resetCall();
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textButtonsModal}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>

            <View style={{ flex: 1, opacity: opacityBackground }}>

                <View style={styles.containerSearchDay}>
                    <TextInput
                        style={styles.searchDay}
                        placeholder="Pesquisar dia..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={textSearchDay}
                        onChangeText={filterDays}
                    />
                </View>

                <FlatList
                    contentContainerStyle={styles.list}
                    data={
                        arrayDaysFiltered.length > 0 ? arrayDaysFiltered : arrayDays
                    }
                    keyExtractor={item => item.day}
                    renderItem={({ item }) => renderItem(item)}
                />

                {
                    type !== "Servo" ? 
                        <View style={styles.containerBottom}>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpacityBackground(0.5);
                                    setModalVisible(true);
                                }}
                                style={styles.buttonCallReset}
                            >
                                <Text style={styles.textButtonCallReset}>Resetar Chamadas</Text>
                            </TouchableOpacity>
                        </View>
                    : <View></View>
                }

            </View>    

        </View>
    );
}

export default CallHistory;