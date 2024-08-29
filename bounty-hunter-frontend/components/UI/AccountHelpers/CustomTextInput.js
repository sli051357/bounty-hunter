import { StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../../constants/styles";

function CustomTextInput({
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
		// fontWeight: "bold",
		textAlign: "left",
		color: GLOBAL_STYLES.colors.brown700,
		fontFamily: "BaiJamjuree-SemiBold",
	},
	textInput: {
		fontSize: 16,
		borderRadius: 12,
		borderColor: GLOBAL_STYLES.colors.brown700,
		color: GLOBAL_STYLES.colors.brown700,
		padding: 4,
		paddingHorizontal: 8,
		borderWidth: 1.5,
		maxWidth: "100%",
		overflow: "hidden",
		fontFamily: 'BaiJamjuree-Regular',
	},
	helperText: {
		fontSize: 12,
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
		fontFamily: 'BaiJamjuree-Regular',
	},
	textIsInvalid: {
		color: GLOBAL_STYLES.colors.brown700,
	},
	inputIsInValid: {
		borderColor: GLOBAL_STYLES.colors.orange700,
		borderWidth: 2,
	},
});

export default CustomTextInput;
