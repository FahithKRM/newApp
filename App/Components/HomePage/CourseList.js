import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services'
import SubHeading from '../SubHeading';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Utils/Colors';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({ courseLevel }) {

  const [courseList, setCourseList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = () => {
    getCourseList(courseLevel).then(response => {
      console.log("Response", response);
      setCourseList(response?.courses)
    })
  }

  return (
    <View>
      <SubHeading text={courseLevel.charAt(0).toUpperCase() + courseLevel.slice(1) + ' Courses'} color={courseLevel == 'Beginner' && Colors.WHITE} />
      <FlatList
        data={courseList}
        key={courseList.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Course Details', {
            courses: item
          })}>
            <CourseItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}