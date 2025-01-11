import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import profileImage from '../../assets/images/profile.png';
import coinImage from '../../assets/images/coin.png';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';  

export default function ProfileScreen ({ navigation }) {
  const menuItems = [
    {
      id: 1,
      title: 'My Course',
      icon: 'book-outline',
      onPress: () => navigation.navigate('MyCourse'),
    },
    {
      id: 2,
      title: 'Achieved Course',
      icon: 'trophy-outline',
      onPress: () => navigation.navigate('AchievedCourses'),
    },
    {
      id: 3,
      title: 'Leader Board',
      icon: 'stats-chart-outline',
      onPress: () => navigation.navigate('LeaderBoard'),
    },
    {
      id: 4,
      title: 'Themes',
      icon: 'color-palette-outline',
      onPress: () => navigation.navigate('Themes'),
    },
    {
      id: 5,
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: 6,
      title: 'Logout',
      icon: 'log-out-outline',
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <ScrollView>
        <View style={{ padding: 20, backgroundColor: Colors.PRIMARY, height: 250 }}>
          <Text style={{ fontSize: 44, fontWeight: 'bold', color: Colors.WHITE, textAlign: 'center', marginTop: 100 }}>
            Profile
          </Text>
        </View>

        <View style={{ alignItems: 'center', padding: 20 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden', borderWidth: 3, borderColor: '#4169E1' }}>
            <Image source={profileImage} style={{ width: '100%', height: '100%' }} />
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#333' }}>Mohamed</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Image source={coinImage} style={{ width: 35, height: 35 }} />
            <Text style={{ marginLeft: 5, fontSize: 16, color: '#666' }}>7800 Points</Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#FFF', borderRadius: 15, margin: 15, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }} onPress={item.onPress}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={item.icon} size={24} color="#555" />
                <Text style={{ marginLeft: 15, fontSize: 16, color: '#333' }}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
