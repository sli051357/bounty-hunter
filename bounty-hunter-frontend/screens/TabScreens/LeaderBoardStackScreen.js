import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


import { GLOBAL_STYLES } from "../../constants/styles";
import LeaderBoardScreen from "../NestedScreens/LeaderBoardScreen";
import FriendUserProfile from "../../components/FriendInteractivity/FriendUserProfile";

const LeaderboardStack = createNativeStackNavigator();

function LeaderBoardStackScreen() {
   //const navigation = useNavigation();
    
    return (
        <LeaderboardStack.Navigator>
            <LeaderboardStack.Screen 
            name="Leaderboard" 
            component={LeaderBoardScreen}
            options={{
                headerStyle: {
                    backgroundColor: GLOBAL_STYLES.colors.brown300
                },
                title: '',
                headerShadowVisible: false,
            }}/>
            <LeaderboardStack.Screen 
            name="FriendProfile" 
            component={FriendUserProfile}
            options={({navigation}) => ({
                headerStyle: {
                    backgroundColor: GLOBAL_STYLES.colors.brown300
                },
                title: '',
                headerShadowVisible: false,
            })}/>
            
        </LeaderboardStack.Navigator>
    )
}

export default LeaderBoardStackScreen;