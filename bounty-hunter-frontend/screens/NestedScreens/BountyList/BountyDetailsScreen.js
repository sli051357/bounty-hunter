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

	async function requestDeleteBountyHandler() {
		setIsUploading(true);
		try {
			const response = await apiService.deleteBounty(
				favor.id,
				authToken,
			);
			if (response.status !== "success") {
				throw new Error("request failed");
			}
		} catch (error) {
			console.log(error);
			Alert.alert("Could not delete favor!", "Network Error");
		}
		setIsUploading(false);
		navigation.navigate("BountiesList");
	}

	async function requestCompleteBountyHandler() {
		setIsUploading(true);
		try {
			const response = await apiService.completeBounty(
				favor.id,
				authToken,
			);
			if (response.status !== "success") {
				throw new Error("request failed");
			}
		} catch (error) {
			console.log(error);
			Alert.alert("Could not complete favor!", "Network Error");
		}
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
						editable={false}
					/>
					<View style={styles.privacyStatusContainer}>
						<Text style={styles.privacyStatusHeader}>Privacy Status</Text>
						<SwitchTabs
							tabOne="Public"
							tabTwo="Private"
							onPress={setPrivacyHandler}
							isActive={favorDetails.privacyStatus}
							editable={false}
						/>
					</View>
					<View style={styles.buttonsContainer}>
						<Button
							title="Delete"
							onPress={requestDeleteBountyHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.brown500,
								paddingHorizontal: 10,
								borderRadius: 6,
							}}
							textStyle={{ fontSize: 14, fontWeight: "bold" }}
						/>
						<Button
							title="Complete"
							onPress={requestCompleteBountyHandler}
							buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.blue300 }}
							containerStyle={{
								backgroundColor: GLOBAL_STYLES.colors.blue300,
								paddingHorizontal: 10,
								borderRadius: 6,
							}}
							textStyle={{ fontSize: 14, fontWeight: "bold" }}
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
