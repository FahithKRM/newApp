import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { CompletedChapterContext } from '../../Context/CompletedChapterContext';

export default function ChapterSection({ chapterList, userEntrolledCourse}) {
  
  const {isChapterComplete, setIsChapterComplete} = useContext(CompletedChapterContext);
  const navigation = useNavigation();

  const OnChapterPress = (chapter) => {
    if(userEntrolledCourse.length == 0){
      ToastAndroid.show('Please Enroll Course!', ToastAndroid.LONG)
      return ;
    }
    else{
      setIsChapterComplete(false)
      navigation.navigate('Chapter Content', {
        content : chapter.content, 
        chapterId : chapter.id,
        userCourseRecordId : userEntrolledCourse[0]?.id

      })
    }
  }

  const checkIsChapterCompleted = (chapterId) => {
    if(userEntrolledCourse[0]?.completedChapter?.length <= 0){
      return false;
    }
    const response = userEntrolledCourse[0]?.completedChapter
    .find(item => item.chapterId == chapterId)
    return response;
  }

  return chapterList && (
    <View style={{ padding: 10, backgroundColor: Colors.WHITE, marginTop: 20, borderRadius: 15 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Chapters</Text>
      {chapterList.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            checkIsChapterCompleted(item.id) 
              ? styles.CompleteChapter 
              : styles.inCompleteChapter
          ]}
          onPress={() => OnChapterPress(item)}
        >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {checkIsChapterCompleted(item.id) ?
             <Ionicons name="checkmark-circle" size={36} color={Colors.GREEN} />
            : <Text style={{ fontFamily: 'outfit-medium', fontSize: 27, color: Colors.GRAY }}>
              {index + 1}
            </Text>}
            <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>
              {item.title}
            </Text>
          </View>
          {userEntrolledCourse.length === 0 ? (
            <Ionicons name="lock-closed" size={28} color={Colors.GRAY} />
          ) : (
            <Ionicons name="play" size={28} color={checkIsChapterCompleted(item.id)? Colors.GREEN : Colors.GRAY} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  inCompleteChapter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.GRAY,
  },

  CompleteChapter: {
    display: 'flex',
    backgroundColor: Colors.LIGHT_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.GREEN,
  },
});
