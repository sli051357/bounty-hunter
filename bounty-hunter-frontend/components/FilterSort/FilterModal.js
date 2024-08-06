import { Modal, View, Text, Pressable, StyleSheet, TextInput, ScrollView} from 'react-native';
import { useState } from 'react';
import { GLOBAL_STYLES } from '../../constants/styles';

import { Ionicons } from '@expo/vector-icons';

import FilterItem from './FilterItem';
import SliderExample from './FilterSlider';

function FilterModal({ isVisible, onClose, statusList, tagList }) {

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

                    </ScrollView>
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
    }
})

export default FilterModal;