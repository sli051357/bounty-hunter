import { KeyboardAvoidingView, ScrollView } from "react-native";

function ScrollViewHelper({ children, backgroundColor }) {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
			behavior="padding"
			keyboardVerticalOffset={100}
		>
			<ScrollView style={{ flex: 1, backgroundColor: backgroundColor }}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default ScrollViewHelper;
