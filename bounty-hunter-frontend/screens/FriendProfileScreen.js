import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";

import { GLOBAL_STYLES } from "../constants/styles";
import { DUMMY_FRIEND_PROFILE, DUMMY_FRIEND_INFO, DUMMY_FAVORS_OF_FRIEND } from '../util/dummy-friend-data.js';
import FavorCard from "../components/FavorCard.js";
import IconButton from "../components/UI/IconButton.js";
import { AntDesign } from '@expo/vector-icons';
import TitleWithButton from "../components/UI/TitleWithButton.js";
import PaymentMethod from "../components/UI/UserProfileHelpers/PaymentMethod.js"

/*
    Implementation Details:

    - 'friend' prop is the required information of the other user.
    Refer to DUMMY_USER_
    


*/ 

function FriendProfileScreen({ friend }){
    const [ favorite, setFavorite ] = useState(DUMMY_FRIEND_INFO.favoriteStatus);

    function editFavoriteStatus() {
        setFavorite((curr) => !curr);
    }

    let payments = 
    <>
        
    </>;

    return(
        <ScrollView style={styles.page}>
            <View style={[styles.userMainDetails, styles.viewSpacing]}>

                {/* Username Area */}
                <View style={styles.userMainDetailsView}>
                    {/* Profile */}
                    <Image style={styles.profilePicture} source={require('../assets/batman.jpeg')}/>
                    <View>
                        <Text style={styles.userDetailsText}>{DUMMY_FRIEND_INFO.nickname}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {/* ID */}
                            <Text style={[styles.text, {marginRight: 10, marginTop: 2}]}>ID: {DUMMY_FRIEND_PROFILE.ID}</Text>
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
                        <Text style={styles.userDetailsText}>{DUMMY_FRIEND_PROFILE.rating}</Text>
                        <Text style={styles.lightText}>rating</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailsText}>{DUMMY_FRIEND_PROFILE.friends.length}</Text>
                        <Text style={styles.lightText}>friends</Text>
                    </View>
                </View>
                <View style={[styles.userMainDetailsView]}>
                    <View><Text style={styles.userDetailsText}>${DUMMY_FRIEND_INFO.owedByYou + DUMMY_FRIEND_INFO.owedByThem}</Text>
                    <Text style={styles.lightText}>net balance over {DUMMY_FRIEND_INFO.bountiesCompleted + DUMMY_FRIEND_INFO.bountiesProgress} bounties</Text></View>
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
                    <Text style={[styles.subtitle, {textAlign: 'center'}]}>Stats</Text>
                    <View style={styles.userMainDetailsView}>
                        <View>
                            <Text style={[styles.text, {fontSize: 14}]}>{DUMMY_FRIEND_INFO.bountiesCompleted} bounties completed</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>{DUMMY_FRIEND_INFO.bountiesByYou} bounties owed by you</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>${DUMMY_FRIEND_INFO.settledByYou} settled by you</Text>
                        </View>

                        <View>
                            <Text style={[styles.text, {fontSize: 14}]}>{DUMMY_FRIEND_INFO.bountiesProgress} bounties in progress</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>{DUMMY_FRIEND_INFO.bountiesByThem} bounties owed to you</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>${DUMMY_FRIEND_INFO.settledByThem} settled by them</Text>
                        </View>
                    </View>
                </View>

                {/* About Me */}
                <View style={styles.viewSpacing}>
                    <Text style={styles.subtitle}>About Me</Text>
                    <Text style={styles.text}>{DUMMY_FRIEND_PROFILE.aboutMe}</Text>
                </View>

                {/* Payment Methods */}
                <View style={styles.viewSpacing}>
                    <Text style={styles.subtitle}>Payment Methods</Text>
                    <>
                        {DUMMY_FRIEND_PROFILE.paymentMethods.map((payment) => <PaymentMethod payment={payment} key={payment} icon='card-sharp' onPress={() => {}} />)}
                    </>
                </View>

                {/* Favors */}
                <View styles={styles.viewSpacing}>
                    
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
    },
    userDetailsText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: -15,
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
        color: GLOBAL_STYLES.colors.orange700,
        marginBottom: -5,
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
        marginBottom: 10,
    },
    buttonText: {
        color: GLOBAL_STYLES.colors.brown300,
        fontSize: 20,
        fontFamily: 'BaiJamjuree-Bold',
    },
})
export default FriendProfileScreen;