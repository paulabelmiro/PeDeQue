import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from "../../firebaseConfig";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, getDocs, collection } from "firebase/firestore";

export default function AddProduct() {

  const [image, setImage] = useState(null);
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

  /**
   * Carrega o seletor de imagem
   */
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-10">
      <Text className="text-[20px] mt-6 font-bold text-[#3D3227]">Adicione um produto para venda:</Text>
      <Text className="text-[14px] mt-2 mb-4 text-[#3D3227]">É simples e rápido, preencha as informações do seu produto</Text>
      <Formik
        initialValues={{ title: '', desc: '', category: '', address:'', price:'', unit:'', image:''}}
        onSubmit={(values) => {console.log(values);}}
      >
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View className="mt-2">
            <TouchableOpacity onPress={pickImage}>
              {image?
              <Image source={{uri: image}} className="w-20 h-20 mx-auto mb-6 rounded-lg"/>
              :
              <Image source={require('./../../assets/images/add_photo.png')} className="w-20 h-20 mx-auto mb-6" />}
            </TouchableOpacity>
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
              <Text className="text-gray-600 pl-4">R$</Text>
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
            <View style={styles.input}>
              <Picker
                selectedValue={values?.category}
                onValueChange={itemValue => setFieldValue('category', itemValue)}
              >
                <Picker.Item label="Selecione uma categoria" value="" />
                {categoryList&&categoryList.map((category, index) => (
                  <Picker.Item key={index} label={category?.name} value={category?.name} />
                ))}
              </Picker>
            </View>
            <TextInput 
                style={styles.input}
                placeholder='Endereço'
                numberOfLines={3}
                value={values?.address}
                onChangeText={handleChange('address')}
              />
            <TouchableOpacity className="p-4 bg-[#A9CA5B] rounded-lg mt-2 shadow-md" onPress={handleSubmit} >
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
    textAlignVertical: 'top'
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  price: {
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
    width: '50%'
  },
  unit: {
    width: '40%'
  }
})