// import { View, Text, FlatList, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Colors from '../../Utils/Colors'
// import SubHeading from '../SubHeading'
// import { GetAllProgressCourse } from '../../Services'
// import { useUser } from '@clerk/clerk-expo'
// import CourseItem from './CourseItem'
// import { useNavigation } from '@react-navigation/native'

// export default function CourseProgress() {

//   const { user } = useUser();
//   const navigation = useNavigation();
//   const [progressCourseList, setProgressCourseList] = useState();
//   useEffect(() => {
//     user && GetAllProgressCourseList();
//   }, [user]);

//   const GetAllProgressCourseList = () => {
//     GetAllProgressCourse(user.primaryEmailAddress.emailAddress)
//     .then(response => {
//       setProgressCourseList(response.userEntrolledCourses);
//     })
//   }
//   return (
//     <View>
//       <SubHeading text={'In Progress'} color={Colors.WHITE} />
//       <FlatList
//         data={progressCourseList}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//           // onPress={() => navigation.navigate('Course Details', {
//           //   courses: item
//           // })}
//           >
//             <CourseItem item={item.course} 
//             completedChapter={item.completedChapter}
//             />
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   )
// }


import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../Utils/Colors';
import SubHeading from '../SubHeading';
import { GetAllProgressCourse } from '../../Services';
import { useUser } from '@clerk/clerk-expo';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

export default function CourseProgress() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCourseList, setProgressCourseList] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("Fetching courses for user:", user.primaryEmailAddress?.emailAddress);
      GetAllProgressCourseList();
    }
  }, [user]);

  const GetAllProgressCourseList = async () => {
    try {
      const response = await GetAllProgressCourse(user.primaryEmailAddress?.emailAddress);
      console.log("Progress courses response:", response);

      if (response && response.userEntrolledCourses) {
        setProgressCourseList(response.userEntrolledCourses);
      } else {
        console.warn("No courses found for this user.");
      }
    } catch (error) {
      console.error("Error fetching progress courses:", error);
    }
  };

  return (
    <View>
      <SubHeading text={'In Progress'} color={Colors.WHITE} />
      <Text>hi</Text>
      <FlatList
        data={progressCourseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Course Details', {
              courses: item,
            })}
          >
            <CourseItem
              item={item?.course}
              completedChapter={item?.completedChapter?.length}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
