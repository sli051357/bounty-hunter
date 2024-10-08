import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import apiService from "../../api/apiRequest";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";

function InputEmailVerifyScreen() {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [email, setEmail] = useState("");

	function emailHandler(text) {
		setEmail(text);
	}

	async function confirmChangesHandler() {
		// console.log(codeVerify);
		// Check the validity of code here, return if false, otherwise proceed. Turn this func to async and await
		try {
			const data = { email: email };
			const response = await apiService.forgotPassword(data);
			if (response.status === "fail") {
				Alert.alert("Invalid Email or the user doesn't exist.");
			} else {
				Alert.alert("Enter the code sent to your email.");
				setEmail("");
				navigation.navigate("VerifyEmailScreen");
			}
		} catch (error) {
			throw new Error("failure");
		}
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
						<Text style={styles.header}>Forgot Password?</Text>
						<Text style={styles.description}>
							Input the email of your account and we will send you a
							verification code.
						</Text>
						<CustomTextInput
							typeTitle="Email"
							onPress={emailHandler}
							maxLength={150}
							value={email}
							keyboardType="default"
							helperText="Input the email of your account and we will send you a
							verification code."
							secureTextEntry={false}
						/>
						{/* <Button
							title="Continue"
							onPress={confirmChangesHandler}
							buttonStyles={styles.buttonStyles}
							containerStyle={{ alignSelf: "center" }}
						/> */}

						<Pressable
							onPress={confirmChangesHandler}
							style={styles.buttonStyles}
						>
							<Text style={styles.buttonText}>Continue</Text>
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
		// fontWeight: "900",
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

export default InputEmailVerifyScreen;
