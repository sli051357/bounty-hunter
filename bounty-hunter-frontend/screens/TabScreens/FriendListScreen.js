import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// import { useFonts } from 'expo-font';

import { GLOBAL_STYLES } from "../../constants/styles.js";
import { DUMMY_USER_PROFILE } from "../../util/dummy-data.js";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CategoryBar from "../../components/CategoryBar.js";
import FriendCard from "../../components/FriendCard.js";
import FriendRequest from "../../components/FriendRequest.js";
import SearchBar from "../../components/SearchBar.js";

function FriendListScreen() {
	// const [loaded, error] = useFonts({
	//     'BaiJamjuree-Regular': require('../../assets/fonts/BaiJamjuree-Regular.tff'),
	// });

	const [curScreen, setCurScreen] = useState(1);
	const [search, setSearch] = useState(true);

	const DUMMY_REQUESTS = [
		{
			username: "GreenGoblin123",
			id: "G10397593",
		},
		{
			username: "Hulk",
			id: "hulk",
		},
	];

	function setSearchStatus() {
		setSearch((curr) => !curr);
		if (search === true) {
			setCurScreen(4);
		} else {
			setCurScreen(1);
		}
	}

	let content;
	const navBar = (
		<CategoryBar
			stateChanger={setCurScreen}
			list1={DUMMY_USER_PROFILE.friends}
			list2={DUMMY_USER_PROFILE.friends.filter((friend) => friend.fav === true)}
			list3={DUMMY_REQUESTS}
		/>
	);

	// Friend List
	if (curScreen === 1) {
		content = (
			<View>
				{navBar}

				{DUMMY_USER_PROFILE.friends.map((friend) => (
					<FriendCard
						key={friend.nickname}
						friend={friend}
						imagePath={require("../../assets/batman.jpeg")}
					/>
				))}
			</View>
		);

		// Favorite Friends
	} else if (curScreen === 2) {
		// newFriends = DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true));

		content = (
			<View>
				{navBar}

				{DUMMY_USER_PROFILE.friends
					.filter((friend) => friend.fav === true)
					.map((friend) => (
						<FriendCard
							key={friend.nickname}
							friend={friend}
							imagePath={require("../../assets/batman.jpeg")}
						/>
					))}
			</View>
		);

		// Requests
	} else if (curScreen === 3) {
		content = (
			<View>
				{navBar}

				{DUMMY_REQUESTS.map((user) => (
					<FriendRequest
						key={user.username}
						user={user}
						imagePath={require("../../assets/batman.jpeg")}
					/>
				))}
			</View>
		);

		// Friend Search -  replace with actual search function
	} else {
		content = (
			<View>
				<SearchBar />
			</View>
		);
	}

	return (
		<ScrollView style={styles.page}>
			<View>
				<Text style={styles.headerText}>Friends</Text>
			</View>

			<View>
				<Pressable onPress={setSearchStatus} style={styles.button}>
					{search ? (
						<MaterialIcons
							name="person-add-alt"
							size={16}
							color={GLOBAL_STYLES.colors.brown300}
						/>
					) : (
						<Ionicons
							name="return-down-back"
							size={16}
							color={GLOBAL_STYLES.colors.brown300}
						/>
					)}
				</Pressable>
			</View>

			<View>{content}</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "5%",
		paddingTop: 100,
	},
	headerText: {
		fontFamily: "BaiJamjuree-Bold",
		fontSize: 36,
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
	},
	button: {
		backgroundColor: GLOBAL_STYLES.colors.brown700,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginBottom: 5,
		marginRight: "2.5%",
	},
});

export default FriendListScreen;
