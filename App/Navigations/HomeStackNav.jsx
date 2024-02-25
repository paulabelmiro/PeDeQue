import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import ItemList from '../Screens/ItemList';

const Stack = createStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} 
        options={{
            headerShown:false
        }}
      />
      <Stack.Screen name="itemList" component={ItemList} />
    </Stack.Navigator>
  )
}