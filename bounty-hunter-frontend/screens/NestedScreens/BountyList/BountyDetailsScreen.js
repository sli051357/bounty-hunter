import { useNavigation } from "@react-navigation/native";
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { editBounty, removeBounty } from "../../../store/bountyList";

import { useState } from "react";
import LoadingOverlay from "../../../components/UI/AccountHelpers/LoadingOverlay";
import BountyLogTab from "../../../components/UI/BountyListHelpers/BountyLogTab";
import InputFields from "../../../components/UI/BountyListHelpers/InputFields";
import SwitchTabs from "../../../components/UI/BountyListHelpers/SwitchTabs";
import Button from "../../../components/UI/Button";
import IconButton from "../../../components/UI/IconButton";
import { GLOBAL_STYLES } from "../../../constants/styles";

function BountyDetailsScreen({ route }) {
	const { bountyId } = route.params;
	const username = useSelector((state) => state.username.username);
	const bountyList = useSelector((state) => state.bountyList.bountyList);
	const currBounty = bountyList.find((bounty) => bounty.bountyId === bountyId);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	console.log(currBounty.bountyEditHistory);

	const [favorDetails, setFavorDetails] = useState(currBounty);
	const [isMonetaryStatus, setIsMonetaryStatus] = useState(
		currBounty.paymentType === "Monetary",
	);
	const [isUploading, setIsUploading] = useState(false);

	// Need to call async function to get username of assignee since favor
	// details has id of assignee

	function setFavorDetailsHandler(text, type) {
		setFavorDetails((prevState) => ({
			...prevState,
			[type]: text,
		}));
	}

	function setIsMonetaryStatusHandeler(text) {
		if (text === "Monetary") {
			setIsMonetaryStatus(true);
		} else {
			setIsMonetaryStatus(false);
		}
	}

	function setPrivacyHandler(type) {
		const status = type !== "Private";
		setFavorDetails((prevState) => ({
			...prevState,
			privacyStatus: status,
		}));
	}

	function editFavorButtonHandler() {
		const favorNameIsValid = favorDetails.favorName.length > 0;
		const assigneeIsValid = favorDetails.assigneeId.length > 0;
		const totalOwedIsValid = favorDetails.paymentOwed.length > 0;

		if (!favorNameIsValid || !assigneeIsValid || !totalOwedIsValid) {
			Alert.alert("Please fill input values.", "Check highlighted inputs!");
			return;
		}
		editFavorHandler();
	}

	// Turn this into async function when axios is added
	function editFavorHandler() {
		setIsUploading(true);
		try {
			// Will Set up Axios Sign Up later
			// const response = await apiService.editBounty(favorDetails);
			dispatch(editBounty(favorDetails));
		} catch (error) {
			console.log(error);
			Alert.alert("Could Not Edit Bounty!", "Try again later.");
		}
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	function deleteFavorButtonHandler() {
		Alert.alert(
			"Are you sure you want to delete bounty?",
			"Bounties cannot be retreived after being deleted?",
			[
				{
					text: "Confirm",
					onPress: () => {
						navigation.navigate("BountiesList");
						dispatch(removeBounty(bountyId));
					},
				},
				{
					text: "Cancel",
					onPress: () => {
						return;
					},
				},
			],
		);
	}

	function requestDeleteBountyHandler() {
		// Change Status to Delete Bounty
	}

	function requestCompleteBountyHandler() {
		console.log("Requested Deletion");
		// Edit History Complete Request
	}

	if (isUploading) {
		<LoadingOverlay
			message="Updating data..."
			backgroundColor={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
		/>;
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
			behavior="padding"
			keyboardVerticalOffset={100}
		>
			<ScrollView
				style={{ flex: 1, backgroundColor: GLOBAL_STYLES.colors.brown300 }}
			>
				<View style={styles.page}>
					<Text style={styles.mainHeader}>Bounty Details</Text>
					<InputFields
						typeTitle="Favor Name"
						type="favorName"
						onPress={setFavorDetailsHandler}
						maxLength={18}
						value={favorDetails.favorName}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Assigned From"
						type="senderId"
						maxLength={14}
						value={favorDetails.senderId}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Assigned To"
						type="assigneeId"
						onPress={setFavorDetailsHandler}
						maxLength={14}
						value={favorDetails.assigneeId}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Total Owed *"
						type="paymentOwed"
						onPress={setFavorDetailsHandler}
						maxLength={22}
						value={favorDetails.paymentOwed}
						keyboardType="default"
						editable={username === favorDetails.senderId}
					>
						<SwitchTabs
							tabOne="Monetary"
							tabTwo="Non-Monetary"
							onPress={setIsMonetaryStatusHandeler}
							isActive={isMonetaryStatus}
							containerStyles={{ marginBottom: 8 }}
						/>
					</InputFields>
					<InputFields
						typeTitle="Favor Description"
						type="description"
						onPress={setFavorDetailsHandler}
						maxLength={175}
						value={favorDetails.description}
						keyboardType="default"
						multiLineStyles={{ minHeight: 155, flex: 1 }}
						multiline={true}
						editable={username === favorDetails.senderId}
					/>
					{username === favorDetails.senderId ? (
						<View style={styles.tagsContainer}>
							<Text style={styles.tagHeader}>Tags</Text>
							<View style={styles.addTagContainer}>
								<IconButton
									icon="add-sharp"
									iconSize={18}
									onPress={() => console.log("Make tag function")}
									color={GLOBAL_STYLES.colors.orange700}
								/>
							</View>
						</View>
					) : null}
					{username === favorDetails.senderId ? (
						<View style={styles.privacyStatusContainer}>
							<Text style={styles.privacyStatusHeader}>Privacy Status</Text>
							<SwitchTabs
								tabOne="Public"
								tabTwo="Private"
								onPress={setPrivacyHandler}
								isActive={favorDetails.privacyStatus}
							/>
						</View>
					) : null}
					<View style={styles.bountyLogContainer}>
						<Text style={styles.bountyLogHeader}>Bounty Log</Text>
						<View>
							{favorDetails.bountyEditHistory.map((tab) => {
								let type = null;
								if (tab.type === "Complete Request") {
									type = requestCompleteBountyHandler;
								} else if (tab.type === "Delete Request") {
									type = requestDeleteBountyHandler;
								}
								return (
									<BountyLogTab
										key={tab.description}
										type={tab.type}
										description={tab.description}
										onPress={type}
									/>
								);
							})}
						</View>
					</View>
					<View style={styles.buttonsContainer}>
						<Button
							title="Cancel"
							onPress={() => navigation.navigate("BountiesList")}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.brown500,
								paddingHorizontal: 30,
								borderRadius: 6,
							}}
							textStyle={{ fontSize: 28, fontWeight: "bold" }}
						/>
						{username === favorDetails.senderId ? (
							<Button
								title="Edit"
								onPress={editFavorButtonHandler}
								buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.blue300 }}
								containerStyle={{
									backgroundColor: GLOBAL_STYLES.colors.blue300,
									paddingHorizontal: 48,
									borderRadius: 6,
								}}
								textStyle={{ fontSize: 28, fontWeight: "bold" }}
							/>
						) : (
							<Button
								title="Complete"
								onPress={requestCompleteBountyHandler}
								buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.blue300 }}
								containerStyle={{
									backgroundColor: GLOBAL_STYLES.colors.blue300,
									paddingHorizontal: 48,
									borderRadius: 6,
								}}
								textStyle={{ fontSize: 28, fontWeight: "bold" }}
							/>
						)}
					</View>
					{username === favorDetails.senderId ? (
						<Button
							title="Delete"
							onPress={deleteFavorButtonHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.error700 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.error700,
								paddingHorizontal: 30,
								borderRadius: 6,
								alignSelf: "center",
							}}
							textStyle={{ fontSize: 28, fontWeight: "bold" }}
						/>
					) : (
						<Button
							title="Request Deletion"
							onPress={requestDeleteBountyHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.error700 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.error700,
								paddingHorizontal: 30,
								borderRadius: 6,
								alignSelf: "center",
							}}
							textStyle={{ fontSize: 28, fontWeight: "bold" }}
						/>
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "7%",
		paddingVertical: 12,
		alignItems: "flex-start",
		justifyContent: "center",
		gap: 18,
	},
	mainHeader: {
		color: GLOBAL_STYLES.colors.blue300,
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		alignSelf: "center",
	},
	tagsContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		gap: 4,
	},
	addTagContainer: {
		borderRadius: 8,
		borderColor: GLOBAL_STYLES.colors.orange700,
		borderWidth: 2,
	},
	tagHeader: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
	},
	privacyStatusContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		gap: 4,
	},
	privacyStatusHeader: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		alignSelf: "center",
		gap: 16,
	},
	bountyLogContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		gap: 4,
	},
	bountyLogHeader: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
	},
	bountyTabContainer: {
		flex: 1,
		justifyContent: "flex-start",
		gap: 12,
	},
});

export default BountyDetailsScreen;
