import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { app } from "../../firebaseConfig";
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function Explore() {

  //Inicializa o banco de dados
  const db = getFirestore(app);

  //Inicializa a lista de produtos
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);

  /**
   * Carrega a lista de produtos
   */
  const getAllProducts = async () => {
    setProductList([]);
    const q = query(collection(db, 'Product'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setProductList(productList => [...productList, doc.data()]);
    });
  };

  return (
    <ScrollView className="p-5 py-8 mt-5">
      <Text className="text-[#3D3227] font-bold text-xl">Explore mais produtos</Text>
      <LatestItemList latestItemList={productList} heading={''}/>
    </ScrollView>
  )
}