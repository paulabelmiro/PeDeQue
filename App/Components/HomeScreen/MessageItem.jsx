import { View, Text, Image } from "react-native";
import React from "react";

export default function MessageItem({ item }) {
  return (
    <View className="m-3 mb-10">
      {item.userSender ? (
        <View className="flex flex-row justify-start gap-4 items-center">
          <Image
            source={{ uri: item.userImage }}
            className="w-[30px] h-[30px] object-contain rounded-full"
          />
          <Text>{item.message}</Text>
        </View>
      ) : (
        <View className="flex flex-row justify-end gap-4 items-center">
          <Text>{item.message}</Text>
          <Image
            source={{ uri: item.userImage }}
            className="w-[30px] h-[30px] object-contain rounded-full"
          />
        </View>
      )}
    </View>
  );
}
