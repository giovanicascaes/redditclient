import React from 'react'
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Login from '../screens/Login'
import Auth from '../screens/Auth'
import Feed from '../screens/Feed'
import Random from '../screens/Random'
import {colors} from '../config/styles'
import {getIconVariantForState} from '../lib/uiHelpers'

export const TabStack = createBottomTabNavigator(
    {
        Feed,
        Random
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const icon = navigation.state.routeName === 'Feed' ? 'albums' : 'shuffle'

                return <Ionicons name={getIconVariantForState(icon, focused)}
                                 color={tintColor}
                                 size={36}/>
            }
        }),
        tabBarOptions: {
            activeTintColor: colors.tint,
            inactiveTintColor: colors.inactive,
            labelStyle: {
                fontSize: 12,
                fontWeight: 'bold'
            }
        }
    }
)

const LoginStack = createStackNavigator(
    {
        Login,
        Auth
    },
    {
        headerMode: 'screen'
    }
)

export const AppStack = createStackNavigator(
    {
        Tabs: TabStack
    },
    {
        navigationOptions: {
            headerTitle: <Ionicons name={'logo-reddit'}
                                   size={28}/>
        }
    }
)

export default createSwitchNavigator(
    {
        Login: LoginStack,
        App: AppStack
    }
)
