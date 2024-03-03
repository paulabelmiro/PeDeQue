import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-react";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import MessagesList from "../Components/HomeScreen/MessagesList";

export default function ProductMessage({}) {
  //Pega os parâmetros da rota
  const { params } = useRoute();

  //Pega o usuário logado
  const { user } = useUser();

  //Inicializa o banco de dados
  const db = getFirestore(app);

  //Inicializa o estado de loading
  const [loading, setLoading] = useState(false);

  //Inicializa a lista de mensagens
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, []);

  //Inicializa o produto
  const [product, setProduct] = useState([]);
  useEffect(() => {
    params && setProduct(params.product);
    console.log(params);
    console.log(product);
  }, [params]);

  const getMessages = async () => {
    setMessages([]);
    const q = query(
      collection(db, "Messages"),
      where("userName", "==", user.fullName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setMessages((messages) => [...messages, doc.data()]);
    });
  };

  const onSubmitMethod = async (values) => {
    setLoading(true);

    //Seta os valores da mensagem
    values.userName = user.fullName;
    values.userImage = user.image;
    values.product = product.title;
    values.sellerName = product.userName;
    values.message = getElementById("message").value;
    values.userSender = true;

    //Adiciona a mensagem no banco de dados
    const docRef = await addDoc(collection(db, "Messages"), values);
    if (docRef.id) {
      setLoading(false);
      console.log("Document written with ID: ", docRef.id);
    }
  };

  return (
    <View className="flex flex-1 items-stretch">
      <View className="border-b-[0.5px] border-b-gray-400 flex flex-row items-center px-4 py-2 gap-4 bg-white">
        <Image
          source={{ uri: product.image }}
          className="h-[50px] w-[50px] rounded-full object-contain"
        />
        <Text className="text-[20px] my-2  font-bold text-[#3D3227] w-[75%] ">
          Combine a compra do item {product?.title} com {product?.userName}
        </Text>
      </View>
      <ScrollView className="h-[400px]">
        <MessagesList messages={messages} />
      </ScrollView>
      <View className="p-4 m-2 bg-white rounded-lg flex flex-row shadow-md justify-between">
        <TextInput
          placeholder="Digite uma mensagem"
          className="pl-4"
          id="message"
          onChangeText={(value) => console.log(value)}
        />
        <TouchableOpacity disabled={loading} onPress={() => onSubmitMethod()}>
          {loading ? (
            <ActivityIndicator size="small" color="#ccc" />
          ) : (
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={30}
              color="#A9CA5B"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
