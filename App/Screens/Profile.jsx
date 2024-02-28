import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';

export default function Profile() {

  const { user } = useUser();

  const menuList = [
    {
      id: 1,
      name: "Meu cadastro",
      icon: "solution1",
    },
    {
      id: 2,
      name: "Meus produtos",
      icon: "tags",
    },
        {
      id: 3,
      name: "Minhas compras",
      icon: "shoppingcart",
    },
    {
      id: 4,
      name: "Logout",
      icon: "logout",
    }

  ]

  return (
    <View className="p-5 flex-1">
      <View className="items-center mt-20">
        <Image source={{uri:user?.imageUrl}} className="w-[100px] h-[100px] rounded-full items-center"/>
      <Text className="text-2xl text-[#3D3227] text-center font-bold mt-2">{user?.fullName}</Text>
      <Text className="text-base text-gray-600 text-center">{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
      <View className="items-center mt-10">
        <FlatList 
        data={menuList}
        renderItem={({item, index})=>(
          <TouchableOpacity className="flex flex-row items-center gap-6 p-4">
            <AntDesign name={item?.icon} size={24} color="#A9CA5B" />
            <Text className="text-xl text-[#3D3227] text-left">{item?.name}</Text>
          </TouchableOpacity>
        )}
        />
      </View>
    </View>
  )
}