import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'
import { MaterialIcons } from '@expo/vector-icons'

function ServosCallHistory() {
    const [activeSections, setActiveSections] = useState([]);

    var arrayDays = [
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
                <Text style={styles.textContentAccordion}>{section.schedule[0]}</Text>
                <Text style={styles.textContentAccordion}>{section.schedule[1]}</Text>
                <Text style={styles.textContentAccordion}>{section.schedule[2]}</Text>
            </View>
        );
    }

    function updateSections(sections) {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerSearchDay}>
                <View style={styles.container2SearchDay}>
                <TextInput
                    style={styles.searchDay}
                    placeholder="Pesquisar dia..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                </View>
            </View>

            <Accordion
                sections={arrayDays}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                expandMultiple={true}
                touchableComponent={TouchableOpacity}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    //Pesquisar dia
    containerSearchDay: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    container2SearchDay: {
        backgroundColor: "#fff",
        borderRadius: 25,
    },
    searchDay: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        marginLeft: 20,
    },

    //Lista dias
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


});

export default ServosCallHistory;