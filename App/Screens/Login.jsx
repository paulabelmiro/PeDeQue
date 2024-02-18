import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as WebBrowser  from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo"

WebBrowser.maybeCompleteAuthSession();

export default function Login() {

    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

  return (
    <View>
        <Image source={require('./../../assets/images/login.png')} 
        className="w-full h-[400px] object-cover"
        />
        <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md"> 
            <Text className="text-[18px] text-slate-500 mt-6">Compre e venda frutas e legumes em sua comunidade</Text>
            <TouchableOpacity 
            onPress={onPress}
            className="p-4 bg-[#A9CA5B] rounded-lg mt-20 shadow-md">
                <Text className="text-white text-center text-[18px]">Comece agora!</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}