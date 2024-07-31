import { Modal, View, Text, Pressable, StyleSheet, TextInput, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { GLOBAL_STYLES } from '../../constants/styles';

import { Ionicons } from '@expo/vector-icons';

import FilterItem from './FilterItem';
import SliderExample from './FilterSlider';
import FilterCalendar from './FilterCalendar';

import DateTimePicker, { DateType, ModeType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

function FilterModal({ isVisible, onClose, statusList, tagList }) {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [range, setRange] = React.useState<{
        startDate: DateType;
        endDate: DateType;
      }>({ startDate: undefined, endDate: undefined });

    function editStartDate() {
        setIsCalendarVisible(true);
    }

    function updateStartDate() {
        setIsCalendarVisible(false);
    }

    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalStyle}>
                    <Pressable onPress={onClose}>
                        <Ionicons name="chevron-back" size={24} color={GLOBAL_STYLES.colors.brown700} style={{marginBottom: 10}} />
                    </Pressable>

                    <View style={{borderBottomWidth: 2, borderColor: GLOBAL_STYLES.colors.brown700, paddingBottom: 5, marginTop: 10,}}>
                        <Text style={styles.titleText}>Filter By</Text>
                    </View>

                    <ScrollView>
                    
                    { /* By Status */ }
                    <View style={{marginTop: 10}}>
                        <Text style={styles.subText}>Status</Text>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                        {statusList.map((status) => <FilterItem key={status.name} name={status.name} active={status.active} />)}
                        </View>
                    </View>

                    { /* By Tag */ }
                    <View style={{marginTop: 10}}>
                        <Text style={styles.subText}>Tags</Text>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                        {tagList.map((tag) => <FilterItem key={tag.name} name={tag.name} active={tag.active} />)}
                        </View>
                    </View>

                    { /* Price */ }
                    <View style={{marginTop: 10}}>
                        <Text style={styles.subText}>Price</Text>

                        <SliderExample />
                    </View>

                    { /* Date */ }
                    {/* <View style={{marginTop: 10}}>
                        <Text style={styles.subText}>Date</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Text style={styles.normText}>From:</Text>
                            <Pressable onPress={(editStartDate)} style={styles.dateButton}>
                                <Text style={styles.normText}>{startDate}</Text>
                            </Pressable>
                        </View>
                    </View> */}

                    <View style={{marginTop: 10}}>
                        <Text style={styles.subText}>Date</Text>
                        <DateTimePicker
                            mode='multiple'
                            dates={dates}
                            onChange={(params) => setDates(params.dates)}
                        />
                    </View>

                    </ScrollView>
                    
                    {/* <FilterCalendar isVisible={isCalendarVisible} theDate={startDate} setTheDate={setStartDate} isStart={true} onClose={updateStartDate}/> */}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: GLOBAL_STYLES.colors.gray500,
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
    },
    subText: {
        fontSize: 17,
        fontFamily: 'BaiJamjuree-Medium',
        color: GLOBAL_STYLES.colors.orange700,
    },
    normText: {
        fontSize: 17,
        fontFamily: 'BaiJamjuree-Regular',
        color: GLOBAL_STYLES.colors.brown700,
    },
    dateButton: {
        backgroundColor: GLOBAL_STYLES.colors.yellow300,
        width: 100,
        height: 25,
        marginLeft: 10,
    }
})

export default FilterModal;