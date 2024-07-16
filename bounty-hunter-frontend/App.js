import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import UserProfileScreen from './screens/UserProfileScreen';
import BountiesList from './screens/BountiesList';
import { GLOBAL_STYLES } from './constants/styles';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();

// On the frontend, requests for data will be managed via Axios in the 
// http.js file. State management will be directed in the store/redux directory while using
// React Redux and Redux-toolkit.

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen 
          name="BountiesList" 
          component={BountiesList}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: GLOBAL_STYLES.colors.brown300,
            },
            headerTintColor: GLOBAL_STYLES.colors.blue300,
            headerTitleAlign: 'center',
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
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}


