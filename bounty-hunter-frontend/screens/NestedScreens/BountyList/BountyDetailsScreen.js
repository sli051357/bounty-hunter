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
import apiService from "../../../api/apiRequest";

function BountyDetailsScreen({ route }) {
	const authToken = useSelector((state) => state.authToken.authToken);
	const currEditBountyHistory = [];
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const username = useSelector((state) => state.username.username); //currBounty.assignee//

	const { favor } = route.params
	const [favorDetails, setFavorDetails] = useState(favor);
	const [isMonetaryStatus, setIsMonetaryStatus] = useState(
		favor.paymentType === "Monetary",
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
	async function editButtonHandler() {
		const favorNameIsValid = favorDetails.favorName.length > 0;
		const assigneeIsValid = favorDetails.assigneeId.length > 0;
		const totalOwedIsValid = favorDetails.paymentOwed.length > 0;
		
		if (!favorNameIsValid || !assigneeIsValid || !totalOwedIsValid) {
			Alert.alert("Please fill input values.", "Check highlighted inputs!");
			return;
		}
		requestEditBountyHandler()
	}



	async function requestEditBountyHandler() {
		setIsUploading(true);
			try {
				const data = {"status": "Edit"}
				const response = await apiService.changeBountyStatus(favor.id, data, authToken);
				if ( response.status === "fail" ){
					throw new Error("invalid input"
					)
				}
			} catch (error) {
				console.log(error);
				Alert.alert("Could not edit favor!", "Cancel your current request.");
			}
			setIsUploading(false);
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}
	
	async function requestDeleteBountyHandler() {
		setIsUploading(true);
			try {
				const data = {"status": "Delete"}
				const response = await apiService.changeBountyStatus(favor.id, data, authToken);
				if ( response.status === "fail" ){
					throw new Error("invalid input"
					)
				}
			} catch (error) {
				console.log(error);
				Alert.alert("Could not delete favor!", "Cancel your current request.");
			}
			setIsUploading(false);
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}


	async function requestCompleteBountyHandler() {
		setIsUploading(true);
			try {
				const data = {"status": "Complete"}
				const response = await apiService.changeBountyStatus(favor.id, data, authToken);
				if ( response.status === "fail" ){
					throw new Error("invalid input"
					)
				}
			} catch (error) {
				console.log(error);
				Alert.alert("Could not complete favor!", "Cancel your current request.");
			}
			setIsUploading(false);
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	async function requestCancelBountyHandler() {
		setIsUploading(true);
			try {
				const data = {"status": "Cancel"}
				const response = await apiService.changeBountyStatus(favor.id, data, authToken);
				if ( response.status === "fail" ){
					throw new Error("invalid input"
					)
				}
			} catch (error) {
				console.log(error);
				Alert.alert("Could not cancel your request!");
			}
			setIsUploading(false);
		setIsUploading(false);
		navigation.navigate("BountiesList");
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
						value={favorDetails.name}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Assigned From"
						type="senderId"
						maxLength={14}
						value={username}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Assigned To"
						type="assigneeId"
						onPress={setFavorDetailsHandler}
						maxLength={14}
						value={favorDetails.assignee}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Total Owed *"
						type="paymentOwed"
						onPress={setFavorDetailsHandler}
						maxLength={22}
						value={favorDetails.total_owed_amt}
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
							{currEditBountyHistory.map((tab, index) => {
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
							onPress={requestCancelBountyHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.brown500,
								paddingHorizontal: 30,
								borderRadius: 6,
							}}
							textStyle={{ fontSize: 28, fontWeight: "bold" }}
						/>
						
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
						
					</View>

					<View style={styles.buttonsContainer}>
						<Button
							title="Delete"
							onPress={requestDeleteBountyHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.error700 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.error700,
								paddingHorizontal: 30,
								borderRadius: 6,
							}}
							textStyle={{ fontSize: 28, fontWeight: "bold" }}
						/>
						<Button
							title="Edit"
							onPress={editButtonHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.error700 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.error700,
								paddingHorizontal: 30,
								borderRadius: 6,
							}}
							textStyle={{ fontSize: 28, fontWeight: "bold" }}
						/>
						</View>
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
