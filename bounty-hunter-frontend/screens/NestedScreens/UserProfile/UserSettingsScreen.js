import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import apiService from "../../../api/apiRequest";
import Button from "../../../components/UI/Button";
import ChangeContent from "../../../components/UI/SettingsPageHelpers/ChangeContent";
import ChangePasswordSettings from "../../../components/UI/SettingsPageHelpers/ChangePasswordSettings";
import TitleWithButton from "../../../components/UI/TitleWithButton";
import { GLOBAL_STYLES } from "../../../constants/styles";
import { setAuthToken } from "../../../store/authToken";
import { setUsername } from "../../../store/username";

function UserSettingsScreen() {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const username = useSelector((state) => state.username);
	const [currUsername, setCurrUsername] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const authToken = useSelector((state) => state.authToken);
	const [newPassword, setNewPassword] = useState({
		"new password": "",
		"confirm new password": "",
	});

	useFocusEffect(
		useCallback(() => {
			const fetchDisplayName = async () => {
				try {
					response = await apiService.getDisplayName(username.username);
					setCurrUsername(response.displayName);
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			};

			fetchDisplayName();
		}, [username.username]),
	);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	function toggleEdit() {
		if (isEditing) {
			changeUsernameHandler();
		} else {
			setIsEditing(!isEditing);
		}
	}

	function changeStateUsername(text) {
		setCurrUsername(text);
	}
	// Turn into async function with await when API is set up
	// Check conditions for username
	async function changeUsernameHandler() {
		//Check conditions for password, if so pass and error
		try {
			// Write Axios api call
			response = await apiService.changeDisplayName(
				{ displayName: currUsername },
				authToken.authToken,
			);
			if (response.status !== "success") {
				throw new Error("Request Failed.");
			}
			setIsEditing(false);
		} catch (error) {
			console.log(error);
			Alert.alert("Error in changing username", "Try again later");
			setCurrUsername(username.username);
		}
	}

	function newPasswordChangeHandler(text, type) {
		setNewPassword((prevState) => ({
			...prevState,
			[type]: text,
		}));
	}

	// Turn into async function with await when API is set up
	// Check conditions for password
	async function confirmChangesHandler() {
		console.log(newPassword);

		// routing for resetting password. Authenticated Request
		try {
			const data = {
				pass1: newPassword["new password"],
				pass2: newPassword["confirm new password"],
			};
			const response = await apiService.resetPassword(
				data,
				authToken.authToken,
			);
			if (response.status === "fail") {
				throw new Error("request failed.");
			}
		} catch (error) {
			console.log(error);
		}
		if (response.status === "fail") {
			Alert.alert("Invalid Password");
		} else {
			navigation.navigate("ReturnLoginScreen");
		}
		setNewPassword({
			password: "",
			"confirm password": "",
		});
	}

	return (
		<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.page}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<ChangeContent
					title="Change Username"
					onPressSaveChanges={changeStateUsername}
					currText={currUsername}
					isEditing={isEditing}
					helperText="Username must be between 6-14 charecters."
					onPressToggleEdit={toggleEdit}
				/>
				<View style={[styles.viewSpacing, styles.changePasswordContainer]}>
					<Text style={styles.changePasswordTitle}>Change Password</Text>
					<ChangePasswordSettings
						typeTitle="new password"
						onPress={newPasswordChangeHandler}
						maxLength={22}
						value={newPassword["new password"]}
						keyboardType="default"
						helperText="Password must be between 6 and 22 characters."
						secureTextEntry={true}
					/>
					<ChangePasswordSettings
						typeTitle="confirm new password"
						onPress={newPasswordChangeHandler}
						maxLength={22}
						value={newPassword["confirm new password"]}
						keyboardType="default"
						helperText=""
						secureTextEntry={true}
					/>
					<Pressable 
						onPress={confirmChangesHandler}
						style={styles.buttonStyles}
					>
						<Text style={styles.buttonText}>Change Password</Text>
					</Pressable>
				</View>
				<View style={styles.viewSpacing}>
					<TitleWithButton
						title="Logout"
						titleColor={GLOBAL_STYLES.colors.orange700}
						icon="log-out"
						iconColor={GLOBAL_STYLES.colors.orange700}
						onPress={() => dispatch(setAuthToken(""))}
					/>
				</View>
				<View style={styles.viewSpacing}>
					<TitleWithButton
						title="Delete Account"
						titleColor={GLOBAL_STYLES.colors.orange700}
						icon="trash-bin-sharp"
						iconColor={GLOBAL_STYLES.colors.orange700}
						onPress={() => navigation.navigate("DeleteAccount")}
					/>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "10%",
		paddingTop: 16,
	},
	viewSpacing: {
		marginTop: 12,
	},
	changePasswordContainer: {
		justifyContent: "center",
		alignItems: "flex-start",
		gap: 8,
		marginBottom: 20,
	},
	changePasswordTitle: {
		fontSize: 22,
		color: GLOBAL_STYLES.colors.orange700,
		fontFamily: "BaiJamjuree-SemiBold",
	},
	buttonStyles: {
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: GLOBAL_STYLES.colors.orange700,
	},
	buttonText: {
		fontSize: 18,
		color: GLOBAL_STYLES.colors.brown300,
		fontFamily: "BaiJamjuree-Medium",
	}
});

export default UserSettingsScreen;
