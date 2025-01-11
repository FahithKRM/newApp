import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CourseDetailSection({ courses, entrollCourse, userEntrolledCourse}) {
  return (
    <View style={{ padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}>
      <Image source={{ uri: courses?.banner?.url }}
        style={{ width: Dimensions.get('screen').width * 0.85, height: 220, borderRadius: 15 }}
      />
      <View style={{padding:10}}>
      <Text style={{ fontSize: 22, fontFamily: 'outfit-medium', marginTop: 10 }}>{courses.name}</Text>
      <View>
        <View style={styles.rowStyle}>
          <OptionItem icon={'book-outline'} value={courses.chapters?.length + " Chapters"} />
          <OptionItem icon={'time-outline'} value={courses.time} />
        </View>

        <View style={styles.rowStyle}>
          <OptionItem icon={'person-circle-outline'} value={courses?.author} />
          <OptionItem icon={'cellular-outline'} value={courses.courseLevel} />
        </View>
      </View>
      <View>
        <Text style={{fontFamily:'outfit-medium', fontSize:20, marginTop:15}}>Description</Text>
        <Text style={{fontFamily:'outfit', color:Colors.GRAY, lineHeight:20, fontSize:16, paddingBottom:10}}>{courses?.description?.markdown}</Text>
      </View>
      <View>
        { userEntrolledCourse?.length == 0? <TouchableOpacity
        onPress={() => entrollCourse()}
        style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15}}>
          <Text style={{fontFamily:'outfit', color:Colors.WHITE, textAlign:'center', fontSize:18}}>Enroll For Free</Text>
        </TouchableOpacity> : null}
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
    fontFamily: 'outfit',
  }
})

