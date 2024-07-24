import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { GLOBAL_STYLES } from '../../constants/styles';

import { Ionicons } from '@expo/vector-icons';

function WishlistAdd({ isVisible, onYes, onNo, onClose }) {
    const [nameText, onChangeNameText] = React.useState('');

    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalStyle}>
                    <View>
                        <Pressable onPress={onNo}>
                            <Ionicons name="chevron-back" size={24} color={GLOBAL_STYLES.colors.brown700}/>
                        </Pressable>
                    </View>

                    <View style={{borderBottomWidth: 2, borderColor: GLOBAL_STYLES.colors.brown700, paddingBottom: 10, marginTop: 10,}}>
                        <Text style={styles.titleText}>Add Item</Text>
                    </View>

                    <View style={{marginTop: 15,}}>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={styles.headerText}>Name </Text>
                            <Text style={[styles.headerText, {color: GLOBAL_STYLES.colors.blue700}]}>*</Text>
                        </View>

                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangeNameText}
                            value={nameText}
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
        backgroundColor: GLOBAL_STYLES.colors.gray500,
        display: 'flex',
    },
    modalStyle: {
        height: '75%',
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
    headerText: {
        fontSize: 17,
        fontFamily: 'BaiJamjuree-SemiBold',
        color: GLOBAL_STYLES.colors.orange700,
    },
})

export default WishlistAdd;