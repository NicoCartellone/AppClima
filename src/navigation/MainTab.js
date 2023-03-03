import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Home from '../pages/Home'
import Search from '../pages/Search'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

/// /Esta pantalla corresponde a las Tab navigation

const Tab = createMaterialBottomTabNavigator()

const MainTab = ({ navigate }) => {
  return (
    <Tab.Navigator
      initialRouteName='MainTab'
      activeColor='#51608F'
      inactiveColor='#5B5A5A'
      shifting
      barStyle={{
        backgroundColor: '#ffff',
        position: 'absolute',
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}
    >
      <Tab.Screen
        name='MainTab'
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => {
            return <MaterialCommunityIcons name='home' color={color} size={26} />
          }
        }}
      />
      <Tab.Screen
        name='Searh'
        component={Search}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => {
            return <MaterialCommunityIcons name='magnify' color={color} size={26} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTab
