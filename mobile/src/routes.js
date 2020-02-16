import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import ServosMain from './pages/Servos/ServosMain';
import ServosCall from './pages/Servos/ServosCall';
import ServosCallHistory from './pages/Servos/ServosCallHistory';
import ServosCallHistoryDetail from './pages/Servos/ServosCallHistoryDetail';

const Routes = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                title: null,
                headerStyle: {
                    backgroundColor: '#141932',
                },
            },
        }, 
        ServosMain: {
            screen: ServosMain,
            navigationOptions: {
                title: 'Servos'
            },
        },
        ServosCall: {
            screen: ServosCall,
            navigationOptions: {
                title: 'Chamada dos Servos'
            },
        },
        ServosCallHistory: {
            screen: ServosCallHistory,
            navigationOptions: {
                title: 'Histórico de chamadas'
            },
        },
        ServosCallHistoryDetail: {
            screen: ServosCallHistoryDetail,
            navigationOptions: {
                title: 'Histórico de chamada detalhada'
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
                backgroundColor: '#070911',
            },
        },
    })
);

export default Routes;