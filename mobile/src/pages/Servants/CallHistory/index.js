import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
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
            setArrayDays(response.data);
        });
    }

    async function resetCall() {
        await api.delete("calls").then(response => {
            Alert.alert("Chamadas excluídas!", "Todas as faltas foram zeradas!!");
        }).catch(err => {
            Alert.alert("Erro no servidor", "Tente novamente mais tarde");
        });
    }

    function renderHeader(section, index, isActive) {
        return (
            <View style={styles.headerAccordion}>
                <MaterialIcons
                    name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={45}
                    color="#fff"
                />
                <Text style={styles.textHeaderAccordion}>{section.day}</Text>
            </View>
        );
    }

    function renderContent(section) {

        return (
            <View style={styles.contentAccordion}>
                {
                    section.time.map(element => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('CallHistoryDetail', { 
                                    date: section.day,
                                    time: element
                                });
                            }}
                        >
                            <Text style={styles.textContentAccordion}>
                                {
                                    section.time.indexOf(element) === section.time.length-1 ?
                                        section.time[section.time.indexOf(element)].concat(" (chamada final)") :
                                        section.time[section.time.indexOf(element)]
                                }
                                </Text>
                        </TouchableOpacity>
                    ))
                }
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CallHistoryDetail', { 
                            date: section.day,
                            time: section.time[0]
                        });
                    }}
                >
                    <Text style={styles.textContentAccordion}>{section.time[0]}</Text>
                </TouchableOpacity> */}
            </View>
        );
    }

    function updateSections(sections) {
        setActiveSections(sections.includes(undefined) ? [] : sections);
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

                <ScrollView style={styles.scrollView}>
                    <Accordion
                        sections={
                            arrayDaysFiltered.length > 0 ? arrayDaysFiltered : arrayDays
                        }
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={updateSections}
                        expandMultiple={true}
                        touchableComponent={TouchableOpacity}
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
                    {/* <View style={styles.containerBottom}>
                        <TouchableOpacity
                            onPress={() => {
                                setOpacityBackground(0.5);
                                setModalVisible(true);
                            }}
                            style={styles.buttonCallReset}
                        >
                            <Text style={styles.textButtonCallReset}>Resetar Chamadas</Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>

            </View>    

        </View>
    );
}

export default CallHistory;