import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import dayjs from "dayjs";
import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { DateType } from "react-native-ui-datepicker";

import { Ionicons } from "@expo/vector-icons";
import { GLOBAL_STYLES } from "../../constants/styles";

export default function FilterCalendar({
	isVisible,
	date,
	setDate,
	isStart,
	onClose,
}) {
	// const [date, setDate] = useState(dayjs());
	// const [range, setRange] = React.useState<{
	//     startDate: DateType,
	//     endDate: DateType,
	//   }>({ startDate: undefined, endDate: undefined });

	function returnDate() {
		onClose();
	}

	return (
		<Modal visible={isVisible} transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalStyle}>
					<Pressable onPress={returnDate}>
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
							marginVertical: 10,
						}}
					>
						{isStart ? (
							<Text style={styles.titleText}>Select Start Date</Text>
						) : (
							<Text style={styles.titleText}>Select End Date</Text>
						)}
					</View>

					<View style={{ marginTop: 30 }}>
						<DateTimePicker
							mode="single"
							date={date}
							onChange={(params) => setDate(params.date)}
							calendarTextStyle={styles.calendarText}
							selectedTextStyle={styles.selectedText}
							selectedItemColor={GLOBAL_STYLES.colors.orange700}
							headerTextStyle={styles.calendarHeader}
							headerButtonColor={GLOBAL_STYLES.colors.orange700}
							headerButtonsPosition="around"
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		width: "100%",
		height: "100%",
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
	calendarText: {
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 19,
	},
	selectedText: {
		fontFamily: "BaiJamjuree-Medium",
		color: GLOBAL_STYLES.colors.brown300,
		fontSize: 19,
	},
	calendarHeader: {
		fontFamily: "BaiJamjuree-Medium",
		fontSize: 19,
		color: GLOBAL_STYLES.colors.brown700,
	},
});
