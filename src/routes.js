import React from 'react'

import { createMaterialTopTabNavigator } from 'react-navigation'
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'

import SearchTab from './pages/SearchTab'
import FavoriteTab from './pages/FavoriteTab'

export default createMaterialTopTabNavigator ({
    Buscar: {screen: SearchTab},
    Favoritos: {screen: FavoriteTab}
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#3450A8'
          },
          labelStyle: {
              fontWeight: 'bold'
          }
    }
})



