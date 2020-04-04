import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

function CallHistory({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [activeSections, setActiveSections] = useState([]);
    const [arrayDays, setArrayDays] = useState([]);

    const [textSearchDay, setTextSearchDay] = useState("");
    const [arrayDaysFiltered, setArrayDaysFiltered] = useState([]);

    var varArrayDays = [
        {
            day: "04/02/2020",
            schedule: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "06/02/2020",
            schedule: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "11/02/2020",
            schedule: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "13/02/2020",
            schedule: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
        {
            day: "19/02/2020",
            schedule: [
                "07:00 - Ver marcações",
                "07:06 - Ver marcações",
                "09:02 - Ver marcações (total)",
            ],
        },
    ];

    useEffect(() => {
        setArrayDays(varArrayDays);
        setArrayDaysFiltered([]);
    }, []);

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
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CallHistoryDetail', { 
                            date: section.day,
                            schedule: section.schedule[0]
                        });
                    }}
                >
                    <Text style={styles.textContentAccordion}>{section.schedule[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CallHistoryDetail', { 
                            date: section.day,
                            schedule: section.schedule[1]
                        });
                    }}
                >
                    <Text style={styles.textContentAccordion}>{section.schedule[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CallHistoryDetail', { 
                            date: section.day,
                            schedule: section.schedule[2]
                        });
                    }}
                >
                    <Text style={styles.textContentAccordion}>{section.schedule[2]}</Text>
                </TouchableOpacity>
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

                    <View style={styles.containerButtonsDoneClear}>
                        <TouchableOpacity
                            style={styles.buttonsDoneClear}
                            onPress={() => { 
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible) 
                            }}
                        >
                            <MaterialIcons name="clear" size={50} color="#FF0000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonsDoneClear}
                            onPress={() => {
                                resetCall();
                                setOpacityBackground(1);
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <MaterialIcons name="done" size={50} color="#247E16" />
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
                            arrayDaysFiltered && arrayDaysFiltered.length > 0 ? arrayDaysFiltered : arrayDays
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