import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useDispatch } from "react-redux";

import Button from "../../components/UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";
import { setAuthToken } from "../../store/authToken";

function ReturnLoginScreen() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	function returnToLoginHandler() {
		navigation.navigate("LoginScreen");
	}

	return (
		<>
			<LinearGradient
				colors={[GLOBAL_STYLES.colors.brown300, GLOBAL_STYLES.colors.orange300]}
				style={styles.background}
			/>
			<View style={styles.page}>
				<Text style={styles.header}>Password Updated!</Text>

				<Pressable
					onPress={returnToLoginHandler}
					style={styles.buttonStyles}
				>
					<Text style={styles.buttonText}>Return to Login</Text>
				</Pressable>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		minWidth: "80%",
		gap: 28,
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
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: "100%",
	},
});

export default ReturnLoginScreen;
