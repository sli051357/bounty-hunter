import { StatusBar } from 'expo-status-bar';
//import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

// import UserProfileScreen from './screens/UserProfileScreen';
// import BountiesList from './screens/BountiesList';

import WelcomeScreen from './screens/SignInScreens/WelcomeScreen';
import SignUpScreen from './screens/SignInScreens/SignUpScreen';
import LoginScreen from './screens/SignInScreens/LoginScreen';

import { GLOBAL_STYLES } from './constants/styles';
import IconButton from './components/UI/IconButton';
import { store } from './store/redux/store';
import VerifyEmailScreen from './screens/SignInScreens/VerifyEmailScreen';

const Stack = createNativeStackNavigator();

// On the frontend, requests for data will be managed via Axios in the 
// api folder. State management will be directed in the store/redux directory while using
// React Redux and Redux-toolkit.

export default function App() {
  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
              name='WelcomeScreen'
              component={WelcomeScreen}
              options={{
                headerShown: false
              }}/>
              <Stack.Screen
              name='SignUpScreen'
              component={SignUpScreen}
              options={{
                headerTitle: '',
                headerBackTitleVisible: false,
                headerTransparent: true,
                }}/>
              <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
              options={{
                headerTitle: '',
                headerBackTitleVisible: false,
                headerTransparent: true,
                }}/>
                <Stack.Screen
              name='VerifyEmailScreen'
              component={VerifyEmailScreen}
              options={{
                headerTitle: '',
                headerBackTitleVisible: false,
                headerTransparent: true,
                }}/>


          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
    
  );
}

{/* <Stack.Screen
              name="BountiesList"
              component={BountiesList}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: GLOBAL_STYLES.colors.brown300,
                },
                headerTintColor: GLOBAL_STYLES.colors.blue300,
                headerTitleAlign: 'center',
                headerRight: () => {
                  return (
                  <IconButton
                    icon='add'
                    color={GLOBAL_STYLES.colors.blue300}
                    onPress={() => console.log('Create Bounty Page')}
                    iconSize={28}/>)}
              }}/>
            <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{
              title: "My Profile",
              headerStyle: {
                backgroundColor: GLOBAL_STYLES.colors.brown300,
              },
              headerTintColor: GLOBAL_STYLES.colors.blue300,
              headerTitleAlign: 'center',
              headerRight: () => {
              return (
              <IconButton
                icon='settings-sharp'
                color={GLOBAL_STYLES.colors.blue300}
                onPress={() => console.log('Settings Page')}
                iconSize={24}/>)}
            }}/> */}


