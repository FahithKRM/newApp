import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseProgressBar from './CourseProgressBar';

export default function CourseItem({ item, completedChapter }) {
  return (
    <View style={{ padding: 10, backgroundColor: Colors.WHITE, marginRight: 15, borderRadius: 15 }}>
      <Image source={{ uri: item?.banner.url }} style={{ width: 280, height: 160, borderRadius: 15 }} />
      <View style={{ padding: 8 }}>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>{item.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Ionicons name="book-outline" size={18} color="black" />
            <Text style={{ fontFamily: 'outfit' }}>{item.chapters?.length} Chaptes</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Ionicons name="star-half" size={18} color="#FFC107" />
            <Text style={{ color: '#FFC107', fontFamily: 'outfit' }}>{item?.rating}</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
          <Ionicons name="time-outline" size={18} color="black" />
            <Text style={{ fontFamily: 'outfit' }}>{item?.time}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Text style={{ marginTop: 5, color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>${item.price == 0 ? 'Free' : item.price}</Text>
          </View>
        </View>
      </View>
      {completedChapter != undefined? <CourseProgressBar totalChapter = {item?.chapters?.length} completedChapter={completedChapter} /> : null }

    </View>
  )
}