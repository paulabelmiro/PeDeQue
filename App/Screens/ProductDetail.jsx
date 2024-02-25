import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

export default function ProductDetail() {

  const {params} = useRoute();
  
  //Inicializa o produto
  const [product, setProduct] = useState([]);
  useEffect(()=>{
    params&&setProduct(params.product);
  },[params]);
    
  return (
    <View>
      <Image source={{uri:product.image}} 
      className="h-[320px] w-full object-contain"
      />
      <View>
        <View className="flex flex-row justify-between">
          <Text className="text-[#3D3227] font-bold mt-1 text-2xl px-2">{product?.title}</Text>
          <View className="items-baseline"> 
            <Text className="text-white bg-[#A9CA5B] font-bold mb-1 text-sm px-2 py-1 rounded-l-md">{product?.category}</Text>
          </View>
        </View>
        <Text className="text-gray-600 font-bold mt-2 text-base px-2">Descrição</Text>
        <Text className="text-gray-600 mb-1 text-base px-2">{product?.desc}</Text>
      </View>
    </View>
  )
}