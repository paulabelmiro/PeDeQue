import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Explore from '../Screens/Explore';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

export default function ExploreStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="exploreTab" component={Explore} 
      options={{
        headerShown:false
    }}
      />
      <Stack.Screen name="productDetail" 
        component={ProductDetail}
        options={{
          headerStyle:{
            backgroundColor:"#A9CA5B"
          },
          headerTintColor:"#fff",
          headerTitle: 'Detalhes do Produto'
        }}
      />
    </Stack.Navigator>
  )
}