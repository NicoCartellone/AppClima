import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DescriptionApp from '../screens/DescriptionApp'
import Details from '../screens/Details'
import Form from '../screens/Form'
import MainTab from '../navigation/MainTab'
import ScreenSplash from '../screens/ScreenSplash'

//Esta pantalla corresponde al stack navigation

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='ScreenSplash'
                    component={ScreenSplash}
                />
                <Stack.Screen
                    name='DescriptionApp'
                    component={DescriptionApp}
                />
                <Stack.Screen
                    name='Home'
                    component={MainTab}
                />
                <Stack.Screen
                    name='Details'
                    component={Details}
                />
                <Stack.Screen
                    name='Form'
                    component={Form}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack