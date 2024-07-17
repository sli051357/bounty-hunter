import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";

import { GLOBAL_STYLES } from "../constants/styles";
import { DUMMY_FAVORS_OF_PROFILE, DUMMY_USER_PROFILE } from '../util/dummy-data.js';
import EditAboutMe from "../components/UI/UserProfileHelpers/EditAboutMe.js";
import EditPaymentMethods from "../components/UI/UserProfileHelpers/EditPaymentMethods.js";
import FavorCard from "../components/FavorCard.js";
import IconButton from "../components/UI/IconButton.js";
import apiService from "../api/apiRequest.js";


/*
    Implementation Details
    (Currently UI outline for personal profile, no real usability just yet)

        - 'user' prop is meant to give the needed Information of the user.
        Refer to DUMMY_USER_PROFILE for the desired information.

        - 'isPersonalProfile' prop renders page depending on if this is the user's 
        personal profile or anothers profile. If this is user's profile, then edits are allowed.
        Otherwise, then this page is for VIEWING ONLY and not suppose to be edited (bool value).
            - If true, only About Me and Payment Methods can be altered on this page.
            The user settings can control changes to USERNAME, Email, USER Picture, 
            Password, and Delete Account.
            - About me edits are to have a save or cancel button, which alters user about me
            depending on edits.
            - Payment Method changes are to have edit and save button. When adding payment method,
            a pop up will be presented to handle the payment method and type. The delete will prompt a 
            pop up that will confirm if the user wants to delete payment method. 
            - The icon for payment methods should be copy links for when user views another account.
        
        Recent Bounties should only have the bounties of the past 30 days. Filter only by 'All', 'Owed',
        'Receieved'. Sort by completed to in-progress and vice versa (no deleted bounties). Sort by date created. 


*/ 

function UserProfileScreen({ user, isPersonalProfile }){
    const [editAboutMe, setEditAboutMe] = useState(false);
    const [editPayment, setEditPayment] = useState(false);
    const [aboutMe, setAboutMe] = useState(DUMMY_USER_PROFILE.aboutMe);
    const [payments, setPayments] = useState(DUMMY_USER_PROFILE.paymentMethods);

    useEffect(() => {
        async function fetchUserData() {
            const response = await apiService.getUserProfileById('MacUser23');
            console.log(response.data);

        }
        fetchUserData();   
    })

    function editAboutMeHandler(){
        setEditAboutMe((curr) => !curr);
    }

    function changeAboutMeHandler(text) {
        setAboutMe(text);
    }

    let aboutMeSection = 
        <EditAboutMe aboutMe={aboutMe} 
        onPress={[editAboutMeHandler]} 
        isEditing={false}/>;

    if (editAboutMe){
        aboutMeSection = 
        <EditAboutMe aboutMe={aboutMe}
        onPress={[editAboutMeHandler, changeAboutMeHandler]}
        isEditing={true}/>
    }



    function editPaymentMethodHandler(){
        setEditPayment((curr) => !curr);
    }

    function deletePaymentMethod(payment) {
        setPayments((curr) => 
            curr.filter((currPayment) => 
                payment !== currPayment));
    }

    let paymentMethodSection = 
            <EditPaymentMethods onPress={[editPaymentMethodHandler]}
                isEditing={false} 
                userData={payments}/>;

    if (editPayment) {
        paymentMethodSection = 
                <EditPaymentMethods 
                onPress={[editPaymentMethodHandler, deletePaymentMethod]}
                isEditing={true} 
                userData={payments}
                />;
    }

    return (
        <ScrollView style={styles.page}>
            <View style={[styles.userMainDetails, styles.viewSpacing]}> 
                <View style={styles.userMainDetailsView}>
                    <Image style={styles.profilePicture} source={require('../assets/batman.jpeg')}/>
                    <View>
                        <Text style={styles.userDetailsText}>{DUMMY_USER_PROFILE.username}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>ID: {DUMMY_USER_PROFILE.ID}</Text>
                    </View>
                </View>
                <View style={styles.userMainDetailsView}>
                    <View>
                        <Text style={styles.userDetailsText}>{DUMMY_USER_PROFILE.rating}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>RATING</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailsText}>{DUMMY_USER_PROFILE.friends.length}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>FRIENDS</Text>
                    </View>
                </View>
            </View>

            <View style={styles.viewSpacing}>
                {aboutMeSection}
            </View>

            <View style={styles.viewSpacing}>
                {paymentMethodSection}
            </View>

            <View style={styles.viewSpacing}>
                <Text style={styles.subtitle}>Recent Bounties</Text>
                <View style={styles.filterContainer}>
                    <View style={styles.filterContainerPressable}>
                        <Pressable>
                            <Text style={styles.filterText}>All</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.filterText}>Owed</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.filterText}>Received</Text>
                        </Pressable>
                    </View>

                    <Pressable>
                        <IconButton icon='swap-vertical-sharp' color='grey' iconSize={22} onPress={() => console.log('Sort Button')}/>
                    </Pressable>
                </View>
                {DUMMY_FAVORS_OF_PROFILE.map((favor) => <FavorCard key={favor.description} favor={favor}/>)}
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
        fontSize: 18
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
        fontSize: 36,
        fontWeight: 'bold',
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center'
    },
    editBox: {
        borderColor: GLOBAL_STYLES.colors.orange700,
        borderRadius: 8,
        padding: 4,
        borderWidth: 2
    },
    subtitle: {
        fontSize: 28,
        fontWeight: 'bold',
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
    }
})
export default UserProfileScreen;