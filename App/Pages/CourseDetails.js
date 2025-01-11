import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CourseDetailSection from '../Components/CourseDetailScreen/CourseDetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { entrollCourse, getUserEntrolledCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';
import { CompletedChapterContext } from '../Context/CompletedChapterContext';

export default function CourseDetails() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const {isChapterComplete, setIsChapterComplete} = useContext(CompletedChapterContext);
  const {user} = useUser();
  const [userEntrolledCourse, SetUserEntrolledCourse] = useState([]);

  useEffect(() => {
    //console.log(params.courses);
    //console.log(params.courses.id, user.primaryEmailAddress.emailAddress);
    if(user && params.courses){
      GetUserEntrolledCourse();
    }
  }, [params.courses, user])
  
  useEffect(() => {
    isChapterComplete&&GetUserEntrolledCourse();
  }, [isChapterComplete])

  const UserEntrollCourse = async () => {
    // try {
    //   const response = await entrollCourse(params.courses.id, user.primaryEmailAddress.emailAddress);
    //   //console.log('Enrollment successful:', response);
    // } catch (error) {
    //   //console.error('Error during enrollment:', error.response?.data || error.message);
    // }
    entrollCourse(params.courses.id, user.primaryEmailAddress.emailAddress)
    .then(response => {
      if(response){
        ToastAndroid.show('Course Enrolled Successfully!', ToastAndroid.LONG);
        GetUserEntrolledCourse();
      }
    })
  };
  

  const GetUserEntrolledCourse = () =>{
    getUserEntrolledCourse(params.courses.id, user.primaryEmailAddress.emailAddress)
    .then(response => {
      // console.log("--", response.userEntrolledCourses);
      SetUserEntrolledCourse(response.userEntrolledCourses)
    })
  }
  
  return params.courses&&(
    <ScrollView style={{padding:20}}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
      <Ionicons name="arrow-back-circle-sharp" size={40} color="black" />
      </TouchableOpacity>

      <CourseDetailSection courses={params.courses} 
      userEntrolledCourse = {userEntrolledCourse}
      entrollCourse={() => UserEntrollCourse()} />
      <ChapterSection chapterList={params.courses.chapters} 
      userEntrolledCourse = {userEntrolledCourse}
      />
    </ScrollView>
  )
}
