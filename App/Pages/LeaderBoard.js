import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services';
import Colors from '../Utils/Colors';
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
      <View style={{ height: 250, backgroundColor: Colors.PRIMARY, padding: 70, textAlign: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-bold', color: Colors.WHITE, fontSize: 32, textAlign: 'center' }}>Leader Board</Text>
      </View>
      <View style={{ marginTop: -40, height: '85%' }}>
        <FlatList
          data={userList}
          renderItem={({ item, index }) => (
            <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, margin: 5, borderRadius: 15, marginLeft: 20, marginRight: 20 }, index == 0 ? { backgroundColor: '#FAFAD2' } : index == 1 ? { backgroundColor: '#D3D3D3' } : index == 2 ? { backgroundColor: '#F4A460' } : { backgroundColor: Colors.WHITE }]}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                  <View style={{ borderColor: Colors.PRIMARY, borderWidth: 1, borderRadius: 30, marginRight: 10 }}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', width: 50, textAlign: 'center', }}>
                      {index + 1}
                    </Text>
                  </View>
                  <Image source={{ uri: item?.profileImage?.url }}
                    style={{ width: 60, height: 60, borderRadius: 25, marginRight: 10 }} />
                </View>
                <View>
                  <Text style={{ fontFamily: 'outfit-medium', fontSize: 22 }}>{item.userName}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Image source={coinImage} style={{ width: 25, height: 25 }} />
                    <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>{item.point} Points</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}


