import { Image, StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../../../constants/styles";

export default function ProfileImage({ selectedImage }) {
	const imageSource = { uri: selectedImage };
	let content;

	if (selectedImage) {
		content = <Image source={imageSource} style={styles.image} />;
	} else {
		content = (
			<View
				style={[
					styles.image,
					{ backgroundColor: GLOBAL_STYLES.colors.orange300 },
				]}
			/>
		);
	}

	return <View>{content}</View>;
}

const styles = StyleSheet.create({
	image: {
		width: 64,
		height: 64,
		borderRadius: 32,
	},
});
