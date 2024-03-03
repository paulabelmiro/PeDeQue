import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import ItemList from "../Screens/ItemList";
import ProductDetail from "../Screens/ProductDetail";
import ProductMessage from "../Screens/ProductMessage";

const Stack = createStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="itemList"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: "#A9CA5B",
          },
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="productDetail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: "#A9CA5B",
          },
          headerTintColor: "#fff",
          headerTitle: "Detalhes do Produto",
        }}
      />
      <Stack.Screen
        name="productMessage"
        component={ProductMessage}
        options={{
          headerStyle: {
            backgroundColor: "#A9CA5B",
          },
          headerTintColor: "#fff",
          headerTitle: "Mensagens do Produto",
        }}
      />
    </Stack.Navigator>
  );
}
