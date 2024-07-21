import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles.js';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { AntDesign } from '@expo/vector-icons';

function SearchBar() {
    const [ button1, setButton1 ] = useState(true);
    const [ button2, setButton2 ] = useState(false);
    const [ button3, setButton3 ] = useState(false);
    
    function clickButton1() {
        setButton1(true);
        setButton2(false);
        setButton3(false);
        console.log('button 1 pressed');
    }

    function clickButton2() {
        setButton1(false);
        setButton2(true);
        setButton3(false);
        console.log('button 2 pressed');
    }

    function clickButton3() {
        setButton1(false);
        setButton2(false);
        setButton3(true);
        console.log('button 3 pressed');
    }

    return (
        <View style={styles.barContainer}>
            <Pressable onPress={(clickButton1)} style={{width: '25%'}}>
                {button1 ? (
                    <View style={[styles.button, {backgroundColor: GLOBAL_STYLES.colors.orange700}]}>
                        <Text style={styles.buttonText}>All ({DUMMY_USER_PROFILE.friends.length})</Text>
                    </View>
                ) : (
                    <View style={[styles.button]}>
                        <Text style={styles.buttonText}>All</Text>
                    </View>
                )}
            </Pressable>

            <Pressable onPress={(clickButton2)} style={{width: '37.5%'}}>
                {button2 ? (
                    <View style={[styles.button, {backgroundColor: GLOBAL_STYLES.colors.orange700}]}>
                        <Text style={styles.buttonText}>Favorites (##)</Text>
                    </View>
                ) : (
                    <View style={[styles.button]}>
                        <Text style={styles.buttonText}>Favorites</Text>
                    </View>
                )}
            </Pressable>

            <Pressable onPress={(clickButton3)} style={{width: '37.5%'}}>
                {button3 ? (
                    <View style={[styles.button, {backgroundColor: GLOBAL_STYLES.colors.orange700}]}>
                        <Text style={styles.buttonText}>Requests (##)</Text>
                    </View>
                ) : (
                    <View style={[styles.button]}>
                        <Text style={styles.buttonText}>Requests</Text>
                    </View>
                )}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: GLOBAL_STYLES.colors.orange300,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    button: {
        backgroundColor: GLOBAL_STYLES.colors.orange300,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'BaiJamjuree-Medium',
        fontSize: 17,
        color: GLOBAL_STYLES.colors.brown300,

    }
})

export default SearchBar;