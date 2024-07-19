import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from './store/authToken';
import { PersistGate } from 'redux-persist/integration/react';

import UserProfileScreen from './screens/UserProfileScreen';
import BountiesList from './screens/BountiesList';
import WelcomeScreen from './screens/SignInScreens/WelcomeScreen';
import SignUpScreen from './screens/SignInScreens/SignUpScreen';
import LoginScreen from './screens/SignInScreens/LoginScreen';
import VerifyEmailScreen from './screens/SignInScreens/VerifyEmailScreen';
import UpdatePasswordScreen from './screens/SignInScreens/UpdatePasswordScreen';
import ReturnLoginScreen from './screens/SignInScreens/ReturnLoginScreen';
import LoadingOverlay from './components/UI/AccountHelpers/LoadingOverlay';

import { GLOBAL_STYLES } from './constants/styles';
import IconButton from './components/UI/IconButton';
import { store, persistor } from './store/redux/store';



const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
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
          <Stack.Screen
          name='UpdatePasswordScreen'
          component={UpdatePasswordScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false
            }}/>
          <Stack.Screen
          name='ReturnLoginScreen'
          component={ReturnLoginScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false
            }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function AuthenticatedStack() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}>Welcome Authenticated User!</Text>
    </View>
  )
}

function Root() {
  const authToken = useSelector(state => state.authToken);
  console.log(authToken.authToken)

  if (authToken.authToken) {
    return <AuthenticatedStack />
  } else {
    return <AuthStack />
  }
}

export default function App() {
  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    </>
    
  );
};

