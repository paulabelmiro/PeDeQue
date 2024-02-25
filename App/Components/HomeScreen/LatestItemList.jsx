import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function LatestItemList({latestItemList}) {
  return (
    <View className="mt-3 mb-10">
      <Text className="text-[20px] text-[#3D3227] font-bold">Produtos Recentes</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({item, index}) => (
          <TouchableOpacity className="flex-1 ">
            <View className="m-1 mb-0 bg-white shadow-md px-2 pt-2 rounded-t-lg">
              <Image source={{uri:item.image}}
                className="w-full h-[140px] object-contain rounded-lg"/>
              <View>
                <Text className="text-[#3D3227] font-bold mt-1 text-base">{item.title}</Text>
                <Text className="text-gray-500 font-bold mb-1 text-xs">{item.category}</Text>
              </View> 
            </View> 
              <View className="bg-[#A9CA5B] px-2 rounded-b-lg m-1 mt-0">
              <Text className="text-white font-bold py-1 text-center">R$ {item.price} {item.unit} </Text>
              </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}