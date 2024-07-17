import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";

import { GLOBAL_STYLES } from "../constants/styles";
import { DUMMY_FAVORS_OF_PROFILE, DUMMY_USER_PROFILE } from '../util/dummy-data.js';
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
                        <View style={{flexDirection: 'row', itemsAlign: 'center'}}>
                            {/* ID */}
                            <Text style={[styles.text, {textAlign: 'center', marginRight: 10}]}>ID: Extra ID</Text>
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
                        <Text style={styles.userDetailsText}>##</Text>
                        <Text style={styles.lightText}>friends</Text>
                    </View>
                </View>
                <View styles={styles.userMainDetailsView}>
                    <Text style={styles.userDetailsText}>##</Text>
                    <Text style={styles.lightText}>net balance over # bounties</Text>
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
export default FriendProfileScreen;