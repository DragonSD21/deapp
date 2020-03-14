import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'
import { MaterialIcons } from '@expo/vector-icons'

function ServosCallHistory({ navigation }) {
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
                        navigation.navigate('ServosCallHistoryDetail', { 
                            date: section.day,
                            schedule: section.schedule[0]
                        });
                    }}
                >
                    <Text style={styles.textContentAccordion}>{section.schedule[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ServosCallHistoryDetail', { 
                            date: section.day,
                            schedule: section.schedule[1]
                        });
                    }}
                >
                    <Text style={styles.textContentAccordion}>{section.schedule[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ServosCallHistoryDetail', { 
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
                        Deseja confirmar a exclusão do histórico de chamadas? ESSA AÇÃO NÃO PODERÁ SER DESFEITA
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
                </ScrollView>

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
            </View>    

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 200,
        marginVertical: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textModalHeader: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
    },
    containerButtonsDoneClear: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        width: 280,
    },
    buttonsDoneClear: {
        height: 50,
        width: 60,
        borderWidth: 2,
        borderColor: "#979191",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    //Pesquisar dia
    containerSearchDay: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: 10,
    },
    searchDay: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingHorizontal: 20,
    },

    //Lista dias
    scrollView: {
        // marginBottom: 10,
    },
    headerAccordion: {
        backgroundColor: '#141932',
        padding: 10,
        flexDirection: 'row',
    },
    textHeaderAccordion: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'left',
    },
    contentAccordion: {
        backgroundColor: '#141932',
        marginLeft: 30,
    },
    textContentAccordion: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'left',
    },

    //Parte inferior
    containerBottom: {
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonCallReset: {
        backgroundColor: "#3e56e8",
        width: 250,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonCallReset: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },

});

export default ServosCallHistory;