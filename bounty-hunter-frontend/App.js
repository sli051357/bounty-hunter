import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import UserProfileScreen from './screens/UserProfileScreen';
import { GLOBAL_STYLES } from './constants/styles';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: GLOBAL_STYLES.colors.blue700,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerRight: () => {
          return (
          <IconButton 
            icon='settings-outline' 
            color='white'
            onPress={() => console.log('Settings Page')}
            />)}
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}


