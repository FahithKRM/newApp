import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import profileImage from '../../assets/images/profile.png'
import coinImage from '../../assets/images/coin.png'
import Colors from '../Utils/Colors';


const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: 1,
      title: 'My Course',
      icon: 'book-outline',
      onPress: () => navigation.navigate('MyCourses'),
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image source={profileImage}
              style={{ width: 100, height: 100, borderRadius: 99 }}
            />
          </View>
          <Text style={styles.userName}>Mohamed</Text>
          <View style={styles.pointsContainer}>
            <Image source={coinImage} style={{ width: 35, height: 35 }} />
            <Text style={styles.points}>7800 Points</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#555" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    height: 250

  },
  headerTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color:Colors.WHITE,
    display:'flex',
    textAlign:'center',
    marginTop:100

  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#4169E1',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  points: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    margin: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;