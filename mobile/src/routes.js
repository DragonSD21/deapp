import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Main from './pages/Servos/Main';
import Call from './pages/Servos/Call';
import CallHistory from './pages/Servos/CallHistory';
import CallHistoryDetail from './pages/Servos/CallHistoryDetail';

const Routes = createAppContainer(
    createStackNavigator({
        Home, 
        Main,
        Call,
        CallHistory,
        CallHistoryDetail,
    })
);

export default Routes;