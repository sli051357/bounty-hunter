import { View, Text, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { useState } from "react";

import { GLOBAL_STYLES } from "../constants/styles";
import { DUMMY_FAVORS_OF_PROFILE, DUMMY_USER_PROFILE } from '../util/dummy-data.js';
import EditAboutMe from "../components/UI/UserProfileHelpers/EditAboutMe.js";
import EditPaymentMethods from "../components/UI/UserProfileHelpers/EditPaymentMethods.js";
import FavorCard from "../components/FavorCard.js";


// We will get username, ID, Rating, FriendNum, AboutMe, PaymentMethods, and RecentFavors
// using the database. 

function UserProfileScreen({}){
    const [editAboutMe, setEditAboutMe] = useState(false);
    const [editPayment, setEditPayment] = useState(false);
    const [aboutMe, setAboutMe] = useState(DUMMY_USER_PROFILE.aboutMe);
    const [payments, setPayments] = useState(DUMMY_USER_PROFILE.paymentMethods);

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
    }
})
export default UserProfileScreen;