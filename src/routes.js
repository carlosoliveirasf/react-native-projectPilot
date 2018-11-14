import React from 'react'

import { createMaterialTopTabNavigator } from 'react-navigation'
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'

import SearchTab from './pages/SearchTab'
import FavoriteTab from './pages/FavoriteTab'
import RealmTeste from './pages/RealmTeste'

export default createMaterialTopTabNavigator ({
    Buscar: {screen: SearchTab},
    Favoritos: {screen: FavoriteTab},
    RealmTeste: {screen: RealmTeste}
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#DA552F'
          },
          labelStyle: {
              fontWeight: 'bold'
          }
    }
})



