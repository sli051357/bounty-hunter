import { View, Text, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { GLOBAL_STYLES } from "../constants/styles";
import TitleWithButton from "../components/UI/TitleWithButton";
import PaymentMethod from "../components/UI/UserProfileHelpers/PaymentMethod";


// We will get username, ID, Rating, FriendNum, AboutMe, PaymentMethods, and RecentFavors
// using the database. 

function UserProfileScreen({}){
    const [editAboutMe, setEditAboutMe] = useState(false);
    const [editPayment, setEditPayment] = useState(false);
    const [aboutMe, setAboutMe] = useState('');
    const [payments, setPayments] = useState(['Vemmo Test', 'Zelle Test', 'Wishlist']);

    function editAboutMeHandler(){
        setEditAboutMe((curr) => !curr);
    }

    function changeAboutMeHandler(text) {
        setAboutMe(text);
    }

    let aboutMeSection = 
    <View>
        <TitleWithButton
        title='About Me'
        titleColor={GLOBAL_STYLES.colors.orange300}
        icon='create-sharp'
        iconColor={GLOBAL_STYLES.colors.orange300}
        onPress={editAboutMeHandler}/>
        <Text style={[styles.text, styles.editBox]}>
            {aboutMe}
        </Text>
    </View>;

    if (editAboutMe){
        aboutMeSection = 
        <View>
            <TitleWithButton
                title='About Me'
                titleColor={GLOBAL_STYLES.colors.orange300}
                icon='checkmark-circle-sharp'
                iconColor={GLOBAL_STYLES.colors.orange300}
                onPress={editAboutMeHandler}/>
            <TextInput style={[styles.text, styles.editBox]} 
            defaultValue="Some Default Value"
            onChangeText={(text)=>changeAboutMeHandler(text)}
            value={aboutMe}
            multiline={true}
            maxLength={175}/>
                
        </View>
    }

    function editPaymentMethodHandler(){
        setEditPayment(curr => !curr);
    }

    let paymentMethodSection = 
    <View>
        <TitleWithButton
        title='Payment Methods'
        titleColor={GLOBAL_STYLES.colors.orange300}
        icon='create-sharp'
        iconColor={GLOBAL_STYLES.colors.orange300}
        onPress={editPaymentMethodHandler}/>
        {payments.map((payment) => <PaymentMethod payment={payment} onPress={() => {}}/>)}
    </View>;

    if (editPayment) {
        paymentMethodSection = 
        <View>
            <TitleWithButton
                title='About Me'
                titleColor={GLOBAL_STYLES.colors.orange300}
                icon='checkmark-circle-sharp'
                iconColor={GLOBAL_STYLES.colors.orange300}
                onPress={editPaymentMethodHandler}/>        
        </View>
    }

    return (
        <ScrollView style={styles.page}>
            <View style={[styles.userMainDetails, styles.viewSpacing]}> 
                <View style={styles.userMainDetailsView}>
                    <Image style={styles.profilePicture} source={require('../assets/profile.jpeg')}/>
                    <View>
                        <Text style={styles.userDetailsText}>USERNAME</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>ID: 1234567</Text>
                    </View>
                </View>
                <View style={styles.userMainDetailsView}>
                    <View>
                        <Text style={styles.userDetailsText}>###</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>RATING</Text>
                    </View>
                    <View>
                        <Text style={styles.userDetailsText}>###</Text>
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
    }
})
export default UserProfileScreen;