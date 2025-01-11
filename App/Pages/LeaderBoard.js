// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
// import Colors from '../Utils/Colors';
// import profileImg from '../../assets/images/profile.png'
// import coinImage from '../../assets/images/coin.png'

// const Leaderboard = () => {
//   const leaderboardData = [
//     { rank: 1, name: 'Alice', points: 1200, profileImage: 'https://via.placeholder.com/50' },
//     { rank: 2, name: 'Bob', points: 1150, profileImage: 'https://via.placeholder.com/50' },
//     { rank: 3, name: 'Charlie', points: 1100, profileImage: 'https://via.placeholder.com/50' },
//     { rank: 4, name: 'Ken', points: 1200, profileImage: 'https://via.placeholder.com/50' },
//     { rank: 5, name: 'Rob', points: 1150, profileImage: 'https://via.placeholder.com/50' },
//     { rank: 6, name: 'Christy', points: 1100, profileImage: 'https://via.placeholder.com/50' },
//   ];

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
// <View style={{borderColor:Colors.PRIMARY, borderWidth:1, borderRadius:30, marginRight:10 }}>
//   <Text style={styles.rank}>{item.rank}</Text>
// </View>
//       <Image source={profileImg} style={styles.image} />
//       <Text style={styles.name}>{item.name}</Text>
// <Image source={coinImage} style={{ width: 35, height: 35 }} />
//       <Text style={styles.points}>{item.points} Points</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={{backgroundColor:Colors.PRIMARY, height:250, marginBottom:30}}>
//         <Text style={styles.title}>Leader Board</Text>
//       </View>
//       <FlatList
//         data={leaderboardData}
//         keyExtractor={(item) => item.rank.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 44,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color:Colors.WHITE,
//     display:'flex',
//     flexDirection:'row',
//     textAlign:'center',
//     paddingTop:80,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 2,
//   },
//   rank: {
// fontSize: 32,
// fontWeight: 'bold',
// width: 50,
// textAlign: 'center',
//     // color:Colors.PRIMARY

//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   name: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight:'bold'
//   },
//   points: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Leaderboard;


import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services';
import Colors from '../Utils/Colors';
import profileImage from '../../assets/images/profile.png';
import coinImage from '../../assets/images/coin.png'

export default function LeaderBoard() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GetAllUserDetails();
  }, []);

  const GetAllUserDetails = () => {
    GetAllUsers().then(response => {
      console.log(response);
      response && setUserList(response?.userDetails);

    })
  }

  return (
    <View>
      <View style={{ height: 250, backgroundColor: Colors.PRIMARY, padding: 30 }}>
        <Text style={{ fontFamily: 'outfit-bold', color: Colors.WHITE, fontSize: 32 }}>Leader Board</Text>
      </View>
      <View style={{marginTop:-40, height:'85%'}}>
        <FlatList
          data={userList}
          renderItem={({ item, index }) => (
            <View style={[{display:'flex', flexDirection:'row',alignItems:'center', padding:20, margin:5, borderRadius:15, marginLeft:20, marginRight:20}, index== 0 ? {backgroundColor:'#ffd700'} : index==1 ? {backgroundColor:'#c0c0c0'} : index==2 ? {backgroundColor:'#cd7f32'} : {backgroundColor:Colors.WHITE}]}>
            <View style={{display:'flex', flexDirection:'row', gap: 40, alignItems:'center'}}>
              <View style={{ display: 'flex', flexDirection: 'row', gap:30, alignItems:'center' }}>
                {/* <View style={{ borderColor: Colors.PRIMARY, borderWidth: 1, borderRadius: 30, marginRight: 10 }}>
                  <Text style={{ fontSize: 32, fontWeight: 'bold', width: 50, textAlign: 'center', }}>
                    {index + 1}
                  </Text>
                </View> */}
                <Text style={{fontFamily:'outfit-bold', fontSize:24, }}>{index+1}</Text>
                <Image source={{ uri: item?.profileImage?.url }}
                  style={{ width: 60, height: 60, borderRadius:25, marginRight:10 }} />
              </View>
              <View>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 22 }}>{item.userName}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                  <Image source={coinImage} style={{ width: 25, height: 25 }} />
                  <Text style={{ fontFamily: 'outfit', fontSize: 16}}>{item.point} Points</Text>
                </View>
              </View>
            </View>
            {/* {index < 3 ? <Image source={index+1 == 1 ? coinImage: index+1 == 2 ? coinImage : coinImage} style={{width:30, height:30}}/> : null} */}
            </View>
          )}
        />
      </View>
    </View>
  )
} 


// style={[
//   { display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 20 },
//   index === 0 ? { backgroundColor: '#FFD700' } : // Gold
//   index === 1 ? { backgroundColor: '#C0C0C0' } : // Silver
//   index === 2 ? { backgroundColor: '#CD7F32' } : // Bronze
//   { backgroundColor: Colors.WHITE }
// ]}