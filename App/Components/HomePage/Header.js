import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import profileImage from './../../../assets/images/profile.png'
import Colors from '../../Utils/Colors';
import coinImage from '../../../assets/images/coin.png'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();

  return isLoaded && (
    <View>
      <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>
        <View style={styles.rowStyle}>
          {/* <Image source={{uri:user?.imageUrl}}
        style={{width:50, heigth:50, borderRadius:50}}
        /> */}
          <Image source={profileImage}
            style={{ width: 50, height: 50, borderRadius: 99 }}
          />
          <View>
            <Text style={{ color: Colors.WHITE }}>Welcome,</Text>
            <Text style={styles.mainText}>{user?.fullName}</Text>
          </View>
        </View>

        <View style={styles.rowStyle}>
          <Image source={coinImage} style={{ width: 35, height: 35 }} />
          <Text style={styles.mainText} >7800</Text>
        </View>

      </View>
      <View style={{backgroundColor:Colors.WHITE, display:'flex', padding:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:99, marginTop:30}}>
          <TextInput placeholder='Search Cources' style={{fontFamily:'outfit', fontSize:16, padding:10}} />
          <Ionicons name="search-circle-sharp" size={60} color={Colors.PRIMARY} />
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  mainText: {
    color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit'
  },
  rowStyle: {
    display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'
  }
})

