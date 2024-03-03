import { View, Text, Image, ScrollView, Share, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "@clerk/clerk-react";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetail({ navigation }) {
  //Pega os parâmetros da rota
  const { params } = useRoute();

  //Pega o usuário logado
  const { user } = useUser();

  //Inicializa o banco de dados
  const db = getFirestore(app);

  //Pega a navegação
  const nav = useNavigation();

  //Inicializa o produto
  const [product, setProduct] = useState([]);
  useEffect(() => {
    params && setProduct(params.product);
    console.log(params);
    console.log(product);
    shareButton();
  }, [params, navigation]);

  /**
   * Adiciona o botão de compartilhamento
   */
  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => shareProduct()} className="mr-5">
          <Fontisto name="share" size={22} color="white" />
        </TouchableOpacity>
      ),
    });
  };

  /**
   * Compartilha o produto
   */
  const shareProduct = async () => {
    const content = {
      message:
        product?.title +
        "\n" +
        product?.desc +
        "\nR$ " +
        product?.price +
        " " +
        product?.unit,
    };
    Share.share(content).then(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  };

  const deleteUserProduct = () => {
    Alert.alert("", "Você confirma que deseja excluir esse produto?", [
      {
        text: "Sim",
        onPress: () => deleteFromFirestore(),
      },
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const deleteFromFirestore = async () => {
    const q = query(
      collection(db, "Product"),
      where("title", "==", product.title)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      nav.goBack();
    });
    Alert.alert("Produto excluído com sucesso!");
  };

  return (
    <View className="flex">
      <ScrollView className="flex">
        <Image
          source={{ uri: product.image }}
          className="h-[320px] w-full object-contain"
        />
        <View>
          <View className="flex flex-row justify-between">
            <Text className="text-[#3D3227] font-bold mt-1 text-2xl px-2">
              {product?.title}
            </Text>
            <View className="items-baseline">
              <Text className="text-white bg-[#A9CA5B] font-bold mb-1 text-sm px-2 py-1 rounded-l-md">
                {product?.category}
              </Text>
            </View>
          </View>
          <View className="p-2 flex flex-row items-center justify-end">
            <View className="mr-3">
              <Text className="text-gray-600 text-sm text-right">
                Anunciado por
              </Text>
              <Text className="text-[#3D3227] font-bold text-base text-right">
                {product?.userName}
              </Text>
            </View>
            <Image
              source={{ uri: product.userImage }}
              className="w-10 h-10 rounded-full"
            />
          </View>
          <View className="bg-white rounded-t-3xl grow min-h-[262px] p-2 m-1 mb-0 mt-2">
            <Text className="text-gray-600 font-bold mt-2 text-base px-2">
              Descrição
            </Text>
            <Text className="text-gray-600 mb-1 text-base px-2">
              {product?.desc}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="bg-[#A9CA5B] flex flex-row p-4 absolute bottom-0 w-full justify-between items-center px-8">
        <Text className="text-white font-bold py-1 text-center text-base">
          R$ {product?.price} {product?.unit}{" "}
        </Text>
        {user?.primaryEmailAddress?.emailAddress === product?.userEmail ? (
          <View className="flex flex-row items-center gap-8">
            <TouchableOpacity
              className="items-center"
              onPress={() => deleteUserProduct()}
            >
              <Fontisto name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <Fontisto name="history" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => nav.push("productMessage", { product: product })}
          >
            <Fontisto name="comment" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
