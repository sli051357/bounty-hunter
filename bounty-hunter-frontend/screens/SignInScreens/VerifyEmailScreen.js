import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import apiService from "../../api/apiRequest";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";
import { setPassToken } from "../../store/passToken";

function VerifyEmailScreen() {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [codeVerify, setCodeVerify] = useState("");
	const dispatch = useDispatch();

	function codeVerifyHandler(text) {
		setCodeVerify(text);
	}

	//adding the apistuff here
	async function confirmChangesHandler() {
		console.log(codeVerify);
		data = { code: codeVerify };
		try {
			response = await apiService.verifyCode(data);
			if (response.status === "success") {
				dispatch(setPassToken(response.authToken));
				navigation.navigate("UpdatePasswordScreen");
			} else {
				throw new Error("");
			}
		} catch (error) {
			Alert.alert("Invalid Code");
		}
		//setCodeVerify("");
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
						<Text style={styles.header}>Verify Email</Text>
						<Text style={styles.description}>
							A 10-digit verification code has been sent to the email registered
							with this account. Enter the verification code below.
						</Text>
						<CustomTextInput
							typeTitle="Verification Code"
							onPress={codeVerifyHandler}
							maxLength={10}
							value={codeVerify}
							keyboardType="default"
							helperText="Incorrect verfication code."
							secureTextEntry={false}
						/>
						<Pressable
							onPress={confirmChangesHandler}
							style={styles.buttonStyles}
						>
							<Text style={styles.buttonText}>Verify</Text>
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

export default VerifyEmailScreen;
