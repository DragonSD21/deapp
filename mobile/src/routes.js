import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import FirstAccess from './pages/Servants/FirstAccess';
import Main from './pages/Servants/Main';
import ProfileChange from './pages/Servants/ProfileChange';
import ProfileDelete from './pages/Servants/ProfileDelete';
import Call from './pages/Servants/Call';
import CallHistory from './pages/Servants/CallHistory';
import CallHistoryDetail from './pages/Servants/CallHistoryDetail';

const Routes = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                headerShown: false,
            },
        }, 
        FirstAccess: {
            screen: FirstAccess,
            navigationOptions: {
                title: 'Primeiro acesso'
            },
        },
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Servos'
            },
        },
        Call: {
            screen: Call,
            navigationOptions: {
                title: 'Chamada dos Servos'
            },
        },
        CallHistory: {
            screen: CallHistory,
            navigationOptions: {
                title: 'Histórico de chamadas'
            },
        },
        CallHistoryDetail: {
            screen: CallHistoryDetail,
            navigationOptions: {
                title: 'Histórico de chamada detalhada',
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            },
        },
        ProfileChange: {
            screen: ProfileChange,
            navigationOptions: {
                title: 'Alterar servo'
            },
        },
        ProfileDelete: {
            screen: ProfileDelete,
            navigationOptions: {
                title: 'Excluir servo'
            },
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#141932',
            },
        },
    },
    )
);

export default Routes;