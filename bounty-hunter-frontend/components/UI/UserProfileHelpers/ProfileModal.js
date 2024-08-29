import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../../../constants/styles";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ProfileModal({ isVisible, onYes, onNo, onClose }) {
	return (
		<Modal visible={isVisible} transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalStyle}>
					<Pressable onPress={onClose}>
						<Ionicons
							name="chevron-back"
							size={24}
							color={GLOBAL_STYLES.colors.brown700}
							style={{ marginBottom: 10 }}
						/>
					</Pressable>

					<View
						style={{
							borderBottomWidth: 2,
							borderColor: GLOBAL_STYLES.colors.brown700,
							paddingBottom: 5,
							marginTop: 10,
						}}
					>
						<Text style={styles.titleText}>Edit Profile Photo</Text>
					</View>

					<Pressable onPress={onYes}>
						<Text style={[styles.buttonText, { marginTop: 20 }]}>
							Choose from Gallery
						</Text>
					</Pressable>

					<Pressable onPress={onNo}>
						<Text
							style={[
								styles.buttonText,
								{ color: GLOBAL_STYLES.colors.orange700 },
							]}
						>
							Remove Profile Photo
						</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: GLOBAL_STYLES.colors.gray500,
		display: "flex",
	},
	modalStyle: {
		height: "30%",
		width: "100%",
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
		padding: 30,
	},
	titleText: {
		fontSize: 20,
		fontFamily: "BaiJamjuree-Medium",
		color: GLOBAL_STYLES.colors.brown700,
	},
	buttonText: {
		fontFamily: "BaiJamjuree-Regular",
		fontSize: 17,
		color: GLOBAL_STYLES.colors.brown700,
		marginBottom: 10,
	},
});

export default ProfileModal;
