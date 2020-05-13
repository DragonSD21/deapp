import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../../services/api';

import styles from './styles';

function CallHistory({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [activeSections, setActiveSections] = useState([]);
    const [arrayDays, setArrayDays] = useState([]);

    const [textSearchDay, setTextSearchDay] = useState("");
    const [arrayDaysFiltered, setArrayDaysFiltered] = useState([]);

    const [temp, setTemp] = useState(true);

    var varArrayDays = [
        {
            day: "04/02/2020",
            time: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "06/02/2020",
            time: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "11/02/2020",
            time: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "13/02/2020",
            time: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "19/02/2020",
            time: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
    ];

    async function getDays() {
        await api.get("calls").then(response => {
            setArrayDays(response.data);
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
        var timeList = section.time;

        var i;
        for(i=0; i<timeList.length; i++) {
            var split = timeList[i].split(':');
            if(split[0].length < 2) split[0] = '0' + split[0];
            if(split[1].length < 2) split[1] = '0' + split[1];
            if(split[2].length < 2) split[2] = '0' + split[2];
            timeList[i] = split.join(' : ');
        }
        // timeList[i-1] = timeList[i-1].concat(" (chamada final)");

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
                                    section.time.indexOf(element) === i-1 ?
                                        timeList[section.time.indexOf(element)].concat(" (chamada final)") :
                                        timeList[section.time.indexOf(element)]
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

    function resetCall() {
        setArrayDays([]);
    }

    useEffect(() => {
        getDays();
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
                                setModalVisible(!modalVisible)
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
                </ScrollView>

            </View>    

        </View>
    );
}

export default CallHistory;