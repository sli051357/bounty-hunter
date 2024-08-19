import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { GLOBAL_STYLES } from "./constants/styles";
import InputEmailVerifyScreen from "./screens/SignInScreens/InputEmailVerifyScreen";
import LoginScreen from "./screens/SignInScreens/LoginScreen";
import ReturnLoginScreen from "./screens/SignInScreens/ReturnLoginScreen";
import SignUpScreen from "./screens/SignInScreens/SignUpScreen";
import UpdatePasswordScreen from "./screens/SignInScreens/UpdatePasswordScreen";
import VerifyEmailScreen from "./screens/SignInScreens/VerifyEmailScreen";
import WelcomeScreen from "./screens/SignInScreens/WelcomeScreen";
import BountiesListStackScreen from "./screens/TabScreens/BountiesListStackScreen";
import LeaderBoardStackScreen from "./screens/TabScreens/LeaderBoardStackScreen";
import UserProfileStackScreen from "./screens/TabScreens/UserProfileStackScreen";
import WishListScreen from "./screens/TabScreens/WishListScreen";
import FriendListStackScreen from "./screens/TabScreens/FriendListStackScreen"
import { persistor, store } from "./store/redux/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
	// console.log('Auth')
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="WelcomeScreen"
				component={WelcomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="SignUpScreen"
				component={SignUpScreen}
				options={{
					headerTitle: "",
					headerBackTitleVisible: false,
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{
					headerTitle: "",
					headerBackTitleVisible: false,
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="InputEmailVerifyScreen"
				component={InputEmailVerifyScreen}
				options={{
					headerTitle: "",
					headerBackTitleVisible: false,
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="VerifyEmailScreen"
				component={VerifyEmailScreen}
				options={{
					headerTitle: "",
					headerBackTitleVisible: false,
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="UpdatePasswordScreen"
				component={UpdatePasswordScreen}
				options={{
					headerTitle: "",
					headerTransparent: true,
					headerBackVisible: false,
				}}
			/>
			<Stack.Screen
				name="ReturnLoginScreen"
				component={ReturnLoginScreen}
				options={{
					headerTitle: "",
					headerTransparent: true,
					headerBackVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	// console.log('Authenticated')
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size, focused }) => {
					let iconName;
					switch (route.name) {
						case "Rankings":
							iconName = focused ? "bar-chart" : "bar-chart-outline";
							break;
						case "Bounties":
							iconName = focused ? "briefcase" : "briefcase-outline";
							break;
						case "Friends":
							iconName = focused ? "people" : "people-outline";
							break;
						case "Wishlist":
							iconName = focused ? "gift" : "gift-outline";
							break;
						case "Profile":
							iconName = focused ? "person" : "person-outline";
					}
					return (
						<Ionicons
							name={iconName}
							size={size}
							color={GLOBAL_STYLES.colors.brown300}
						/>
					);
				},
				tabBarLabel: ({ children, color, focused, size }) => {
					return (
						<Text
							style={{
								marginBottom: Platform.OS === "android" ? 10 : 0,
								fontSize: 14,
								color: GLOBAL_STYLES.colors.brown300,
								fontWeight: focused ? "700" : "normal",
								textDecorationLine: focused ? "underline" : "none",
							}}
						>
							{children}
						</Text>
					);
				},
				tabBarStyle: {
					backgroundColor: GLOBAL_STYLES.colors.brown500,
					height: 80,
					//paddingTop: 4,
					paddingHorizontal: 2,
				},
			})}
		>
			<Tab.Screen
				name="Rankings"
				component={LeaderBoardStackScreen}
				options={{
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="Bounties"
				component={BountiesListStackScreen}
				options={{
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="Friends"
				component={FriendListStackScreen}
				options={{
					headerShown: false
				}}
			/>

			<Tab.Screen
				name="Wishlist"
				component={WishListScreen}
				options={{
					headerTitle: "",
					headerTransparent: true,
					headerShadowVisible: false,
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={UserProfileStackScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}

function Root() {
	const authToken = useSelector((state) => state.authToken);
	if (authToken.authToken) {
		return <AuthenticatedStack />;
	}
	return <AuthStack />;
}

export default function App() {
	const [loaded, error] = useFonts({
		"BaiJamjuree-Medium": require("./assets/fonts/BaiJamjuree-Medium.ttf"),
		"BaiJamjuree-Regular": require("./assets/fonts/BaiJamjuree-Regular.ttf"),
		"BaiJamjuree-SemiBold": require("./assets/fonts/BaiJamjuree-SemiBold.ttf"),
		"BaiJamjuree-Bold": require("./assets/fonts/BaiJamjuree-Bold.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<>
			<StatusBar />
			<SafeAreaProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<NavigationContainer>
							<Root />
						</NavigationContainer>
					</PersistGate>
				</Provider>
			</SafeAreaProvider>
		</>
	);
}
