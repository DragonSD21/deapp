import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Modal, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function ServosDelete({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [typeServo, setTypeServo] = useState("Servo");
    const [arrayServos, setArrayServos] = useState([]);

    const [textSearchServo, setTextSearchServo] = useState("");
    const [arrayServosFiltered, setArrayServosFiltered] = useState([]);
    
    var varArrayServos = [
        {
            _id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
        },
        {
            _id: "2",
            name: "João Carlos de Jesus Silva Dias",
            faltas: 3,
        },
        {
            _id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
        },
        {
            _id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            faltas: 1,
        },
        {
            _id: "5",
            name: "João Carlos de Jesus Silva Dias",
            faltas: 3,
        },
        {
            _id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            faltas: 2.5,
        },
    ];    
    useEffect(() => {
        setArrayServos(
            varArrayServos.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );
        setArrayServosFiltered([]);
    }, []);

    function renderItem({ item }) {
        var colorFaltas;

        if(item.faltas < 1.5) {
            colorFaltas = "#70aa5e";
        }
        else if(item.faltas < 3) {
            colorFaltas = "#f6e745";
        }
        else {
            colorFaltas = "#c10020";
        }
        
        return (
            <View style={styles.containerItem}>
                <View style={styles.containerName}>
                    <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={[styles.containerFaltas, {backgroundColor: colorFaltas}]}>
                    <Text style={styles.textFaltas}>{item.faltas}</Text>
                </View>
            </View>
        );
    }

    function filterServos(searchText) {
        setTextSearchServo(searchText);

        let arrayFiltered  = arrayServos.filter(
            function (item) {
                return item.name.includes(searchText);
            }
        )

        setArrayServosFiltered(arrayFiltered);
    }

    return (
        <View>

        </View>
    );
}

const styles = StyleSheet.create({

});

export default ServosDelete;