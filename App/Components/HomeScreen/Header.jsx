import { View, Image, Text, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {

  const {user} = useUser();

  return (
    <View>
        {/* Informações do Usuário */}
        <View className="flex flex-row items-center gap-2">
            <Image source={{uri:user?.imageUrl}} 
                className="w-10 h-10 rounded-full"
            />
            <View className="mb-2">
                <Text className="text-lg text-[#3D3227]">Olá</Text>
                <Text className="text-[20px] text-[#3D3227] font-bold">{user?.fullName}</Text>
            </View>
        </View>

        {/* Barra de Pesquisa */}
        <View className="p-2 bg-white rounded-lg flex flex-row shadow-md">
            <Ionicons name="search" size={24} color="#A9CA5B" />
            <TextInput placeholder='Pesquisar um produto' className="pl-4" onChangeText={(value) => console.log(value)}/>
        </View>
    </View>
  )
}