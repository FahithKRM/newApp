import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function CourseProgressBar({totalChapter, completedChapter}) {

    const width = (completedChapter/totalChapter) * 100+" %";
  return (
    <View>
      <Text>Hi</Text>
    <View style={{width:'100%', height:5, backgroundColor:Colors.GRAY, borderRadius:99}}>
      <View style={{width:width, height:5, backgroundColor:Colors.PRIMARY, borderRadius:99}}>
      
      </View>
    </View>
    </View>

  )
}