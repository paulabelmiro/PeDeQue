import React from 'react';
import { Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNav from './HomeStackNav'; 
import AddProduct from '../Screens/AddProduct';
import ExploreStackNav from './ExploreStackNav';
import ProfileStackNav from './ProfileStackNav';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:"#A9CA5B"
    }} >
        <Tab.Screen name="homeNav" component={HomeStackNav}
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="home" size={size} color={color}/>
          )
        }}
        />
        <Tab.Screen name="explore" component={ExploreStackNav}
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Explorar</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="search" size={size} color={color}/>
          )
        }}
        />
        <Tab.Screen name="addproduct" component={AddProduct}
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Adicionar</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="add-circle-outline" size={size} color={color}/>
          )
        }}
        />
        <Tab.Screen name="profile" component={ProfileStackNav}
        options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize:12, marginBottom:3}}>Perfil</Text>
          ),
          tabBarIcon:({color, size})=>(
            <Ionicons name="person-circle" size={size} color={color}/>
          )
        }}
        />
    </Tab.Navigator>
  )
}