import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Categories({categoryList}) {
  return (
    <View className="mt-4">
      <Text className="text-[20px] text-[#3D3227] font-bold">Categorias</Text>
      <FlatList 
      data={categoryList}
      numColumns={4}
      renderItem={({item, index}) => (
        <TouchableOpacity className="m-1 flex-1 justify-center items-center shadow-md p-2 bg-white rounded-lg">
            <Image source={{uri: item?.icon}}
                className="h-[60px] w-[60px]"
            />
            <Text className="text-center text-[#3D3227] text-xs">{item?.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}