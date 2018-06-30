import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Auth from '../screens/Auth';
import Feed from '../screens/Feed';
import Random from '../screens/Random';
import {colors} from '../config/styles';
import {getIconVariantForState} from '../lib/uiHelpers';

export const AppStack = createBottomTabNavigator(
    {
        Feed,
        Random
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const icon = navigation.state.routeName === 'Feed' ? 'albums' : 'shuffle';

                return <Ionicons name={getIconVariantForState(icon, focused)}
                                 color={tintColor}
                                 size={25}/>;
            }
        }),
        tabBarOptions: {
            activeTintColor: colors.tint,
            inactiveTintColor: colors.inactive,
        },

    }
);

const AuthStack = createStackNavigator({Auth});

export default createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppStack
    }
);
