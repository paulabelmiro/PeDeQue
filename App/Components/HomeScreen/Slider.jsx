import { View, FlatList, Image } from 'react-native'
import React from 'react'

export default function Slider({slidersList}) {
  return (
    <View className="mt-5">
      <FlatList 
      data={slidersList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View>
          <Image source={{uri: item?.image}}
            className="h-[180px] w-[290px] mr-3 rounded-lg object-contain shadow-md"
            />
        </View>
      )}
      />
    </View>
  )
}