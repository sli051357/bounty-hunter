import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
// import { useFonts } from 'expo-font';

import { GLOBAL_STYLES } from "../../constants/styles.js";
import { DUMMY_USER_PROFILE } from "../../util/dummy-data.js";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import apiService from "../../api/apiRequest.js";
import CategoryBar from "../../components/FriendList/CategoryBar.js";
import FriendCard from "../../components/FriendList/FriendCard.js";
// 	import FriendRequest from "../../components/FriendList/FriendRequest.js";
import SearchBar from "../../components/FriendList/SearchBar.js";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay.js";
import ScrollViewHelper from "./../../components/UI/ScrollViewHelper.js";
import { useSelector } from "react-redux";


function FriendListScreen() {
	const [friendRequestList, setFriendRequestList] = useState([]);
	const [friendList, setFriendList] = useState([]);
	const [favoriteList, setFavoriteList] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Set initial to true when Api is back
	const [error, setError] = useState(null);
	const [curScreen, setCurScreen] = useState(1);
	const [search, setSearch] = useState(true);
	const authToken = useSelector((state) => state.authToken.authToken);

	async function fetchFriendRequestList() {
		// console.log("hi")
		// setError(null);
		// setIsLoading(true);
		// try {
		// 	const response = await apiService.getFriendRequests(authToken);
		// 	if (!response ) {
		// 		throw new Error("Undefined Information");
		// 	}
		// 	setFriendRequestList(response.requests);
		// 	setIsLoading(false);
		// } catch (error) {
		// 	console.error("Error fetching data: ", error);
		// 	setError("Failed to fetch Friend Requests. Please Try Again");
		// 	setIsLoading(false);
		// }


	}

	async function fetchFriendsList() {
		setError(null);
		setIsLoading(true);
		try {
			const response = await apiService.getFriendsList(authToken);
			if (!response ) {
				throw new Error("Undefined Information");
			}
			console.log(response);
			setFriendList(response);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
			setError("Failed to fetch Friend Requests. Please Try Again");
			setIsLoading(false);
		}
	}

	async function fetchFavoriteList() {
		setError(null);
		setIsLoading(true);
		try {
			const response = await apiService.getFavoritedFriends(authToken);
			if (!response ) {
				throw new Error("Undefined Information");
			}
			console.log(response);
			setFavoriteList(response);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
			setError("Failed to fetch Friend Requests. Please Try Again");
			setIsLoading(false);
		}
	}


	useEffect(() => {
		fetchFriendsList();
		fetchFavoriteList();
		console.log(authToken);
		const intervalId = setInterval(fetchFriendsList, 60000);
		const intervalId2 = setInterval(fetchFavoriteList, 60000);

		return () => {clearInterval(intervalId), clearInterval(intervalId2)};
	}, [])

	function handleRetryFriendRequests() {
		fetchFriendRequestList();
	}

	const DUMMY_REQUESTS = [
		{
			username: "GreenGoblin123",
			id: "G10397593",
			imageUrl: "https://entertainment.time.com/wp-content/uploads/sites/3/2013/05/spiderman-1.jpg?w=720&h=480&crop=1",
		},
		{
			username: "Hulk",
			id: "hulk",
			imageUrl: "https://m.media-amazon.com/images/I/71A+RlBsJRL._AC_UF894,1000_QL80_.jpg",
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
			list2={DUMMY_USER_PROFILE.friends.filter((friend) => friend.fav === true)}
			list3={DUMMY_REQUESTS}
		/>
	);

	// "id":f.username,
	// "rating": user_profile.rating,
	// "image url":request.build_absolute_uri(user_profile.profile_image.url), #url of image

	// Friend List
	if (curScreen === 1) {
		content = (
			<View>
				{navBar}

				{Object.entries(friendList).map(([username, [id, rating, imageUrl]]) => (
					<FriendCard
						key={id} // Use the id from the object as the key for the component
						id={id}
						username={username}
						imageUrl={imageUrl}
						favoriteState={false}
						// onPress={() => copyPayment(username)} // Function to handle the press event
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

				{Object.entries(favoriteList).map(([username, [id, rating, imageUrl]]) => (
					<FriendCard
						key={id} // Use the id from the object as the key for the component
						id={id}
						username={username}
						imageUrl={imageUrl}
						favoriteState={true}
						// onPress={() => copyPayment(username)} // Function to handle the press event
					/>
				))}
			</View>
		);

		// Requests
	} else if (curScreen === 3) {
		content = (
			<View>
				{navBar}

				{/* {!error ? (
					DUMMY_REQUESTS.map((user) => (
						<FriendRequest
							key={user.username}
							user={user}
							imagePath={user.imageUrl}
						/>
					))
				) : (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
						<Button title="Retry" onPress={handleRetryFriendRequests} />
					</View>
				)} */}
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
