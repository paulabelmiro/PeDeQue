import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import Categories from '../Components/HomeScreen/Categories';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { app } from "../../firebaseConfig";

export default function Home() {

  //Inicializa o banco de dados
  const db = getFirestore(app);

  //Inicializa a lista de sliders e categorias
  const [slidersList, setSlidersList] = useState([]);
  const [categoryList, setCategoryList] = useState( [] );
  useEffect(() => {
    getSliders();
    getCategoryList();
  }, []);

  /**
   * Carrega a lista de sliders
   */  
  const getSliders = async () => {
    setSlidersList([]);
    const querySnapshot = await getDocs(collection(db, 'Sliders'));
    querySnapshot.forEach((doc) => {
        setSlidersList(slidersList => [...slidersList, doc.data()]);
    })
  }

  /**
  * Carrega a lista de categorias
  */
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
        console.log("Docs:", doc.data());
        setCategoryList(categoryList => [...categoryList, doc.data()]);
    })
  }
  
  return (
    <View className="py-10 px-6">
      <Header />
      <Slider slidersList={slidersList.sort((a, b) => a.index - b.index)} />
      <Categories categoryList={categoryList.sort((a, b) => a.index - b.index)}/>
    </View>
  )
}