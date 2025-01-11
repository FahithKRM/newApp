// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
// import { getUserEntrolledCourse } from '../Services';
// import { Ionicons } from '@expo/vector-icons';

// const MyCourses = ({ courseId, userEmail, navigation }) => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEnrolledCourses();
//   }, []);

//   const fetchEnrolledCourses = async () => {
//     try {
//       const coursesData = await getUserEntrolledCourse(courseId, userEmail);
//       setEnrolledCourses(coursesData.userEntrolledCourses);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching enrolled courses:', error);
//       setLoading(false);
//     }
//   };

//   const calculateProgress = (completedChapters, totalChapters) => {
//     if (!completedChapters || !totalChapters) return 0;
//     return (completedChapters.length / totalChapters) * 100;
//   };

//   const renderCourseCard = ({ item }) => {
//     const progress = calculateProgress(item.completedChapter, item.course?.chapters?.length);

//     return (
//       <TouchableOpacity 
//         style={styles.courseCard}
//         onPress={() => navigation.navigate('CourseDetails', { courseId: item.courseId })}
//       >
//         <Image
//           source={{ uri: item.course?.banner?.url }}
//           style={styles.courseBanner}
//         />
//         <View style={styles.courseInfo}>
//           <Text style={styles.courseTitle} numberOfLines={2}>
//             {item.course?.name}
//           </Text>

//           <View style={styles.progressContainer}>
//             <View style={styles.progressBar}>
//               <View 
//                 style={[
//                   styles.progressFill, 
//                   { width: `${progress}%` }
//                 ]} 
//               />
//             </View>
//             <Text style={styles.progressText}>{Math.round(progress)}%</Text>
//           </View>

//           <View style={styles.courseStats}>
//             <View style={styles.statItem}>
//               <Ionicons name="time-outline" size={16} color="#666" />
//               <Text style={styles.statText}>{item.course?.time}</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Ionicons name="book-outline" size={16} color="#666" />
//               <Text style={styles.statText}>
//                 {item.completedChapter?.length || 0}/{item.course?.chapters?.length || 0} Chapters
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4169E1" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My Courses</Text>
//       {enrolledCourses.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Ionicons name="book-outline" size={60} color="#ccc" />
//           <Text style={styles.emptyText}>No enrolled courses yet</Text>
//           <TouchableOpacity 
//             style={styles.browseCourseButton}
//             onPress={() => navigation.navigate('CourseList')}
//           >
//             <Text style={styles.browseCourseButtonText}>Browse Courses</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={enrolledCourses}
//           renderItem={renderCourseCard}
//           keyExtractor={item => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//     padding: 15,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   courseCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   courseBanner: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//   },
//   courseInfo: {
//     padding: 15,
//   },
//   courseTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   progressBar: {
//     flex: 1,
//     height: 8,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 4,
//     marginRight: 10,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#4169E1',
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 14,
//     color: '#666',
//     minWidth: 45,
//   },
//   courseStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statText: {
//     marginLeft: 5,
//     fontSize: 14,
//     color: '#666',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   browseCourseButton: {
//     backgroundColor: '#4169E1',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 25,
//   },
//   browseCourseButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
// });

// export default MyCourses;

import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native'
import { GetAllProgressCourse } from '../Services';
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem';

export default function MyCourse() {
  const {user} = useUser();
    const navigation = useNavigation();
    const [progressList, setProgressList] = useState();
    useEffect(() => {
        user&&GetAllProgressCourseList();
    }, [user]);

    const GetAllProgressCourseList = () => {
        GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then(response=> {
          setProgressList(response.userEnrolledCourses);
        })
    }

  return (
    <View>
      <View style={{ height: 250, backgroundColor: Colors.PRIMARY, padding: 30 }}>
        <Text style={{ fontFamily: 'outfit-bold', color: Colors.WHITE, fontSize: 32 }}>My Course</Text>
      </View>
      <FlatList
              data={progressList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => navigation.navigate('Course Details', {
                  courses: item.course
                })}
                >
              {/* <CourseProgressItem item={item?.course} completedChapter={item?.completedChapter?.length} /> */}
              </TouchableOpacity>
              )}
            />
            <CourseProgressItem />
    </View>
  )
}