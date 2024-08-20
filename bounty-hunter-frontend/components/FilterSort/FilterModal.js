import React, { useState } from "react";
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { GLOBAL_STYLES } from "../../constants/styles";

import { Ionicons } from "@expo/vector-icons";

import FilterCalendar from "./FilterCalendar";
import FilterItem from "./FilterItem";
import FilterSlider from "./FilterSlider";

import dayjs from "dayjs";

function FilterModal({ isVisible, onClose, currFilters }) {
	const [isCalendarVisible, setIsCalendarVisible] = useState(false);
	const [isStart, setIsStart] = useState(false);

	const [startDate, setStartDate] = useState(dayjs(currFilters.start_date));
	const [endDate, setEndDate] = useState(dayjs(currFilters.end_date));
	const [statusFilters, setStatusFilters] = useState(currFilters.status);
	const [startPrice, setStartPrice] = useState(currFilters.price_low);
	const [endPrice, setEndPrice] = useState(
		currFilters.price_high === 999999.99 ? 1000 : currFilters.price_high,
	);
	const [tags, setTags] = useState(currFilters.tags);
	//console.log(statusFilters)

	const statusList = ["Sent", "Received", "Incomplete", "Completed"];
	const tagList = ["Travel", "Food", "Friends", "Shopping", "Custom"];

	let content;

	// conditionally renders calendar modal
	if (isStart) {
		content = (
			<FilterCalendar
				isVisible={isCalendarVisible}
				onClose={updateStartDate}
				date={startDate}
				setDate={setStartDate}
				isStart={true}
			/>
		);
	} else {
		content = (
			<FilterCalendar
				isVisible={isCalendarVisible}
				onClose={updateEndDate}
				date={endDate}
				setDate={setEndDate}
				isStart={false}
			/>
		);
	}

	function setAllFilters() {
		onClose({
			query: "and",
			tags: tags,
			status: statusFilters,
			start_date: dayjs(startDate).isBefore(dayjs(endDate))
				? dayjs(startDate).format("YYYY-MM-DD")
				: dayjs(endDate).format("YYYY-MM-DD"),
			end_date: dayjs(endDate).format("YYYY-MM-DD"),
			price_low: startPrice,
			price_high: endPrice === 1000 ? 999999.99 : endPrice,
		});
	}

	function editStartDate() {
		setIsStart(true);
		setIsCalendarVisible(true);
	}

	function updateStartDate() {
		setIsCalendarVisible(false);
	}

	function editEndDate() {
		setIsStart(false);
		setIsCalendarVisible(true);
	}

	function updateEndDate() {
		setIsCalendarVisible(false);
	}

	function updateActiveStatusFilters(filter) {
		if (!statusFilters.includes(filter)) {
			setStatusFilters((prev) => [...prev, filter]);
		} else {
			setStatusFilters((prev) => prev.filter((f) => f !== filter));
		}
	}
	function updateActiveTags(tag) {
		if (!tags.includes(tag)) {
			setTags((prev) => [...prev, tag]);
		} else {
			setTags((prev) => prev.filter((t) => t !== tag));
		}
	}
	function updatePrices(prices) {
		setStartPrice(prices[0]);
		setEndPrice(prices[1]);
	}

	return (
		<Modal visible={isVisible} transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalStyle}>
					<Pressable onPress={setAllFilters}>
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
						<Text style={styles.titleText}>Filter By</Text>
					</View>

					<ScrollView>
						{/* By Status */}
						<View style={{ marginTop: 10 }}>
							<Text style={styles.subText}>Status</Text>

							<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
								{statusList.map((status) => (
									<FilterItem
										key={status}
										name={status}
										active={statusFilters.includes(status)}
										onPress={updateActiveStatusFilters}
									/>
								))}
							</View>
						</View>

						{/* By Tag */}
						<View style={{ marginTop: 10 }}>
							<Text style={styles.subText}>Tags</Text>

							<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
								{tagList.map((tag) => (
									<FilterItem
										key={tag}
										name={tag}
										active={tags.includes(tag)}
										onPress={updateActiveTags}
									/>
								))}
							</View>
						</View>

						{/* Price */}
						<View style={{ marginTop: 10 }}>
							<Text style={styles.subText}>Price</Text>

							{/* Change to be actual values */}
							<FilterSlider
								minPrice={startPrice}
								maxPrice={endPrice}
								onPress={updatePrices}
							/>
						</View>

						{/* Date */}
						<View style={{ marginTop: 10 }}>
							<Text style={styles.subText}>Date</Text>

							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<View style={{ width: "45%" }}>
									<Text style={styles.normText}>From:</Text>
									<Pressable onPress={editStartDate} style={styles.dateButton}>
										<Text style={styles.normText}>
											{dayjs(startDate).format("MMM DD, YYYY")}
										</Text>
									</Pressable>
								</View>

								<View style={{ width: "45%", marginLeft: "auto" }}>
									<Text style={styles.normText}>To:</Text>
									<Pressable onPress={editEndDate} style={styles.dateButton}>
										<Text style={styles.normText}>
											{dayjs(endDate).format("MMM DD, YYYY")}
										</Text>
									</Pressable>
								</View>
							</View>
						</View>
					</ScrollView>

					<View>{content}</View>
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
	subText: {
		fontSize: 17,
		fontFamily: "BaiJamjuree-Medium",
		color: GLOBAL_STYLES.colors.orange700,
	},
	normText: {
		fontSize: 17,
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
	},
	dateButton: {
		backgroundColor: GLOBAL_STYLES.colors.yellow300,
		justifyContent: "center",
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 5,
	},
});

export default FilterModal;
