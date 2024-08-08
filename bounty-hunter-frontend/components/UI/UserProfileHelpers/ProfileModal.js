import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
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

                    <Pressable onPress={onYes}>
                        <Text style={styles.buttonText}>
                            Choose from Gallery
                        </Text>
                    </Pressable>

                    <Pressable onPress={onNo}>
                        <Text style={styles.buttonText}>
                            Remove Profile Photo
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: GLOBAL_STYLES.colors.gray500,
        display: "flex",
    },
    modalStyle: {
        height: "25%",
        width: "100%",
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
		padding: 30,
    },
})

export default ProfileModal;