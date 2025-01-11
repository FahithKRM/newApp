import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Login from './App/Pages/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompletedChapterContext } from './App/Context/CompletedChapterContext';
import { useState } from 'react';
import { UserPointsContext } from './App/Context/UserPointsContext';

export default function App() {
  const [isChapterComplete, setIsChapterComplete] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  return (
    <ClerkProvider publishableKey={"pk_test_aW1wcm92ZWQtbG91c2UtODQuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
      <UserPointsContext.Provider value={{ userPoints, setUserPoints }}>
        <CompletedChapterContext.Provider value={{ isChapterComplete, setIsChapterComplete }}>
          <View style={styles.container}>
            <SignedIn>
              <NavigationContainer>
                <TabNavigation />
              </NavigationContainer>

            </SignedIn>
            <SignedOut>
              <Login />
            </SignedOut>
          </View>
        </CompletedChapterContext.Provider>
      </UserPointsContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
});
