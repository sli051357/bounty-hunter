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
	const bountyList = useSelector((state) => state.bountyList.bountyList);
	const currBounty = bountyList.find((bounty) => bounty.bountyId === bountyId);
	const currEditBountyHistory = [...currBounty.bountyEditHistory];
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const username = currBounty.assignee//useSelector((state) => state.username.username); //
	// console.log(currEditBountyHistory);

	const [favorDetails, setFavorDetails] = useState(currBounty);
	const [isMonetaryStatus, setIsMonetaryStatus] = useState(
		currBounty.paymentType === "Monetary",
	);
	const [isUploading, setIsUploading] = useState(false);

	// Need to call async function to get username of assignee since favor
	// details has id of assignee

	// Sender Restricted Function
	function setFavorDetailsHandler(text, type) {
		setFavorDetails((prevState) => ({
			...prevState,
			[type]: text,
		}));
	}

	// Sender Restricted Function
	function setIsMonetaryStatusHandeler(text) {
		if (text === "Monetary") {
			setIsMonetaryStatus(true);
		} else {
			setIsMonetaryStatus(false);
		}
	}

	// Sender Restricted Function
	function setPrivacyHandler(type) {
		const status = type !== "Private";
		setFavorDetails((prevState) => ({
			...prevState,
			privacyStatus: status,
		}));
	}

	// Sender Restricted Function
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

	// Turn these functions into async function when axios is added
	// Handles putting edits in the Bounty Log
	function editFavorHandler() {
		setIsUploading(true);
		try {
			// Will Set up Axios Sign Up later
			// const response = await apiService.editBounty(favorDetails);
			currEditBountyHistory.push({
				type: "Edit",
				description: "Bounty has been edited.",
				sender: username,
			});
			dispatch(
				editBounty({
					...favorDetails,
					bountyEditHistory: currEditBountyHistory,
				}),
			);
		} catch (error) {
			console.log(error);
			Alert.alert("Could Not Edit Bounty!", "Try again later.");
		}
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	// Deletes Favors from both user's lists
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

	// Handles initial bounty acceptance or deletion for assignee
	function bountyAcceptanceHandler(response) {
		if (response === "accept") {
			setIsUploading(true);
			try {
				// Will Set up Axios Sign Up later
				// const response = await apiService.editBounty(favorDetails);
				const index = currEditBountyHistory.findIndex(
					(edit) => edit.type === "Creation",
				);
				currEditBountyHistory.splice(index, 1);
				currEditBountyHistory.push({
					type: "Edit",
					description: "Bounty has been accepted.",
				});
				dispatch(
					editBounty({
						...favorDetails,
						bountyEditHistory: currEditBountyHistory,
					}),
				);
			} catch (error) {
				console.log(error);
				Alert.alert("Could Not Edit Bounty!", "Try again later.");
			}
			setIsUploading(false);
			navigation.navigate("BountiesList");
		} else {
			setIsUploading(true);
			try {
				// Will Set up Axios Sign Up later
				// const response = await apiService.deleteBounty(favorDetails.bountyId);
				dispatch(removeBounty(favorDetails.bountyId));
			} catch (error) {
				console.log(error);
				Alert.alert("Could Not Edit Bounty!", "Try again later.");
			}
			setIsUploading(false);
			navigation.navigate("BountiesList");
		}
	}

	// Requests for Bounty Deletion from assignee
	function requestDeleteBountyHandler() {
		setIsUploading(true);
		try {
			// Will Set up Axios Sign Up later
			// const response = await apiService.editBounty(favorDetails);
			currEditBountyHistory.push({
				type: "Delete Request",
				description: "Bounty deletion requested?",
				sender: favorDetails.assigneeId,
			});
			dispatch(
				editBounty({
					...favorDetails,
					bountyEditHistory: currEditBountyHistory,
				}),
			);
		} catch (error) {
			console.log(error);
			Alert.alert("Could Not Edit Bounty!", "Try again later.");
		}
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	function deleteBountyRequestResponseHandler(response) {
		if (response === "accept") {
			setIsUploading(true);
			try {
				// Will Set up Axios Sign Up later
				// const response = await apiService.deleteBounty(favorDetails.bountyId);
				dispatch(removeBounty(favorDetails.bountyId));
			} catch (error) {
				console.log(error);
				Alert.alert("Could Not Edit Bounty!", "Try again later.");
			}
			setIsUploading(false);
			navigation.navigate("BountiesList");
		} else {
			setIsUploading(true);
			try {
				// Will Set up Axios Sign Up later
				// const response = await apiService.deleteBounty(favorDetails.bountyId);
				const index = currEditBountyHistory.findIndex(
					(edit) => edit.type === "Delete Request",
				);
				currEditBountyHistory.splice(index, 1);
				currEditBountyHistory.push({
					type: "Edit",
					description: "Bounty deletion denied.",
				});
				dispatch(
					editBounty({
						...favorDetails,
						bountyEditHistory: currEditBountyHistory,
					}),
				);
			} catch (error) {
				console.log(error);
				Alert.alert("Could Not Edit Bounty!", "Try again later.");
			}
			setIsUploading(false);
			navigation.navigate("BountiesList");
		}
	}

	// Requests for Bounty Complete from assignee
	function requestCompleteBountyHandler() {
		setIsUploading(true);
		try {
			// Will Set up Axios Sign Up later
			// const response = await apiService.editBounty(favorDetails);
			currEditBountyHistory.push({
				type: "Complete Request",
				description: "Bounty completed requested?",
				sender: favorDetails.assigneeId,
			});
			dispatch(
				editBounty({
					...favorDetails,
					bountyEditHistory: currEditBountyHistory,
				}),
			);
		} catch (error) {
			console.log(error);
			Alert.alert("Could Not Edit Bounty!", "Try again later.");
		}
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	function completeBountyRequestResponseHandler(response) {
		if (response === "accept") {
			setIsUploading(true);
			try {
				// Will Set up Axios Sign Up later
				// const response = await apiService.editBounty(favorDetails);
				const index = currEditBountyHistory.findIndex(
					(edit) => edit.type === "Complete Request",
				);
				console;
				currEditBountyHistory.splice(index, 1);
				currEditBountyHistory.push({
					type: "Edit",
					description: "Bounty has been completed.",
				});
				dispatch(
					editBounty({
						...favorDetails,
						bountyEditHistory: currEditBountyHistory,
						status: "Completed",
					}),
				);
			} catch (error) {
				console.log(error);
				Alert.alert("Could Not Edit Bounty!", "Try again later.");
			}
			setIsUploading(false);
			navigation.navigate("BountiesList");
		} else {
			setIsUploading(true);
			try {
				// Will Set up Axios Sign Up later
				// const response = await apiService.deleteBounty(favorDetails.bountyId);
				const index = currEditBountyHistory.findIndex(
					(edit) => edit.type === "Complete Request",
				);
				currEditBountyHistory.splice(index, 1);
				currEditBountyHistory.push({
					type: "Edit",
					description: "Bounty has not been completed.",
				});
				dispatch(
					editBounty({
						...favorDetails,
						bountyEditHistory: currEditBountyHistory,
					}),
				);
			} catch (error) {
				console.log(error);
				Alert.alert("Could Not Edit Bounty!", "Try again later.");
			}
			setIsUploading(false);
			navigation.navigate("BountiesList");
		}
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
						<View style={styles.bountyTabContainer}>
							{favorDetails.bountyEditHistory.map((tab, index) => {
								//console.log(tab);
								let typeOnPress = null;
								let disabled = false;
								if (tab.type === "Complete Request") {
									disabled = username === favorDetails.assigneeId;
									typeOnPress = completeBountyRequestResponseHandler;
								} else if (tab.type === "Delete Request") {
									disabled = username === favorDetails.assigneeId;
									typeOnPress = deleteBountyRequestResponseHandler;
								} else if (tab.type === "Creation") {
									disabled = username === favorDetails.senderId;
									typeOnPress = bountyAcceptanceHandler;
								}
								return (
									<BountyLogTab
										key={index.toString()}
										type={tab.type}
										tabDescription={tab.description}
										onPress={typeOnPress}
										disabled={disabled}
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
		marginBottom: 20,
	},
	bountyLogHeader: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
	},
	bountyTabContainer: {
		flex: 1,
		gap: 12,
	},
});

export default BountyDetailsScreen;
