import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from "../../firebaseConfig";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import { getFirestore, getDocs, collection } from "firebase/firestore";

export default function AddPost() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState( [] );
  const [unitList, setUnitList] = useState( [] );

  useEffect(() => {
      getCategoryList();
  }, [])

  useEffect(() => {
      getUnitList();
  }, [])

  /**
  * Carrega a lista de categorias
  */
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));

    querySnapshot.forEach((doc) => {
        console.log("Docs:", doc.data());
        setCategoryList(categoryList => [...categoryList, doc.data()])
    })
  }

  /**
   * Carrega a lista de unidades
   */
  const getUnitList = async () => {
    setUnitList([]);
    const querySnapshot = await getDocs(collection(db, 'Unit'));

    querySnapshot.forEach((doc) => {
        console.log("Docs:", doc.data());
        setUnitList(unitList => [...unitList, doc.data()])
    })
  }

  return (
    <View className="p-10">
      <Text className="text-[20px] mt-6 font-bold text-[#3D3227]">Adicione um produto para venda:</Text>
      <Text className="text-[14px] mt-2 text-[#3D3227]">É simples e rápido, preencha as informações do seu produto</Text>
      <Formik
        initialValues={{ title: '', desc: '', category: '', address:'', price:'', unit:'', image:''}}
        onSubmit={(values) => {console.log(values);}}
      >
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View className="mt-2">
            <TextInput 
              style={styles.input}
              placeholder='Título'
              value={values?.title}
              onChangeText={handleChange('title')}
            />
             <TextInput 
              style={styles.input}
              placeholder='Descrição'
              value={values?.desc}
              numberOfLines={5}
              onChangeText={handleChange('desc')}
            />
            <View style={styles.priceView}>
              <TextInput 
                style={styles.price}
                placeholder='Preço'
                value={values?.price}
                keyboardType='number-pad'
                onChangeText={handleChange('price')}
              />
              <Picker
                style={styles.unit}
                selectedValue={values?.unit}
                onValueChange={itemValue => setFieldValue('unit', itemValue)}
              >
                {unitList&&unitList.map((unit, index) => (
                  <Picker.Item key={index} label={unit?.name} value={unit?.name} />
                ))}
              </Picker>
            </View>
            <Picker
              selectedValue={values?.category}
              onValueChange={itemValue => setFieldValue('category', itemValue)}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              {categoryList&&categoryList.map((category, index) => (
                <Picker.Item key={index} label={category?.name} value={category?.name} />
              ))}
            </Picker>
            <TextInput 
                style={styles.input}
                placeholder='Endereço'
                numberOfLines={3}
                value={values?.address}
                onChangeText={handleChange('address')}
              />
            <TouchableOpacity className="p-4 bg-[#A9CA5B] rounded-lg mt-20 shadow-md" onPress={handleSubmit} >
              <Text className="text-white text-center text-[18px]">Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
    textAlignVertical: 'top'
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
    width: '55%'
  },
  unit: {
    width: '40%'
  }
})