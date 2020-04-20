import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import FirstAccess from './pages/Servants/FirstAccess';
import Main from './pages/Servants/Main';
import AddServant from './pages/Servants/AddServant';
import ChangeServant from './pages/Servants/ChangeServant';
import DeleteServant from './pages/Servants/DeleteServant';
import Call from './pages/Servants/Call';
import CallHistory from './pages/Servants/CallHistory';
import CallHistoryDetail from './pages/Servants/CallHistoryDetail';

const AppStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={{
                    headerTintColor: '#FFF',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerStyle: {
                        backgroundColor: '#141932',
                    },
                }}
            >
                <AppStack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <AppStack.Screen
                    name="FirstAccess"
                    component={FirstAccess}
                    options={{ title: 'Primeiro acesso' }}
                />
                <AppStack.Screen
                    name="Main"
                    component={Main}
                    options={{ title: 'Servos' }}
                />
                <AppStack.Screen
                    name="AddServant"
                    component={AddServant}
                    options={{ title: 'Adicionar servo' }}
                />
                <AppStack.Screen
                    name="ChangeServant"
                    component={ChangeServant}
                    options={{ title: 'Alterar servo' }}
                />
                <AppStack.Screen
                    name="DeleteServant"
                    component={DeleteServant}
                    options={{ title: 'Excluir servo' }}
                />
                <AppStack.Screen
                    name="Call"
                    component={Call}
                    options={{ title: 'Chamada dos Servos' }}
                />
                <AppStack.Screen
                    name="CallHistory"
                    component={CallHistory}
                    options={{ title: 'Histórico de chamadas' }}
                />
                <AppStack.Screen
                    name="CallHistoryDetail"
                    component={CallHistoryDetail}
                    options={{
                        title: 'Histórico de chamada detalhada',
                        headerTitleStyle: {
                            fontSize: 18,
                            fontWeight: 'bold',
                        }
                    }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
