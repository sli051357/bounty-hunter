import { Modal, View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { GLOBAL_STYLES } from '../../constants/styles';

import SortItem from './SortItem';

import { Ionicons } from '@expo/vector-icons';

function SortModal({ isVisible, onClose, sortList }) {
    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalStyle}>
                    <Pressable onPress={onClose}>
                        <Ionicons name="chevron-back" size={24} color={GLOBAL_STYLES.colors.brown700} style={{marginBottom: 10}} />
                    </Pressable>

                    <View style={{borderBottomWidth: 2, borderColor: GLOBAL_STYLES.colors.brown700, paddingBottom: 10, marginTop: 10,}}>
                        <Text style={styles.titleText}>Sort By</Text>
                    </View>

                    <ScrollView style={{marginTop: 10,}}>
                        {sortList.map((sort) => <SortItem key={sort.name} name={sort.name} active={sort.active} /> )}
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
        height: '50%',
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

export default SortModal;