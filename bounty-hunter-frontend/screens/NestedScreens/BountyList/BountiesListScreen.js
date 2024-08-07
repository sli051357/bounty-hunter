import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import { useSelector } from "react-redux";
import apiService from "../../../api/apiRequest";
import FavorCard from "../../../components/FavorCard";
import FilterModal from "../../../components/FilterSort/FilterModal";
import SortModal from "../../../components/FilterSort/SortModal";
import LoadingOverlay from "../../../components/UI/AccountHelpers/LoadingOverlay";
import FloatingButton from "../../../components/UI/FloatingButton";
import IconButton from "../../../components/UI/IconButton";
import { GLOBAL_STYLES } from "../../../constants/styles";

function BountiesListScreen() {
	const userBountyList = useSelector((state) => state.bountyList.bountyList);
	const navigation = useNavigation();
	const [bountyList, setBountyList] = useState(userBountyList);
	const [isloading, setIsLoading] = useState(false); // Set initial to true when Api is back
	const [error, setError] = useState(null);
	const [isSortVisible, setIsSortVisible] = useState(false);
	const [isFilterVisible, setIsFilterVisible] = useState(false);

	async function fetchList() {
		setError(null);
		setIsLoading(true);
		try {
			const response = await apiService.viewBountyList("", "", "");
			setBountyList(response.favors);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
			setError("Failed to fetch bounty list. Please try again.");
			setIsLoading(false);
		}
	}

	// useEffect(() => {
	// 	fetchList();

	// 	const intervalId = setInterval(fetchList, 60000)

	// 	return () => clearInterval(intervalId)
	// }, [])

	function handleRetry() {
		fetchList();
	}

	// DUMMY VALUES ///////////
	const DUMMY_SORT_VALUES = [
		{ name: "Newest First", active: "true" },
		{ name: "Oldest First", active: "false" },
		{ name: "Friend Name A-Z", active: "false" },
		{ name: "Bounty Title A-Z", active: "false" },
		{ name: "Price (Highest to Lowest)", active: "false" },
		{ name: "Price (Lowest to Highest)", active: "false" },
	];

	const DUMMY_STATUS_VALUES = [
		{ name: "Sent", active: true },
		{ name: "Received", active: false },
		{ name: "In Progress", active: false },
		{ name: "Completed", active: false },
	];

	const DUMMY_TAG_VALUES = [
		{ name: "✈️ Travel", active: false },
		{ name: "🍜 Food", active: true },
		{ name: "👯 Friends", active: false },
		{ name: "🛍️ Shopping", active: false },
	];

	// Handles sorting implementation
	function sortHandler() {
		setIsSortVisible(false);
	}

	function filterHandler() {
		setIsFilterVisible(false);
	}

	if (isloading) {
		return <LoadingOverlay message="Fetching Bounties..." />;
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
				<Button title="Retry" onPress={handleRetry} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.page}>
				<Text style={styles.mainHeader}>My Bounties</Text>
				<View style={styles.viewSpacing}>
					<View style={styles.filterContainer}>
						<View style={styles.searchBar}>
							<IconButton
								icon="search-circle-outline"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={28}
								onPress={() => console.log("Filter Button")}
							/>
							<TextInput
								style={styles.textInput}
								placeholder="Search..."
								placeholderTextColor={GLOBAL_STYLES.colors.brown700}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<IconButton
								icon="filter"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={28}
								onPress={() => setIsFilterVisible(true)}
							/>
							<IconButton
								icon="swap-vertical-sharp"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={28}
								onPress={() => setIsSortVisible(true)}
							/>
						</View>
					</View>
					{userBountyList.map((favor) => (
						<FavorCard
							key={favor.bountyId}
							onPress={() =>
								navigation.navigate("ViewBounty", { bountyId: favor.bountyId })
							}
							favor={favor}
						/>
					))}
				</View>
			</ScrollView>
			<FloatingButton
				onPress={() => navigation.navigate("CreateBounty")}
				icon="add-sharp"
				color={GLOBAL_STYLES.colors.blue300}
			/>
			<SortModal
				isVisible={isSortVisible}
				onClose={sortHandler}
				sortList={DUMMY_SORT_VALUES}
			/>
			<FilterModal
				isVisible={isFilterVisible}
				onClose={filterHandler}
				statusList={DUMMY_STATUS_VALUES}
				tagList={DUMMY_TAG_VALUES}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "10%",
	},
	mainHeader: {
		fontSize: 36,
		fontWeight: "bold",
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
	},
	viewSpacing: {
		marginVertical: 8,
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
		gap: 8,
	},
	searchBar: {
		width: "70%",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 20,
		borderColor: GLOBAL_STYLES.colors.brown700,
		borderWidth: 2,
		backgroundColor: GLOBAL_STYLES.colors.brown400,
		paddingHorizontal: 8,
		// paddingVertical: 1
	},
	textInput: {
		flex: 1,
		color: GLOBAL_STYLES.colors.brown700,
		marginLeft: 8,
		fontSize: 14,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	filterText: {
		fontWeight: "bold",
		fontSize: 16,
		color: GLOBAL_STYLES.colors.blue300,
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

export default BountiesListScreen;
