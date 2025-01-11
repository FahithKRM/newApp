import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompletedChapterContext } from '../Context/CompletedChapterContext';
import { ScrollView } from 'react-native-gesture-handler';
import { UserPointsContext } from '../Context/UserPointsContext';
import { useUser } from '@clerk/clerk-expo';

export default function ChapterContent() {
  
  const param = useRoute().params;
  const navigation = useNavigation();
  const {user} = useUser();
  const {isChapterComplete, setIsChapterComplete} = useContext(CompletedChapterContext);
  const {userPoints, setUserPoints} = useContext(UserPointsContext);
  useEffect(() => {
    // console.log("ChapterId", param.chapterId);
    // console.log("RecordId", param.userCourseRecordId);
  }, [param])

  const onChapterFinish = () => {
    const totalPoints = Number(userPoints)+param.content?.length*10;
    MarkChapterCompleted(param.chapterId, param.userCourseRecordId,
      user.primaryEmailAddress.emailAddress, totalPoints).then(response => {
      if(response){
        ToastAndroid.show("Chapter Completed", ToastAndroid.LONG);
        setIsChapterComplete(true);
        navigation.goBack();
      }
    })
  }
  
  return param.content &&(
    <ScrollView>
      <Content content = {param.content} 
      onChapterFinish={() => onChapterFinish()}
      />
    </ScrollView>
  )
}