import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FriendUserProfile from "../../components/FriendInteractivity/FriendUserProfile";
import FriendWishlist from "../../components/FriendInteractivity/FriendWishlist";
import { GLOBAL_STYLES } from "../../constants/styles";
import LeaderBoardScreen from "../NestedScreens/LeaderBoardScreen";

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
						backgroundColor: GLOBAL_STYLES.colors.brown300,
					},
					title: "",
					headerShadowVisible: false,
				}}
			/>
			<LeaderboardStack.Screen
				name="FriendProfile"
				component={FriendUserProfile}
				options={{
					headerStyle: {
						backgroundColor: GLOBAL_STYLES.colors.brown300,
					},
					title: "",
					headerShadowVisible: false,
				}}
			/>
		</LeaderboardStack.Navigator>
	);
}

export default LeaderBoardStackScreen;
