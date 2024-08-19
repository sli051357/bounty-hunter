import { useNavigation } from "@react-navigation/native";
import { act, useCallback, useEffect, useState } from "react";
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import dayjs from "dayjs";
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
	const authToken = useSelector((state) => state.authToken.authToken);
	const navigation = useNavigation();
	const [userBountyList, setUserBountyList] = useState([]);
	// console.log(userBountyList[userBountyList.length - 1])

	const [isloading, setIsLoading] = useState(true); // Set initial to true when Api is back
	const [error, setError] = useState(null);

	const [isSortVisible, setIsSortVisible] = useState(false);
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [activeSorting, setActiveSorting] = useState({
		sort_by: "date",
		order: "ascending",
	});
	const [activeSortingDisplay, setActiveSortingDisplay] =
		useState("Newest First");
	const [activeFiltering, setActiveFiltering] = useState({
		query: "and",
		tags: [],
		status: [],
		start_date: dayjs().format("YYYY-MM-DD"),
		end_date: dayjs().format("YYYY-MM-DD"),
		price_low: 0,
		price_high: 1000,
	});
	const [activeSearch, setActiveSearch] = useState("");
	const [tempSearch, setTempSearch] = useState("");

	const fetchList = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		// console.log(filterParams)
		// console.log(sortParams)
		// console.log(searchParams)

		try {
			const response = await apiService.viewBountyList(
				activeFiltering,
				activeSorting,
				activeSearch,
				authToken,
			);
			//console.log(response.favors);
			setUserBountyList(response.favors);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
			setError("Failed to fetch bounty list. Please try again.");
			setIsLoading(false);
		}
	}, [activeFiltering, activeSearch, activeSorting]);

	useEffect(() => {
		fetchList();

		const intervalId = setInterval(() => fetchList(), 120000);

		return () => clearInterval(intervalId);
	}, [fetchList]);

	function handleRetry() {
		fetchList();
	}

	const sortValues = [
		{ name: "Newest First" },
		{ name: "Oldest First" },
		{ name: "Friend Name A-Z" },
		{ name: "Bounty Title A-Z" },
		{ name: "Price (Highest to Lowest)" },
		{ name: "Price (Lowest to Highest)" },
	];

	// Handles sorting implementation
	function sortHandler(newActive) {
		if (newActive !== "") {
			setActiveSortingDisplay(newActive);
			if (newActive === "Newest First") {
				setActiveSorting({ sort_by: "date", order: "descending" });
				// fetchList(
				// 	activeFiltering,
				// 	{ sort_by: "date", order: "ascending" },
				// 	activeSearch,
				// );
			} else if (newActive === "Oldest First") {
				setActiveSorting({ sort_by: "date", order: "ascending" });
				// fetchList(
				// 	activeFiltering,
				// 	{ sort_by: "date", order: "descending" },
				// 	activeSearch,
				// );
			} else if (newActive === "Friend Name A-Z") {
				setActiveSorting({ sort_by: "assignee", order: "ascending" });
				// fetchList(
				// 	activeFiltering,
				// 	{ sort_by: "assignee", order: "ascending" },
				// 	activeSearch,
				// );
			} else if (newActive === "Bounty Title A-Z") {
				setActiveSorting({ sort_by: "name", order: "ascending" });
				// fetchList(
				// 	activeFiltering,
				// 	{ sort_by: "name", order: "descending" },
				// 	activeSearch,
				// );
			} else if (newActive === "Price (Highest to Lowest)") {
				setActiveSorting({ sort_by: "amount", order: "descending" });
				// fetchList(
				// 	activeFiltering,
				// 	{ sort_by: "amount", order: "ascending" },
				// 	activeSearch,
				// );
			} else {
				setActiveSorting({ sort_by: "amount", order: "ascending" });
				// fetchList(
				// 	activeFiltering,
				// 	{ sort_by: "amount", order: "descending" },
				// 	activeSearch,
				// );
			}
		}
		setIsSortVisible(false);
	}

	// Handles Filter implementation
	function filterHandler(filters) {
		setActiveFiltering(filters);
		// fetchList(filters, activeSorting, activeSearch)
		setIsFilterVisible(false);
	}

	function searchInputHandler(text) {
		setTempSearch(text);
	}

	function searchHandler() {
		setActiveSearch(tempSearch);
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
								onChangeText={(text) => searchInputHandler(text)}
								onSubmitEditing={searchHandler}
								value={tempSearch}
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
							key={favor.id}
							onPress={() =>
								navigation.navigate("ViewBounty", { favor: favor })
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
				sortList={sortValues}
				currActive={activeSortingDisplay}
			/>
			<FilterModal
				isVisible={isFilterVisible}
				onClose={filterHandler}
				currFilters={activeFiltering}
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
