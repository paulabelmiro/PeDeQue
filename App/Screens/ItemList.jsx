import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import { app } from "../../firebaseConfig";
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { Ionicons } from '@expo/vector-icons';


export default function ItemList() {
  const {params} = useRoute();
  const db = getFirestore(app);

  //Inicializa a lista de produtos
  const [itemList, setItemList] = useState([]);
  useEffect(()=>{
    params&&getItemListByCategory();
  },[params]);

  /**
   * Carrega a lista de produtos por categoria
   */
  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(collection(db, 'Product'), where('category', '==', params.category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItemList(itemList => [...itemList, doc.data()]);
    });
  }
  
  return (
    <View className="p-2">
      {itemList.length > 0 ? <LatestItemList latestItemList={itemList} 
      heading={''} /> 
      : <View className="mt-[160px] p-10 items-center">
          <Ionicons name="sad-outline" size={48} color="#ccc" />
          <Text className="text-center text-[20px] text-[#ccc] mt-5 font-bold">Que pena...</Text>
          <Text className="text-center text-[20px] text-[#ccc] mt-2 font-bold">
            ...Parece que não temos nenhum produto desta categoria no momento
          </Text>
        </View>}
    </View>
  )
}