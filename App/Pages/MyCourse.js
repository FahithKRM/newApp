import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GetAllProgressCourse } from '../Services';
import { Ionicons } from '@expo/vector-icons';

export default function MyCourses({ userEmail, navigation }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const coursesData = await GetAllProgressCourse(userEmail);
      setEnrolledCourses(coursesData.userEntrolledCourses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setLoading(false);
    }
  };

  const calculateProgress = (completedChapters, totalChapters) => {
    if (!completedChapters || !totalChapters) return 0;
    return (completedChapters.length / totalChapters) * 100;
  };

  const renderCourseCard = ({ item }) => {
    const progress = calculateProgress(item.completedChapter, item.course?.chapters?.length);

    return (
      <TouchableOpacity
        style={{backgroundColor: '#FFF',borderRadius: 15,marginBottom: 15,shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, overflow: 'hidden'}}
        onPress={() => navigation.navigate('CourseDetails', { courseId: item.courseId })}
      >
        <Image
          source={{ uri: item.course?.banner?.url }}
          style={{ width: '100%', height: 150, resizeMode: 'cover' }}
        />
        <View style={{ padding: 15 }}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10}}
            numberOfLines={2}
          >
            {item.course?.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View
              style={{flex: 1, height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginRight: 10, overflow: 'hidden'}}
            >
              <View
                style={{
                  height: '100%',
                  backgroundColor: '#4169E1',
                  borderRadius: 4,
                  width: `${progress}%`,
                }}
              />
            </View>
            <Text style={{ fontSize: 14, color: '#666', minWidth: 45 }}>{Math.round(progress)}%</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={{ marginLeft: 5, fontSize: 14, color: '#666' }}>{item.course?.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="book-outline" size={16} color="#666" />
              <Text style={{ marginLeft: 5, fontSize: 14, color: '#666' }}>
                {item.completedChapter?.length || 0}/{item.course?.chapters?.length || 0} Chapters
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View
        style={{flex: 1,justifyContent: 'center',alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA', padding: 15 }}>
      <Text
        style={{
          fontSize: 24,fontWeight: 'bold',
          marginBottom: 20,color: '#333',
        }}
      >
        My Courses
      </Text>
      {enrolledCourses.length === 0 ? (
        <View
          style={{flex: 1,justifyContent: 'center',alignItems: 'center',
          }}
        >
          <Ionicons name="book-outline" size={60} color="#ccc" />
          <Text
            style={{fontSize: 18,color: '#666',marginTop: 10,marginBottom: 20}}
          >
            No enrolled courses yet
          </Text>
          <TouchableOpacity
            style={{backgroundColor: '#4169E1',paddingHorizontal: 20,paddingVertical: 10,borderRadius: 25,
            }}
            onPress={() => navigation.navigate('CourseList')}
          >
            <Text
              style={{color: '#FFF',fontSize: 16,fontWeight: '500'}}>
              Browse Courses
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={enrolledCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
