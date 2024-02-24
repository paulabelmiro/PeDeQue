import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from "../../firebaseConfig";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddProduct() {

  //Seta a imagem do produto
  const [image, setImage] = useState(null);

  //Inicializa o banco de dados e o storage
  const db = getFirestore(app);
  const storage = getStorage();

  //Inicializa o estado de loading
  const [loading, setLoading] = useState(false);

  //Pega o usuário logado
  const {user } = useUser();
  
  //Inicializa as listas de categorias e unidades
  const [categoryList, setCategoryList] = useState( [] );
  const [unitList, setUnitList] = useState( [] );

  //Carrega as listas de categorias e unidades
  useEffect(() => {
      getCategoryList();
  }, []);
  useEffect(() => {
      getUnitList();
  }, []);

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

  /**
   * Método de submissão do formulário 
   */
  const onSubmitMethod = async (values) => {

    setLoading(true);

    //Converte Uri para Blob File
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, 'ProductPost/' + Date.now() + '.jpg');

    //Faz o upload da imagem
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((response) => {

      //Pega a URL da imagem e seta os valores da imagem e do usuário
      getDownloadURL(storageRef).then( async (url) => {
        values.image = url;
        values.userName = user.fullName;
        values.userEmail = user.primaryEmailAddress.emailAddress;
        values.userImage = user.imageUrl;

        //Adiciona o produto no banco de dados
        const docRef = await addDoc(collection(db, "Product"), values);
        if(docRef.id) {
          setLoading(false);
          Alert.alert("Sucesso!", "Produto adicionado com sucesso!!");
        }
      })
    });
  }

  return (
    <View className="p-10">
      <Text className="text-[20px] mt-6 font-bold text-[#3D3227]">Adicione um produto para venda:</Text>
      <Text className="text-[14px] mt-2 mb-4 text-[#3D3227]">É simples e rápido, preencha as informações do seu produto</Text>
      <Formik
        initialValues={{ title: '', desc: '', category: '', address:'', price:'', unit:'', image:'', userName: '', userEmail:'', userImage:''}}
        onSubmit={(values) => onSubmitMethod(values)}
        validate={(values) => {
          const errors={}
          if(!values.title) {
            errors.name = 'Digite um título'
            ToastAndroid.show("Digite um título", ToastAndroid.SHORT);
          }
          return errors;
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue, errors}) => (
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
            <TouchableOpacity 
              style={{backgroundColor: loading ? '#CCC' : '#A9CA5B'}}
              disabled={loading}
              className="p-4 rounded-lg mt-2 shadow-md" 
              onPress={handleSubmit} >
              {loading ? 
                <ActivityIndicator size="small" color="#fff" />
                :
                <Text className="text-white text-center text-[18px]">Adicionar</Text>
              }
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