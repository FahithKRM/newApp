import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomePage/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomePage/CourseList'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services'
import { UserPointsContext } from '../Context/UserPointsContext'
import CourseProgress from '../Components/HomePage/CourseProgress'

export default function Home() {
    const {isLoaded, signOut} = useAuth();
    const {user} = useUser();
    const {userPoints, setUserPoints} = useContext(UserPointsContext);

    useEffect(() => {
        user&&createUser();
    }, [user]);

    const createUser = () => {
        if(user){
            createNewUser(user.fullName, user.primaryEmailAddress.emailAddress)
            .then(response => {
                if(response)
                GetUser()
            })
        }
    }

    const GetUser = () => {
        getUserDetail(user.primaryEmailAddress.emailAddress).then(response => {
            console.log("--", response.userDetail?.point);
            setUserPoints(response.userDetail?.point)
        })
    }

    return (
        <ScrollView>
            <View style={{backgroundColor:Colors.PRIMARY, height:300, padding:20}}>
                <Header />
            </View>
            <View style={{padding:20}}>
                <View style={{marginTop:-100}}>
                <CourseProgress />
                <CourseList courseLevel={'Beginner'} />
                </View>
                <CourseList courseLevel={'Intermediate'} />
                <CourseList courseLevel={'Advanced'} />
            </View>
        </ScrollView>
    )
}