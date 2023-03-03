import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DescriptionApp from '../pages/DescriptionApp'
import Details from '../pages/Details'
import Form from '../pages/Form'
import ScreenSplash from '../pages/ScreenSplash'
import MainTab from '../navigation/MainTab'

// Esta pantalla corresponde al stack navigation

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
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
