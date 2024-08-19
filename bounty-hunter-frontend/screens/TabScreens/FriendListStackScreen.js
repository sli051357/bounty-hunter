import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FriendUserProfile from "../../components/FriendInteractivity/FriendUserProfile";
import FriendWishlist from "../../components/FriendInteractivity/FriendWishlist";
import { GLOBAL_STYLES } from "../../constants/styles";
import FriendListScreen from "../NestedScreens/FriendListScreen";

const FriendListStack = createNativeStackNavigator();

function FriendListStackScreen() {
	//const navigation = useNavigation();

	return (
		<FriendListStack.Navigator>
			<FriendListStack.Screen
				name="FriendList"
				component={FriendListScreen}
				options={{
					headerStyle: {
						backgroundColor: GLOBAL_STYLES.colors.brown300,
					},
					title: "",
					headerShadowVisible: false,
				}}
			/>
			<FriendListStack.Screen
				name="FriendProfile"
				component={FriendUserProfile}
				options={({ navigation }) => ({
					headerStyle: {
						backgroundColor: GLOBAL_STYLES.colors.brown300,
					},
					title: "",
					headerShadowVisible: false,
				})}
			/>
			<FriendListStack.Screen
				name="FriendWishlist"
				component={FriendWishlist}
				options={({ navigation }) => ({
					headerStyle: {
						backgroundColor: GLOBAL_STYLES.colors.brown300,
					},
					title: "",
					headerShadowVisible: false,
				})}
			/>
		</FriendListStack.Navigator>
	);
}

export default FriendListScreen;
