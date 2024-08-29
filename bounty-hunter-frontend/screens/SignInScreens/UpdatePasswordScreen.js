import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import apiService from "../../api/apiRequest";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";

function UpdatePasswordScreen() {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const passToken = useSelector((state) => state.passToken);
	const [newPassword, setNewPassword] = useState({
		"new password": "",
		"confirm new password": "",
	});

	function newPasswordChangeHandler(text, type) {
		setNewPassword((prevState) => ({
			...prevState,
			[type]: text,
		}));
	}

	async function confirmChangesHandler() {
		if (newPassword["new password"] === undefined || newPassword["confirm new password"] === undefined ) {
			Alert.alert("Enter a password");
		} else {
			const passwordIsValid =
			newPassword["new password"].length >= 8 &&
			newPassword["new password"].length < 23 &&
			!newPassword["new password"].includes(" ");
			const confirmPasswordIsValid =
				(newPassword["confirm new password"] === newPassword["new password"]) && passwordIsValid;

			if (!confirmPasswordIsValid) {
				Alert.alert("Invalid Password");
			} else {
				// routing for resetting password. Authenticated Request
				try {
					const data = {
						pass1: newPassword["new password"],
						pass2: newPassword["confirm new password"],
					};
					const response = await apiService.resetPassword(
						data,
						passToken.passToken,
					);
					if (response.status === "fail") {
						throw new Error("request failed.");
					}
					if (response["status"] === "success") {
						navigation.navigate("ReturnLoginScreen");
					} else {
						Alert.alert("Invalid Password");
					}
				} catch (error) {
					console.log(error);
				}
			}
		}

		setNewPassword({
			"new password": "",
			"confirm new password": "",
		});
	}

	return (
		<>
			<LinearGradient
				colors={[GLOBAL_STYLES.colors.brown300, GLOBAL_STYLES.colors.orange300]}
				style={styles.background}
			/>
			<View style={{ flex: 1, marginTop: insets.top + 40 }}>
				<View style={[styles.page]}>
					<View style={styles.container}>
						<Text style={styles.header}>Update Password</Text>
						<Text style={styles.description}>
							Your email has been successfully verified. Update your password
							below.
						</Text>
						<CustomTextInput
							typeTitle="new password"
							onPress={newPasswordChangeHandler}
							maxLength={22}
							value={newPassword["new password"]}
							keyboardType="default"
							helperText=""
							secureTextEntry={true}
						/>
						<CustomTextInput
							typeTitle="confirm new password"
							onPress={newPasswordChangeHandler}
							maxLength={22}
							value={newPassword["confirm new password"]}
							keyboardType="default"
							helperText="Passwords do not match!"
							secureTextEntry={true}
						/>
						<Pressable
							onPress={confirmChangesHandler}
							style={styles.buttonStyles}
						>
							<Text style={styles.buttonText}>Update Password</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		minWidth: "100%",
	},
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: "100%",
	},
	container: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		gap: 22,
		padding: 12,
		marginHorizontal: "5%",
		width: "90%",
		marginTop: "10%",
	},
	header: {
		textAlign: "center",
		fontSize: 32,
		color: GLOBAL_STYLES.colors.orange700,
		alignSelf: "center",
		fontFamily: "BaiJamjuree-Bold",
	},
	buttonStyles: {
		borderRadius: 6,
		paddingHorizontal: 32,
		paddingVertical: 8,
		backgroundColor: GLOBAL_STYLES.colors.blue300,
		alignSelf: "center",
	},
	buttonText: {
		fontFamily: 'BaiJamjuree-Medium',
		color: GLOBAL_STYLES.colors.brown300,
		fontSize: 20,
	},
	description: {
		textAlign: "center",
		fontSize: 22,
		color: GLOBAL_STYLES.colors.brown700,
		fontFamily: "BaiJamjuree-Regular",
	},
});

export default UpdatePasswordScreen;
