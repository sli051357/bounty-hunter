import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";

import { GLOBAL_STYLES } from "../constants/styles";
import { DUMMY_FRIEND_PROFILE, DUMMY_FRIEND_INFO, DUMMY_FAVORS_OF_FRIEND } from '../util/dummy-friend-data.js';
import FavorCard from "../components/FavorCard.js";
import IconButton from "../components/UI/IconButton.js";
import { AntDesign } from '@expo/vector-icons';

/*
    Implementation Details:

    - 'friend' prop is the required information of the other user.
    Refer to DUMMY_USER_
    


*/ 

function FriendProfileScreen({ friend }){
    const [ favorite, setFavorite ] = useState(false);

    function editFavoriteStatus() {
        setFavorite((curr) => !curr);
    }

    return(
        <ScrollView style={styles.page}>
            <View style={[styles.userMainDetails, styles.viewSpacing]}>

                {/* Username Area */}
                <View style={styles.userMainDetailsView}>
                    {/* Profile */}
                    <Image style={styles.profilePicture} source={require('../assets/batman.jpeg')}/>
                    <View>
                        <Text style={styles.userDetailsText}>Nickname</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {/* ID */}
                            <Text style={[styles.text, {marginRight: 10, marginTop: 2}]}>ID: Extra ID</Text>
                            {/* Favorite Button (Changes based on status) */}
                            <Pressable onPress={(editFavoriteStatus)}>
                                {favorite ? (
                                    <AntDesign name="staro" size={24} color={GLOBAL_STYLES.colors.orange300} />
                                ) : (
                                    <AntDesign name="star" size={24} color={GLOBAL_STYLES.colors.orange700} />
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Large Stats Area */}
                <View style={styles.userMainDetailsView}>
                    <View>
                        <Text style={styles.userDetailsText}>###</Text>
                        <Text style={styles.lightText}>rating</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailsText}>###</Text>
                        <Text style={styles.lightText}>friends</Text>
                    </View>
                </View>
                <View style={[styles.userMainDetailsView]}>
                    <View><Text style={styles.userDetailsText}>##</Text>
                    <Text style={styles.lightText}>net balance over # bounties</Text></View>
                </View>

                {/* Create Bounty Button */}
                {/* Shold switch to create bounty, currently only console logs*/}
                <View style={styles.userMainDetailsView}>
                    <Pressable 
                        onPress={() => {console.log('create bounty')}}
                        style={styles.blueButton}
                    >
                        <Text style={styles.buttonText}>CREATE BOUNTY</Text>
                    </Pressable>
                </View>

                {/* Extra Stats Section */}
                <View style={styles.viewSpacing}>
                    <Text style={styles.subtitle}>Stats</Text>
                    <View style={styles.userMainDetailsView}>
                        <View>
                            <Text style={[styles.text, {fontSize: 14}]}># bounties completed</Text>
                            <Text style={[styles.text, {fontSize: 14}]}># bounties owed by you</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>$ settled by you</Text>
                        </View>

                        <View>
                            <Text style={[styles.text, {fontSize: 14}]}># bounties completed</Text>
                            <Text style={[styles.text, {fontSize: 14}]}># bounties owed by you</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>$ settled by you</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '10%',
        paddingTop: 16,
    },
    viewSpacing: {
        marginBottom: 12
    },
    text: {
        color: GLOBAL_STYLES.colors.brown700,
        fontSize: 18,
        fontFamily: 'BaiJamjuree-Regular',
    },
    lightText: {
        color: GLOBAL_STYLES.colors.orange300,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'BaiJamjuree-Regular',
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40 
    },
    userMainDetails: {
        flex: 1,
        gap: 6,
    },
    userMainDetailsView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'gray',
    },
    userDetailsText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: -15,
        backgroundColor: 'white',
    },
    editBox: {
        borderColor: GLOBAL_STYLES.colors.orange700,
        borderRadius: 8,
        padding: 4,
        borderWidth: 2
    },
    subtitle: {
        fontSize: 28,
        fontFamily: 'BaiJamjuree-Bold',
        color: GLOBAL_STYLES.colors.orange700
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterContainerPressable: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 6
    },
    filterText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: GLOBAL_STYLES.colors.blue300
    },
    blueButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: GLOBAL_STYLES.colors.blue300,
        borderRadius: 5,     
        alignItems: 'center',
        justifyContent: 'center',   
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: GLOBAL_STYLES.colors.brown300,
        fontSize: 20,
        fontFamily: 'BaiJamjuree-Bold',
    },
})
export default FriendProfileScreen;