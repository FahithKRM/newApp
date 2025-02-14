import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser"
import signup from './../../assets/images/login.png'
import googleImage from './../../assets/images/google.png'
import Colors from '../Utils/Colors'
import { useOAuth } from '@clerk/clerk-expo'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
    useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image source={signup}
                style={{
                    width: 600, height: 500,
                    objectFit: 'contain', marginTop: 50
                }} />

            <View style={{
                height: 600, backgroundColor: Colors.PRIMARY,
                width: '100%', marginTop: -10,
                padding: 20
            }}>
                <Text style={{ textAlign: 'center', fontSize: 35, color: Colors.WHITE, fontFamily: 'outfit-bold', marginTop: 30 }}>
                    WELCOME
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20, color: Colors.LIGHT_PRIMARY, fontFamily: 'outfit' }}>
                Discover, learn and achieve your goals with ease.
                </Text>
                <TouchableOpacity
                onPress={onPress}
                    style={{ backgroundColor: Colors.WHITE, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center', padding: 10, borderRadius: 50, marginTop: 25 }}>
                    <Image source={googleImage} style={{ width: 40, height: 40 }} />
                    <Text style={{ fontSize: 20, color: Colors.PRIMARY, fontFamily: 'outfit' }}>
                        Sign In with Google
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}