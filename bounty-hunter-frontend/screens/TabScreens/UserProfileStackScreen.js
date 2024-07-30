import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import UserProfileScreen from "../NestedScreens/UserProfileScreen";
import UserSettingsScreen from "../NestedScreens/UserSettingsScreen";
import UserLinkedAccountsScreen from "../NestedScreens/UserLinkedAccountsScreen";
import { GLOBAL_STYLES } from "../../constants/styles";
import IconButton from "../../components/UI/IconButton";
import DeleteAccountScreen from "../NestedScreens/DeleteAccountScreen";

const UserProfileStack = createNativeStackNavigator();

function UserProfileStackScreen() {
    const navigation = useNavigation();
    
    return (
        <UserProfileStack.Navigator>
            <UserProfileStack.Screen 
            name="UserProfile" 
            component={UserProfileScreen}
            options={{
                headerStyle: {
                    backgroundColor: GLOBAL_STYLES.colors.brown300
                },
                title: '',
                headerShadowVisible: false,
                headerRight: () => {
                    return <IconButton 
                    icon='settings'
                    color={GLOBAL_STYLES.colors.blue300}
                    onPress={() => navigation.navigate('Settings')}
                    iconSize={26}/>
                }
            }}/>
            <UserProfileStack.Screen 
            name="Settings" 
            component={UserSettingsScreen}
            options={{
                headerStyle: {
                    backgroundColor: GLOBAL_STYLES.colors.brown300,
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center'
            }}/>
            <UserProfileStack.Screen 
            name="LinkedAccounts" 
            component={UserLinkedAccountsScreen}
            options={{
                headerStyle: {
                    backgroundColor: GLOBAL_STYLES.colors.brown300,
                },
                title: '',
                headerShadowVisible: false,
            }}/>
            <UserProfileStack.Screen 
            name="DeleteAccount" 
            component={DeleteAccountScreen}
            options={{
                headerStyle: {
                    backgroundColor: GLOBAL_STYLES.colors.brown300,
                },
                title: '',
                headerShadowVisible: false,
            }}/>
        </UserProfileStack.Navigator>
        
    )
}

export default UserProfileStackScreen;