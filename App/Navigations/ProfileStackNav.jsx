import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import MyProducts from '../Screens/MyProducts';
import ProductDetail from '../Screens/ProductDetail';

// Cria a navegação em pilha
const Stack = createStackNavigator();

export default function ProfileStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profileTab" 
      options={{
        headerShown:false
      }}
      component={Profile} />
      <Stack.Screen name="myProducts" 
        component={MyProducts} 
        options={{
            headerStyle:{
              backgroundColor:"#A9CA5B"
            },
            headerTintColor:"#fff",
            headerTitle: 'Meus Produtos'
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