import { StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../../constants/styles";

function ChangePasswordSettings({
	typeTitle,
	onPress,
	maxLength,
	value,
	keyboardType,
	helperText,
	secureTextEntry,
	isInValid,
}) {
	return (
		<View style={styles.container}>
			<Text style={[styles.label, isInValid && styles.textIsInvalid]}>
				{typeTitle.toUpperCase()}
			</Text>
			<TextInput
				onChangeText={(text) => onPress(text, typeTitle)}
				numberOfLines={1}
				maxLength={maxLength}
				value={value}
				keyboardType={keyboardType}
				style={[styles.textInput, isInValid && styles.inputIsInValid]}
				secureTextEntry={secureTextEntry}
			/>
			<Text style={styles.helperText}>{helperText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "stretch",
		gap: 4,
	},
	label: {
		fontSize: 16,
		textAlign: "left",
		color: GLOBAL_STYLES.colors.brown700,
		fontFamily: "BaiJamjuree-Medium",
	},
	textInput: {
		fontSize: 16,
		borderRadius: 8,
		borderColor: GLOBAL_STYLES.colors.brown700,
		color: GLOBAL_STYLES.colors.brown700,
		padding: 4,
		paddingHorizontal: 8,
		borderWidth: 1.5,
		maxWidth: "100%",
		overflow: "hidden",
	},
	helperText: {
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
		fontFamily: "BaiJamjuree-Regular",
	},
	textIsInvalid: {
		color: GLOBAL_STYLES.colors.error700,
	},
	inputIsInValid: {
		borderColor: GLOBAL_STYLES.colors.error300,
	},
});

export default ChangePasswordSettings;
