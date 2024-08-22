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
import apiService from "../../../api/apiRequest";
import LoadingOverlay from "../../../components/UI/AccountHelpers/LoadingOverlay";
import BountyLogTab from "../../../components/UI/BountyListHelpers/BountyLogTab";
import InputFields from "../../../components/UI/BountyListHelpers/InputFields";
import SwitchTabs from "../../../components/UI/BountyListHelpers/SwitchTabs";
import Button from "../../../components/UI/Button";
import IconButton from "../../../components/UI/IconButton";
import { GLOBAL_STYLES } from "../../../constants/styles";

function BountyDetailsScreen({ route }) {
	const authToken = useSelector((state) => state.authToken.authToken);
	const currEditBountyHistory = [];
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const username = useSelector((state) => state.username.username); //currBounty.assignee//

	const { favor } = route.params;
	const [favorDetails, setFavorDetails] = useState({
		favorName: favor.name,
		assigneeId: favor.assignee,
		paymentOwed: favor.total_owed_amt,
		description: favor.description,
		privacyStatus: favor.privacy,
		button_states: favor.button_states
	});
	const [isMonetaryStatus, setIsMonetaryStatus] = useState(
		favor.paymentType === "Monetary",
	);
	const [isUploading, setIsUploading] = useState(false);

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

	async function requestEditBountyHandler() {
		setIsUploading(true);
		try {
			const data = { status: "Edit" };
			const response = await apiService.changeBountyStatus(
				favor.id,
				data,
				authToken,
			);
			if (response.status === "fail") {
				throw new Error("invalid input");
			}
			//create the new edited favor

			const new_favor = {
				assignee: favorDetails.assigneeId, // Same with Id
				owner: username,
				name: favorDetails.favorName,
				total_owed_type: isMonetaryStatus ? "Monetary" : "Nonmonetary",
				total_owed_amt: favorDetails.paymentOwed,
				description: favorDetails.description,
				privacy: favorDetails.privacyStatus ? "Public" : "Private",
			};
			const response2 = await apiService.editBounty(
				favor.id,
				JSON.stringify(new_favor),
				authToken,
			);
			console.log(response2);
			//dispatch(addBounty(favor));
		} catch (error) {
			console.log(error);
			Alert.alert("it favor!", "Cancel your current request.");
		}
		setIsUploading(false);
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	async function requestDeleteBountyHandler() {
		setIsUploading(true);
		try {
			const data = { status: "Delete" };
			const response = await apiService.changeBountyStatus(
				favor.id,
				data,
				authToken,
			);
			if (response.status === "fail") {
				throw new Error("invalid input");
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
			const data = { status: "Complete" };
			const response = await apiService.changeBountyStatus(
				favor.id,
				data,
				authToken,
			);
			if (response.status === "fail") {
				throw new Error("invalid input");
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
			const data = { status: "Cancel" };
			const response = await apiService.changeBountyStatus(
				favor.id,
				data,
				authToken,
			);
			if (response.status === "fail") {
				throw new Error("invalid input");
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
					<Text style={styles.mainHeader}>View Bounty</Text>
					<InputFields
						typeTitle="Favor Name *"
						type="favorName"
						onPress={setFavorDetailsHandler}
						maxLength={18}
						value={favorDetails.favorName}
						keyboardType="default"
						editable={false}
					/>
					<InputFields
						typeTitle="Assign To (by user ID) *"
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
						editable={false}
					>
						<SwitchTabs
							tabOne="Monetary"
							tabTwo="Non-Monetary"
							onPress={setIsMonetaryStatusHandeler}
							isActive={isMonetaryStatus}
							containerStyles={{ marginBottom: 8 }}
							editable={false}
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
					/>
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
					<View style={styles.privacyStatusContainer}>
						<Text style={styles.privacyStatusHeader}>Privacy Status</Text>
						<SwitchTabs
							tabOne="Public"
							tabTwo="Private"
							onPress={setPrivacyHandler}
							isActive={favorDetails.privacyStatus}
						/>
					</View>
					<View style={styles.buttonsContainer}>
						{
							username === favorDetails.assigneeId ? 
							<>
								{favorDetails.button_states.assignee.CANCEL ? 
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
								: null}
								{favorDetails.button_states.assignee.CREATE ? 
									<Button
									title="Accept"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
								{favorDetails.button_states.assignee.DELETE ? 
									<Button
									title="Delete Request"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
								{favorDetails.button_states.assignee.COMPLETE ? 
									<Button
									title="Complete Request"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
								{favorDetails.button_states.assignee.EDIT ? 
									<Button
									title="Edit"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}

			
							</>
						: 
							<>
								{favorDetails.button_states.owner.CANCEL ? 
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
								: null}
								{favorDetails.button_states.owner.CREATE ? 
									<Button
									title="Accept"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
								{favorDetails.button_states.owner.DELETE ? 
									<Button
									title="Delete Request"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
								{favorDetails.button_states.owner.COMPLETE ? 
									<Button
									title="Complete Request"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
								{favorDetails.button_states.owner.EDIT ? 
									<Button
									title="Edit"
									onPress={requestCancelBountyHandler}
									buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
									containerStyle={{
										backgroundColor: GLOBAL_STYLES.colors.brown500,
										paddingHorizontal: 30,
										borderRadius: 6,
									}}
									textStyle={{ fontSize: 28, fontWeight: "bold" }}
								/>
								: null}
							</>
						}
						

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
							onPress={requestEditBountyHandler}
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

/*{ <View style={styles.bountyLogContainer}>
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
</View> } */

export default BountyDetailsScreen;
