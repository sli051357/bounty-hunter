import { useEffect, useState, useCallback } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
// import { useFonts } from 'expo-font';

import { GLOBAL_STYLES } from "../../constants/styles.js";
import { DUMMY_USER_PROFILE } from "../../util/dummy-data.js";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import apiService from "../../api/apiRequest.js";
import CategoryBar from "../../components/FriendList/CategoryBar.js";
import FriendCard from "../../components/FriendList/FriendCard.js";
import FriendRequest from "../../components/FriendList/FriendRequest.js";
import SearchBar from "../../components/FriendList/SearchBar.js";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay.js";
import ScrollViewHelper from "./../../components/UI/ScrollViewHelper.js";
import { useSelector } from "react-redux";


function FriendListScreen() {
	const [rerender, setRerender] = useState(false);

	const [friendList, setFriendList] = useState([]);
	const [favoriteList, setFavoriteList] = useState([]);
	const [friendRequestList, setFriendRequestList] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Set initial to true when Api is back
	const [error, setError] = useState(null);
	const [curScreen, setCurScreen] = useState(1);
	const [search, setSearch] = useState(true);
	const authToken = useSelector((state) => state.authToken.authToken);

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
			setError("Failed to fetch Friend List. Please Try Again");
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
			setError("Failed to fetch Favorite Friends. Please Try Again");
			setIsLoading(false);
		}
	}

	async function fetchFriendRequestList() {
		setError(null);
		setIsLoading(true);
		try {
			const response = await apiService.getFriendRequests(authToken);
			if (!response) {
				throw new Error("Undefined Information");
			}
			console.log(response);
			setFriendRequestList(response);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching friend request: ", error);
			setError("Failed to fetch Friend Requests. Please Try Again");
			setIsLoading(false);
		}
	}

	async function addFavoriteStatus(username) {
		data = {"friend": username};
		response = await apiService.addFavoritedFriend(data,authToken);
		if (response.status === "success") {
			setRerender((curr) => !curr);
		} else {
			console.log("failed");
		}
		
	}

	async function removeFavoriteStatus(username) {
		data = {"friend": username};
		response = await apiService.removeFavoritedFriend(data,authToken);
		if (response.status === "success") {
			setRerender((curr) => !curr);
		} else {
			console.log("failed");
		}
	}

	async function removeFriend(username) {
		// data = {"friend": username};
		response = await apiService.removeFriend(username, authToken);
		if (response.status === "success") {
			setRerender((curr) => !curr);
		} else {
			console.log("failed");
		}
	}

	async function acceptRequest(pk) {
		data = pk.toString();
		response = await apiService.acceptFriendRequest(data, authToken);
		if (response.status === "success") {
			setRerender((curr) => !curr);
		} else {
			console.log("accept request failed");
		}
	}

	async function rejectRequest(pk) {
		data = pk.toString();
		response = await apiService.rejectFriendRequest(data, authToken);
		if (response.status === "success") {
			setRerender((curr) => !curr);
		} else {
			console.log("reject request failed");
		}
	}


	useEffect(() => {
		fetchFriendsList();
		fetchFavoriteList();
		fetchFriendRequestList();
		// console.log(authToken);
		const intervalId = setInterval(fetchFriendsList, 60000);
		const intervalId2 = setInterval(fetchFavoriteList, 60000);
		const intervalId3 = setInterval(fetchFriendRequestList, 60000);

		return () => { clearInterval(intervalId); 
			clearInterval(intervalId2); clearInterval(intervalId3)};
	}, [rerender])

	// function handleRetryFriendRequests() {
	// 	fetchFriendRequestList();
	// }

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
			list2={favoriteList}
			list3={friendRequestList}
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

				{Object.entries(favoriteList).map(([username, [id, rating, imageUrl]]) => (
					<FriendCard
						key={id} // Use the id from the object as the key for the component
						id={id}
						username={username}
						imageUrl={imageUrl}
						favoriteState={true}
						removeFav={removeFavoriteStatus}
						onDelete={removeFriend}
						// onPress={() => copyPayment(username)} // Function to handle the press event
					/>
				))}

				{Object.entries(friendList).map(([username, [id, rating, imageUrl]]) => (
					<FriendCard
						key={id} // Use the id from the object as the key for the component
						id={id}
						username={username}
						imageUrl={imageUrl}
						favoriteState={false}
						addFav={addFavoriteStatus}
						onDelete={removeFriend}
						// onPress={() => copyPayment(username)} // Function to handle the press event
					/>
				))}
			</View>
		);

		// Favorite Friends
	} else if (curScreen === 2) {

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
						removeFav={removeFavoriteStatus}
						onDelete={removeFriend}
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

				{Object.entries(friendRequestList).map(([username, [id, rating, imageUrl, pk]]) => (
					<FriendRequest 
						key={pk}
						id={id}
						username={id}
						imageUrl={imageUrl}
						onYes={acceptRequest}
						onNo={rejectRequest}
						requestId={pk}
					/>
				))}

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
