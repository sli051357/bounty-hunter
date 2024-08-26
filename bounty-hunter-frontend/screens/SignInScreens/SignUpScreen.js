import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../store/authToken";
import { setUsername } from "../../store/username";

import apiService from "../../api/apiRequest";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay";
import Button from "../../components/UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";

function SignUpScreen() {
	const [createUser, setCreateUser] = useState({
		username: "",
		email: "",
		password: "",
		"confirm password": "",
	});
	const [error, setError] = useState({
		usernameIsInvalid: false,
		emailIsInvalid: false,
		passwordIsInvalid: false,
		confirmPasswordIsInvalid: false,
	});
	const [isAuthenticateing, setIsAuthenticating] = useState(false);
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();

	function createUserChangeHandler(text, type) {
		setCreateUser((prevState) => ({
			...prevState,
			[type]: text,
		}));
	}

	async function confirmChangesHandler() {
		setCreateUser((prevState) => ({
			...prevState,
			email: prevState.email.trim(),
		}));
		const usernameIsValid =
			createUser.username.length >= 6 && createUser.username.length < 15;
		const emailIsInValid = createUser.email.includes("@");
		const passwordIsValid =
			createUser.password.length >= 8 &&
			createUser.password.length < 23 &&
			!createUser.password.includes(" ");
		const confirmPasswordIsValid =
			createUser["confirm password"] === createUser.password && passwordIsValid;
		// console.log(createUser);
		if (
			!emailIsInValid ||
			!usernameIsValid ||
			!passwordIsValid ||
			!confirmPasswordIsValid
		) {
			setError({
				usernameIsInvalid: !usernameIsValid,
				emailIsInvalid: !emailIsInValid,
				passwordIsInvalid: !passwordIsValid,
				confirmPasswordIsInvalid: !confirmPasswordIsValid,
			});
			Alert.alert("Invalid Input", "Please check your inputs.");
			return;
		}
		signUpHandler({
			username: createUser.username,
			email: createUser.email,
			password: createUser.password,
		});
	}

	// need to redirect to sign in screen due to email verification
	// Turn this into async function when axios is added
	async function signUpHandler(formData) {
		//setIsAuthenticating(true);
		//need to verify email before signing in
		setIsAuthenticating(true);
		try {
			const data = {
				username: formData.username,
				password: formData.password,
				email: formData.email,
			};
			const response = await apiService.signUp(data);
			if (response.status === "fail") {
				console.log("returned fail");
				throw new Error("signup failed");
			}
			setIsAuthenticating(false);
			Alert.alert(
				"Click on the Link sent to your email to activate your account.",
			);
			// Will Set up Axios Sign Up later
			// const token = await apiService.createUser(formData);
			// dispatch(setAuthToken(token))
			// dispatch(setUsername(formData.username))
			//console.log(formData.username);
			//dispatch(setUsername(formData.username));
			//dispatch(setAuthToken("IsVerified"));
		} catch (error) {
			console.log(error);
			Alert.alert("Sign Up Failed", "Try again later");
			// console.log(error);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticateing) {
		return (
			<>
				<LinearGradient
					colors={[
						GLOBAL_STYLES.colors.orange300,
						GLOBAL_STYLES.colors.blue300,
					]}
					style={styles.background}
				/>
				<LoadingOverlay message="Creating user..." />
			</>
		);
	}

	return (
		<>
			<LinearGradient
				colors={[GLOBAL_STYLES.colors.brown300, GLOBAL_STYLES.colors.orange300]}
				style={styles.background}
			/>
			<View style={{ flex: 1, marginTop: insets.top }}>
				<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.page}>
					<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
						<View style={[styles.page]}>
							<View style={styles.container}>
								<Text style={styles.header}>Create Account</Text>
								<CustomTextInput
									typeTitle="username"
									onPress={createUserChangeHandler}
									maxLength={12}
									value={createUser.username}
									keyboardType="default"
									helperText="Username has to be between 6-14 characters!"
									secureTextEntry={false}
									isInValid={error.usernameIsInvalid}
								/>
								<CustomTextInput
									typeTitle="email"
									onPress={createUserChangeHandler}
									maxLength={64}
									value={createUser.email}
									keyboardType="email"
									helperText={error.emailIsInvalid && "Enter a Valid Email"}
									secureTextEntry={false}
									isInValid={error.emailIsInvalid}
								/>
								<CustomTextInput
									typeTitle="password"
									onPress={createUserChangeHandler}
									maxLength={18}
									value={createUser.password}
									keyboardType="default"
									helperText="Password must be between 8-22 charcters. No spaces!"
									secureTextEntry={true}
									isInValid={error.passwordIsInvalid}
								/>
								<CustomTextInput
									typeTitle="confirm password"
									onPress={createUserChangeHandler}
									maxLength={18}
									value={createUser["confirm password"]}
									keyboardType="default"
									helperText={
										error.confirmPasswordIsInvalid &&
										"Make sure passwords match!"
									}
									secureTextEntry={true}
									isInValid={error.confirmPasswordIsInvalid}
								/>
								{/* <Button
									title="Sign Up"
									onPress={confirmChangesHandler}
									buttonStyles={styles.buttonStyles}
									containerStyle={{ alignSelf: "center" }}
								/> */}
								<Pressable
									onPress={confirmChangesHandler}
									style={styles.buttonStyles}
								>
									<Text style={styles.buttonText}>Sign Up</Text>
								</Pressable>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
		justifyContent: "center",
		gap: 12,
		padding: 12,
		marginHorizontal: "5%",
		width: "90%",
	},
	header: {
		textAlign: "center",
		fontSize: 32,
		color: GLOBAL_STYLES.colors.orange700,
		// fontWeight: "900",
		alignSelf: "center",
		fontFamily: 'BaiJamjuree-Bold',
	},
	buttonStyles: {
		borderRadius: 6,
		paddingHorizontal: 32,
		paddingVertical: 8,
		backgroundColor: GLOBAL_STYLES.colors.blue300,
		alignSelf: 'center',
		marginTop: 10,
	},
	buttonText: {
		fontFamily: 'BaiJamjuree-Medium',
		color: GLOBAL_STYLES.colors.brown300,
		fontSize: 20,
	},
});

export default SignUpScreen;
