import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import SubHeading from '../SubHeading'
import { GetAllProgressCourse } from '../../Services'
import { useUser } from '@clerk/clerk-expo'
import CourseItem from './CourseItem'
import { useNavigation } from '@react-navigation/native'

export default function CourseProgress() {

  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCourseList, setProgressCourseList] = useState();
  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user]);

  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user?.primaryEmailAddress?.emailAddress)
    .then(response => {
      setProgressCourseList(response?.userEntrolledCourses);
    })
  }
  return (
    <View>
      {/* <SubHeading text={'In Progress'} color={Colors.WHITE} /> */}
      <FlatList
        data={progressCourseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => navigation.navigate('Course Details', {
            courses: item
          })}
          >
            <CourseItem item={item?.course} 
            completedChapter={item?.completedChapter?.length}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}



// import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Colors from '../../Utils/Colors';
// import SubHeading from '../SubHeading';
// import { GetAllProgressCourse } from '../../Services';
// import { useUser } from '@clerk/clerk-expo';
// import CourseItem from './CourseItem';
// import { useNavigation } from '@react-navigation/native';

// export default function CourseProgress() {
//   const { user } = useUser();
//   const navigation = useNavigation();
//   const [progressCourseList, setProgressCourseList] = useState(null); // Initialize as null for loading state
//   const [isLoading, setIsLoading] = useState(true); // Add loading indicator

//   useEffect(() => {
//     if (user) {
//       GetAllProgressCourseList();
//     }
//   }, [user]);

//   const GetAllProgressCourseList = async () => {
//     try {
//       const response = await GetAllProgressCourse(user?.primaryEmailAddress?.emailAddress);
//       setProgressCourseList(response?.userEntrolledCourses || []);
//     } catch (error) {
//       console.error('Error fetching progress courses:', error); // Debugging API issues
//       setProgressCourseList([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 10, backgroundColor: Colors.BACKGROUND }}>
//       <SubHeading text="In Progress" color={Colors.WHITE} />
//       {isLoading ? (
//         <ActivityIndicator size="large" color={Colors.WHITE} />
//       ) : progressCourseList?.length > 0 ? (
//         <FlatList
//           data={progressCourseList}
//           horizontal={true}
//           keyExtractor={(item, index) => `${item?.course?.id || index}`} // Use a unique key
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('Course Details', {
//                   courses: item?.course,
//                 })
//               }
//             >
//               <CourseItem
//                 item={item?.course}
//                 completedChapter={item?.completedChapter?.length}
//               />
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <Text style={{ color: Colors.GRAY, textAlign: 'center', marginTop: 10 }}>
//           No courses in progress.
//         </Text>
//       )}
//     </View>
//   );
// }
