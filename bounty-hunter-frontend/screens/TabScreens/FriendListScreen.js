import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles.js";
import { DUMMY_USER_PROFILE } from "../../util/dummy-data.js";

import apiService from "../../api/apiRequest.js";
import { useSelector } from "react-redux";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CategoryBar from "../../components/CategoryBar.js";
import FriendCard from "../../components/FriendCard.js";
import FriendRequest from "../../components/FriendRequest.js";
import SearchBar from "../../components/SearchBar.js";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay.js";
import ScrollViewHelper from "./../../components/UI/ScrollViewHelper.js";

function FriendListScreen() {
	// const friendList = useSelector((state) => state.friendList.friendList);
	const friendList = DUMMY_USER_PROFILE.friends;
	const [friendRequestList, setFriendRequestList] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Set initial to true when Api is back
	const [error, setError] = useState(null);
	const [curScreen, setCurScreen] = useState(1);
	const [search, setSearch] = useState(true);

	async function fetchFriendRequestList() {
		setError(null);
		setIsLoading(true);
		try {
			const response = await apiService.getFriendRequests();
			if (!response || !response.requests) {
				throw new Error("Undefined Information");
			}
			setFriendRequestList(response.requests);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
			setError("Failed to fetch Friend Requests. Please Try Again");
			setIsLoading(false);
		}
	}

	// useEffect(() => {
	// 	fetchFriendRequestList();

	// 	const intervalId = setInterval(fetchFriendRequestList, 60000)

	// 	return () => clearInterval(intervalId)
	// }, [])

	function handleRetryFriendRequests() {
		fetchFriendRequestList();
	}

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
		setCurScreen(search ? 4 : 1);
	}

	let content;
	const navBar = (
		<CategoryBar
			stateChanger={setCurScreen}
			list1={friendList}
			list2={friendList.filter((friend) => friend.favoriteStatus === true)}
			list3={DUMMY_REQUESTS}
		/>
	);

	// Friend List
	if (curScreen === 1) {
		content = (
			<View>
				{navBar}

				{friendList.map((friend) => (
					<FriendCard
						key={friend.id}
						friend={friend}
						imagePath={require("../../assets/batman.jpeg")}
					/>
				))}
			</View>
		);

		console.log(friendList);

		// Favorite Friends
	} else if (curScreen === 2) {
		// newFriends = DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true));

		content = (
			<View>
				{navBar}

				{friendList
					.filter((friend) => friend.favoriteStatus === true)
					.map((friend) => (
						<FriendCard
							key={friend.id}
							friend={friend}
							imagePath={require("../../assets/batman.jpeg")}
						/>
					))}
			</View>
		);

		console.log(friendList.filter((friend) => friend.favoriteStatus === true));

		// Requests
	} else if (curScreen === 3) {
		content = (
			<View>
				{navBar}

				{!error ? (
					DUMMY_REQUESTS.map((user) => (
						<FriendRequest
							key={user.username}
							user={user}
							imagePath={require("../../assets/batman.jpeg")}
						/>
					))
				) : (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
						<Button title="Retry" onPress={handleRetryFriendRequests} />
					</View>
				)}
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

	// if (isLoading) {
	// 	return <LoadingOverlay message="Fetching Bounties..."/>
	// }

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
			<View style={styles.page}>
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
			</View>
		</ScrollViewHelper>
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
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: GLOBAL_STYLES.colors.brown300,
	},
	errorText: {
		color: "red",
		marginBottom: 20,
		fontSize: 16,
		textAlign: "center",
	},
});

export default FriendListScreen;
