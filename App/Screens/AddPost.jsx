import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from "../../firebaseConfig"
import { getFirestore, getDocs, collection } from "firebase/firestore"

export default function AddPost() {

    const db = getFirestore(app);
    const [categoryList, setCategoryList] = useState( [] )

    useEffect(() => {
        getCategoryList();
    }, [])

    /**
     * Carrega a lista de categorias
     * Parei o vídeo em 1:05:04  https://www.youtube.com/watch?v=VOFJ1wBJcUo
     */
    const getCategoryList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Category'));

        querySnapshot.forEach((doc) => {
            console.log("Docs:", doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data()])
        })
  }
  return (
    <View>
      <Text>AddPost</Text>
    </View>
  )
}