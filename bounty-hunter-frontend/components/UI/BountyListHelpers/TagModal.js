import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useState } from "react";
import { GLOBAL_STYLES } from "../../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import AddTagScreen from "./AddTagScreen";
import ScrollViewHelper from "../ScrollViewHelper";



function TagModal({ isVisible, onClose, currTags }) {
    const [tagsList, setTagsList] = useState(currTags);

    function updateTagList(tags) {
        setTagsList(tags)
    }

	return (
		<Modal visible={isVisible} transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalStyle}>
                    <Pressable onPress={() => onClose(tagsList)}>
						<Ionicons
							name="chevron-back"
							size={24}
							color={GLOBAL_STYLES.colors.brown700}
							style={{ marginBottom: 10 }}
						/>
					</Pressable>
                    <ScrollViewHelper backgroundColor={{backgroundColor: GLOBAL_STYLES.colors.brown300}}>
                        <AddTagScreen 
                            currTags={tagsList}
                            tagsUpdateHandler={updateTagList}
                        />
                    </ScrollViewHelper>
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
		height: "60%",
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
});

export default TagModal;
