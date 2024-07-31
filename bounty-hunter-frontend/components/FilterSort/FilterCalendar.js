import { Modal, View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';

import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../../constants/styles';
import { Ionicons } from '@expo/vector-icons';

export default function FilterCalendar({ isVisible, theDate, setTheDate, isStart, onClose }) {
    const [date, setDate] = useState(dayjs());

    function returnDate() {
        onClose();
    }

    return (

        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalStyle}>
                    <Pressable onPress={returnDate}>
                        <Ionicons name="chevron-back" size={24} color={GLOBAL_STYLES.colors.brown700} style={{marginBottom: 10}} />
                    </Pressable>

                    <View style={{borderBottomWidth: 2, borderColor: GLOBAL_STYLES.colors.brown700, paddingBottom: 5, marginVertical: 10,}}>
                        <Text style={styles.titleText}>Select Start Date</Text>
                    </View>

                    <View style={{marginTop: 30, }}>
                        <DateTimePicker
                            mode="single"
                            date={date}
                            onChange={(params) => setDate(params.date)}
                        />
                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    modalStyle: {
        height: '60%',
        width: '100%',
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
        padding: 30,
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'BaiJamjuree-Medium',
        color: GLOBAL_STYLES.colors.brown700,
    }
})