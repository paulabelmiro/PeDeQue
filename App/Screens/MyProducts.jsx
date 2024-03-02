import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {
  // Inicializa o banco de dados
  const db = getFirestore(app);

  // Pega o usuário logado
  const { user } = useUser();

  // Inicializa a lista de produtos do usuário
  const [userProducts, setUserProducts] = useState([]);
  useEffect(() => {
    user && getUserProducts();
  }, [user]);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', (e) => {
      getUserProducts();
    })
  }, [navigation])

  /**
   * Função para buscar os produtos do usuário logado
   */
  const getUserProducts = async () => {
    setUserProducts([]);
    const q = query(
      collection(db, "Product"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setUserProducts((userProducts) => [...userProducts, doc.data()]);
    });
  };

  return (
    <View>
      <LatestItemList latestItemList={userProducts} />
    </View>
  );
}
