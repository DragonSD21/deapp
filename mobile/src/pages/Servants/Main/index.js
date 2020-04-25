import React, { useState, useEffect, useRef } from 'react';
import { 
    View, 
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    Picker,
    Animated,
    TouchableWithoutFeedback, 
    Dimensions
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { MaterialIcons, Feather } from '@expo/vector-icons';

import styles from './styles';

function Main({ navigation }) {

    const [arrayServants, setArrayServants] = useState([]);

    const [textSearchServants, setTextSearchServants] = useState("");
    const [arrayServantsFiltered, setArrayServantsFiltered] = useState([]);
    
    const [nameNewServant, setNameNewServant] = useState("");
    const [loginNewServant, setLoginNewServant] = useState("");
    const [passwordNewServant, setPasswordNewServant] = useState("12345");
    const [typeServant, setTypeServant] = useState("Servo");

    const inputSearchServantRef = useRef(null);

    const translateX = useRef(new Animated.Value(0)).current;
    const widthScreen = Dimensions.get('window').width*0.7;
    let offset = widthScreen;
    let opened = false;
    
    var varArrayServants = [
        {
            _id: "1",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
        },
        {
            _id: "2",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
        },
        {
            _id: "3",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
        },
        {
            _id: "4",
            name: "Rafael Rosman Rodrigues Montrezol",
            absences: 1,
        },
        {
            _id: "5",
            name: "João Carlos de Jesus Silva Dias",
            absences: 3,
        },
        {
            _id: "6",
            name: "Maria Joana da Silva Rodrigues Colarinho",
            absences: 2.5,
        },
    ];

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
                style={styles.containerIconMenu}
                onPress={() => {
                    opened = !opened;
                    inputSearchServantRef.current.blur();
                    menuAnimated();
                }}
            >
                <Feather name="menu" size={40} color="#FFF" />
            </TouchableOpacity>
        )
    });

    const animatedEvent = Animated.event([
        {
            nativeEvent: {
                translationX: translateX,
            }
        }
    ], { useNativeDriver: true });


    function renderItem({ item }) {
        var colorAbsences;

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
            <View style={styles.containerItem}>
                <View style={styles.containerName}>
                    <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={[styles.containerAbsences, {backgroundColor: colorAbsences}]}>
                    <Text style={styles.textAbsences}>{item.absences}</Text>
                </View>
            </View>
        );
    }

    function filterServants(searchText) {
        setTextSearchServants(searchText);

        let arrayFiltered  = arrayServants.filter(
            function (item) {
                return item.name.includes(searchText);
            }
        )
        
        if(arrayFiltered == []) alert('aqui');
        setArrayServantsFiltered(arrayFiltered);
    }

    function menuAnimated() {

        if(opened) {
            translateX.setValue(offset);
            translateX.setOffset(0);
            offset = 0;
        }

        Animated.timing(translateX, {
            toValue: opened ? 0 : widthScreen,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            offset = opened ? 0 : widthScreen;
            translateX.setOffset(offset);
            translateX.setValue(0);
        });

    }

    function onHandlerStateChange(event) {
        if(event.nativeEvent.oldState === State.ACTIVE) {
            opened = true;
            // setOpened(false);
            const { translationX } = event.nativeEvent;

            offset += translationX;

            if(translationX >= 40) {
                opened = false;
                // setOpened(true);
            } else {
                translateX.setValue(offset);
                translateX.setOffset(0);
                offset = 0;
            }

            Animated.timing(translateX, {
                toValue: opened ? 0 : widthScreen,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                offset = opened ? 0 : widthScreen;
                translateX.setOffset(offset);
                translateX.setValue(0);
            });

        }
    }

    useEffect(() => {
        setArrayServants(
            varArrayServants.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            })
        );

        setArrayServantsFiltered([]);

        translateX.setOffset(0);
        translateX.setValue(widthScreen);

    }, []);

    return (
        <View style={styles.container}>

            <TouchableWithoutFeedback
                onPress={() => {
                    opened = false;
                    menuAnimated();
                }}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        opacity: translateX.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0.5, 1],
                            extrapolate: 'clamp'
                        }) }}
                >

                    <View style={styles.containerSearchServants}>
                        <TextInput
                            style={styles.searchServants}
                            placeholder="Pesquisar servo..."
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={textSearchServants}
                            onChangeText={filterServants}
                            ref={inputSearchServantRef}
                            onFocus={() => {
                                opened = false;
                                menuAnimated();
                            }}
                        />
                    </View>

                    <FlatList
                        contentContainerStyle={styles.list}
                        data={
                            textSearchServants !== "" ? arrayServantsFiltered : arrayServants
                        }
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                    />
                
                </Animated.View>
            </TouchableWithoutFeedback>
            
            <PanGestureHandler
                onGestureEvent={animatedEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View
                    style={[styles.containerMenu, 
                        {
                            transform: [{
                                translateX: translateX.interpolate({
                                    inputRange: [0, widthScreen],
                                    outputRange: [0, widthScreen],
                                    extrapolate: 'clamp'
                                })
                            }],
                        }
                    ]}
                >

                    <Text style={styles.textHeaderMenu}>Rafael Montrezol</Text>

                    <TouchableOpacity
                        style={styles.buttonsMenu}
                        onPress={() => {
                            // opened = false;
                            // navigation.navigate('');
                            // menuAnimated();
                        }}
                    >
                        <Feather name="user" size={30} />
                        <Text style={styles.textButtonsMenu}>Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsMenu}
                        onPress={() => {
                            opened = false;
                            navigation.navigate('CallHistory');
                            menuAnimated();
                        }}
                    >
                        <Feather name="file-text" size={30} />
                        <Text style={styles.textButtonsMenu}>Histórico de chamadas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsMenu}
                        onPress={() => {
                            opened = false;
                            navigation.navigate('Call');
                            menuAnimated();
                        }}
                    >
                        <Feather name="file-plus" size={30} />
                        <Text style={styles.textButtonsMenu}>Nova chamada</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsMenu}
                        onPress={() => {
                            // opened = false;
                            // navigation.navigate('');
                            // menuAnimated();
                        }}
                    >
                        <Feather name="user-plus" size={30} />
                        <Text style={styles.textButtonsMenu}>Novo servo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsMenu}
                        onPress={() => {
                            opened = false;
                            navigation.navigate('ChangeServant');
                            menuAnimated();
                        }}
                    >
                        <Feather name="user-check" size={30} />
                        <Text style={styles.textButtonsMenu}>Alterar servo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsMenu}
                        onPress={() => {
                            opened = false;
                            navigation.navigate('DeleteServant');
                            menuAnimated();
                        }}
                    >
                        <Feather name="user-x" size={30} />
                        <Text style={styles.textButtonsMenu}>Excluir servo</Text>
                    </TouchableOpacity>

                </Animated.View>
            </PanGestureHandler>

        </View>
    );
}

export default Main;