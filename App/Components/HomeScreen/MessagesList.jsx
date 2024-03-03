import { View, FlatList } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

export default function MessagesList({ messages }) {
  return (
      <FlatList
        data={messages}
        renderItem={({ item, index }) => <MessageItem item={item} />}
      />
  );
}
