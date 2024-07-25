import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { GLOBAL_STYLES } from '../../constants/styles';

import { Ionicons } from '@expo/vector-icons';

function WishlistAdd({ isVisible, onYes, onNo, onClose }) {
    const [nameText, onChangeNameText] = React.useState('');
    const [priceText, onChangePriceText] = React.useState('');
    const [linkText, onChangeLinkText] = React.useState('');

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

                    {/* Name Input */}
                    <View style={{marginTop: 15,}}>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={styles.headerText}>Name </Text>
                            <Text style={[styles.headerText, {color: GLOBAL_STYLES.colors.blue700}]}>*</Text>
                        </View>
                        
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangeNameText}
                            value={nameText}
                            placeholder="Insert name"
                        />
                    </View>

                    {/* Price Input */}
                    <View style={{marginTop: 15,}}>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={styles.headerText}>Price </Text>
                            <Text style={[styles.headerText, {color: GLOBAL_STYLES.colors.blue700}]}>*</Text>
                        </View>
                        
                        <TextInput
                            inputMode='numeric'
                            style={styles.textInput}
                            onChangeText={onChangePriceText}
                            value={priceText}
                            placeholder="Insert price"
                        />
                    </View>

                    {/* Link/Description */}
                    <View style={{marginTop: 15,}}>
                        <Text style={styles.headerText}>Link / Description </Text>
                        
                        <TextInput
                            multiline={true}
                            style={styles.textInput}
                            onChangeText={onChangeLinkText}
                            value={linkText}
                            placeholder="Insert link/description"
                        />
                    </View>

                    {/* Photo Upload */}
                    <View style={{marginTop: 15}}>
                        <Text style={styles.headerText}>Photo</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        {/* Image Preview */}
                        <View>

                        </View>

                        {/* Buttons */}
                        <View>
                            <Pressable style={[styles.photoButton, {backgroundColor: GLOBAL_STYLES.colors.yellow300, borderColor: GLOBAL_STYLES.colors.brown700}]}>
                                <Text style={{fontSize: 14, color: GLOBAL_STYLES.colors.brown700, fontFamily: 'BaiJamjuree-Regular'}}>Upload</Text>
                            </Pressable>

                            <Pressable style={[styles.photoButton, {backgroundColor: GLOBAL_STYLES.colors.orange300, borderColor: GLOBAL_STYLES.colors.blue300,}]}>
                                <Text style={{fontSize: 14, color: GLOBAL_STYLES.colors.blue300, fontfamily: 'BaiJamjuree-Regular'}}>Remove</Text>
                            </Pressable>
                        </View>
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
    textInput: {
        fontSize: 17,
        fontFamily: 'BaiJamjuree-Regular',
        color: GLOBAL_STYLES.colors.brown700,
        borderWidth: 1.5,
        borderColor: GLOBAL_STYLES.colors.brown700,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
    },
    photoButton: {
        borderWidth: 1.5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
    }
})

export default WishlistAdd;