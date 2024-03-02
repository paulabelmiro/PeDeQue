import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import Slider from "../Components/HomeScreen/Slider";
import Categories from "../Components/HomeScreen/Categories";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { getFirestore, getDocs, collection, orderBy } from "firebase/firestore";
import { app } from "../../firebaseConfig";

export default function Home() {
  //Inicializa o banco de dados
  const db = getFirestore(app);

  //Inicializa a lista de sliders, categorias e Produtos
  const [slidersList, setSlidersList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  /**
   * Carrega a lista de sliders
   */
  const getSliders = async () => {
    setSlidersList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSlidersList((slidersList) => [...slidersList, doc.data()]);
    });
  };

  /**
   * Carrega a lista de categorias
   */
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "Product"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <ScrollView className="py-8 px-5">
      <Header />
      <Slider slidersList={slidersList.sort((a, b) => a.index - b.index)} />
      <Categories
        categoryList={categoryList.sort((a, b) => a.index - b.index)}
      />
      <LatestItemList
        latestItemList={latestItemList}
        heading={"Produtos Recentes"}
      />
    </ScrollView>
  );
}
