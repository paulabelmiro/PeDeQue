import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ProductItem from './ProductItem';

export default function LatestItemList({latestItemList}) {
  return (
    <View className="mt-3 mb-10">
      <Text className="text-[20px] text-[#3D3227] font-bold">Produtos Recentes</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({item, index}) => (
          <ProductItem item={item} />
        )}
      />
    </View>
  )
}