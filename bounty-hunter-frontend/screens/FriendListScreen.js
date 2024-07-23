import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar'
import CategoryBar from '../components/CategoryBar';
import FriendCard from '../components/FriendCard'

function FriendListScreen() {
    const [curScreen, setCurScreen] = useState(1);
    const [search, setSearch] = useState(false);

    function setSearchStatus() {
        setSearch((curr) => !curr);
        if (search == true) {
            setCurScreen(4);
        } else {
            setCurScreen(1);
        }
    }

    let content;

    // Friend List
    if (curScreen == 1) {
        content = 
        
        <View>
            <CategoryBar stateChanger={setCurScreen} list1={DUMMY_USER_PROFILE.friends} list2={DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true))} list3={[1, 2]}/>
               
            {DUMMY_USER_PROFILE.friends.map((friend) => <FriendCard key={friend.nickname} friend={friend} imagePath = {require('../assets/batman.jpeg')} />)}
        </View>

    // Favorite Friends
    } else if (curScreen == 2) {
        // newFriends = DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true));
        
        content = 
        <View>
            <CategoryBar stateChanger={setCurScreen} list1={DUMMY_USER_PROFILE.friends} list2={DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true))} list3={[1, 2]}/>

            {DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true)).map((friend) => <FriendCard key={friend.nickname} friend={friend} imagePath = {require('../assets/batman.jpeg')} />)}
        </View>

    // Requests
    } else if (curScreen == 3) {
        content = 
        <View>
            <CategoryBar stateChanger={setCurScreen} list1={DUMMY_USER_PROFILE.friends} list2={DUMMY_USER_PROFILE.friends.filter((friend) => (friend.fav == true))} list3={[1, 2]}/>
        </View>

    // Friend Search -  replace with actual search function
    } else {
        content = 
        <View>
            <SearchBar />
        </View>
    }

    return (
        <ScrollView style={styles.page}>
            <View>
                <Text style={styles.headerText}>Friends</Text>
            </View>

            <View>
                <Pressable onPress={setSearchStatus} style={styles.button}>
                    {search ? (
                        <MaterialIcons name="person-add-alt" size={16} color={GLOBAL_STYLES.colors.brown300}/>
                    ) : (
                        <Ionicons name="return-down-back" size={16} color={GLOBAL_STYLES.colors.brown300} />
                    )}
                </Pressable>
            </View>

            <View>
                {content}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: 50,
    },
    headerText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center',
        marginBottom: -15,
    },
    button: {
        backgroundColor: GLOBAL_STYLES.colors.brown700,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginBottom: 5,
        marginRight: 10,
    }
})

export default FriendListScreen;