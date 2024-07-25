import { View, ScrollView, Text, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addBounty } from "../../store/bountyList";

import InputFields from "../../components/UI/BountyListHelpers/InputFields";
import SwitchTabs from "../../components/UI/BountyListHelpers/SwitchTabs";
import { GLOBAL_STYLES } from "../../constants/styles";
import { useState } from "react";
import Button from "../../components/UI/Button";
import IconButton from "../../components/UI/IconButton";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay";
import today from "../../util/date";

function CreateBountyScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const username = useSelector(state => state.username.username);
    const [favorDetails, setFavorDetails] = useState({
        favorName: '',
        assignee: '',
        totalOwed: '',
        description: '',
        tags: [],
        privacyStatus: false,
        editHistory: []
    });
    const [isMonetaryStatus, setIsMonetaryStatus] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    function setFavorDetailsHandler(text, type) {
        setFavorDetails((prevState) => ({
            ...prevState, [type]: text
        }));
    }

    function setIsMonetaryStatusHandeler(text) {
        if (text === 'Monetary') {
            setIsMonetaryStatus(true);
        }else {
            setIsMonetaryStatus(false);
        }
    }

    function setPrivacyHandler(type) {
        let status = type === 'Private' ? false : true;
        setFavorDetails((prevState) => ({
            ...prevState, privacyStatus: status
        }));
    }

    function createFavorButtonHandler() {
        const favorNameIsValid = favorDetails.favorName.length > 0;
        const assigneeIsValid = favorDetails.assignee.length > 0;
        const totalOwedIsValid = favorDetails.totalOwed.length > 0;

        if (!favorNameIsValid || !assigneeIsValid || !totalOwedIsValid) {
            Alert.alert("Please fill input values.", "Check highlighted inputs!");
            return;
        }
        createFavorHandler();
    }

    // Turn this into async function when axios is added
    function createFavorHandler() {
        const favor = {
            bountyId: (Math.floor(Math.random() * 1000)), // Dummy Bounty Id, async call in actual implementation
            senderId: username, // Will be our unique Id
            receiverId: favorDetails.assignee, // Same with Id
            dateCreated: today,
            tags: [],
            paymentType: isMonetaryStatus ? 'Monetary' : 'Non-Monetary',
            paymentOwed: favorDetails.totalOwed,
            description: favorDetails.description,
            status: 'In-Progress',
            privacyStatus: favorDetails.privacyStatus,
            bountyEditHistory: favorDetails.editHistory,

        }
        setIsUploading(true);
        try {
            // Will Set up Axios Sign Up later
            // const response = await apiService.createFavor(favor);
            dispatch(addBounty(favor));
        } catch (error) {
            console.log(error);
            Alert.alert("Could Not Add Bounty!", "Try again later.")
        }
        setIsUploading(false);
        navigation.navigate('BountiesList')
    }

    if (isUploading){
        <LoadingOverlay message='Inputting data...' backgroundColor={{backgroundColor: GLOBAL_STYLES.colors.brown500}}/>
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} 
        behavior="padding"   keyboardVerticalOffset={100}>
            <ScrollView style={{flex: 1, backgroundColor: GLOBAL_STYLES.colors.brown300}}>
                <View style={styles.page}>
                        <Text style={styles.mainHeader}>Create Bounty</Text>
                        <InputFields
                        typeTitle='Favor Name *'
                        type='favorName'
                        onPress={setFavorDetailsHandler}
                        maxLength={18}
                        value={favorDetails.favorName}
                        keyboardType='default'
                        />
                        <InputFields
                        typeTitle='Assign To (by user ID) *'
                        type='assignee'
                        onPress={setFavorDetailsHandler}
                        maxLength={14}
                        value={favorDetails.assignee}
                        keyboardType='default'
                        />
                        <InputFields
                        typeTitle='Total Owed *' 
                        type='totalOwed'
                        onPress={setFavorDetailsHandler}
                        maxLength={22}
                        value={favorDetails.totalOwed}
                        keyboardType='default'
                        >
                            <SwitchTabs tabOne='Monetary' tabTwo='Non-Monetary'
                            onPress={setIsMonetaryStatusHandeler} isActive={isMonetaryStatus} containerStyles={{marginBottom: 8}}/>
                        </InputFields>
                        <InputFields
                        typeTitle='Favor Description'
                        type='description'
                        onPress={setFavorDetailsHandler}
                        maxLength={175}
                        value={favorDetails.description}
                        keyboardType='default'
                        multiLineStyles={{minHeight: 155, flex: 1}}
                        multiline={true}/>
                        <View style={styles.tagsContainer}>
                            <Text style={styles.tagHeader}>Tags</Text>
                            <View style={styles.addTagContainer}>
                                <IconButton icon='add-sharp' iconSize={18} onPress={() => console.log('Make tag function')}
                                    color={GLOBAL_STYLES.colors.orange700}/>
                            </View>
                        </View>
                        <View style={styles.privacyStatusContainer}>
                            <Text style={styles.privacyStatusHeader}>Privacy Status</Text>
                            <SwitchTabs tabOne='Public' tabTwo='Private' onPress={setPrivacyHandler}
                            isActive={favorDetails.privacyStatus}/>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Button
                            title='Cancel'
                            onPress={() => navigation.navigate('BountiesList')}
                            buttonStyles={{backgroundColor: GLOBAL_STYLES.colors.brown500}}
                            containerStyle={{backgroundColor: GLOBAL_STYLES.colors.brown500,
                            paddingHorizontal: 30, borderRadius: 6}}
                            textStyle={{fontSize: 28, fontWeight: 'bold'}}/>
                            <Button title='Create'
                            onPress={createFavorButtonHandler}
                            buttonStyles={{backgroundColor: GLOBAL_STYLES.colors.blue300}}
                            containerStyle={{backgroundColor: GLOBAL_STYLES.colors.blue300,
                            paddingHorizontal: 30, borderRadius: 6}}
                            textStyle={{fontSize: 28, fontWeight: 'bold'}}/>
                        </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '7%',
        paddingVertical: 12,
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        gap: 18
    },
    mainHeader: {
        color: GLOBAL_STYLES.colors.blue300,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    tagsContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4
    },
    addTagContainer: {
        borderRadius: 8,
        borderColor: GLOBAL_STYLES.colors.orange700,
        borderWidth: 2
    },
    tagHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: GLOBAL_STYLES.colors.orange700
    },
    privacyStatusContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4
    },
    privacyStatusHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: GLOBAL_STYLES.colors.orange700
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 16
    }
})

export default CreateBountyScreen;