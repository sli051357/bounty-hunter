import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles.js';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { Ionicons } from '@expo/vector-icons';


{/*
    No real usability, only visual effects right now
*/}
function SearchBar() {
    const [text, onChangeText] = React.useState('');
    
    return (
        <View style={styles.barContainer}>
            <Ionicons name="search-circle-outline" size={24} style={styles.searchIcon} />

            <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search..."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: GLOBAL_STYLES.colors.orange100,
        margin: 5,
        alignItems: 'center',
        borderRadius: 100,
    }, 
    searchIcon: {
        color: GLOBAL_STYLES.colors.brown700,
        marginLeft: 5,
        marginRight: 5,
    },
    textInput: {
        fontFamily: 'BaiJamjuree-Medium',
        fontSize: 14,
    }
})

export default SearchBar