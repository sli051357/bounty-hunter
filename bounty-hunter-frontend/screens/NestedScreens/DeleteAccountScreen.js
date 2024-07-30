import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";
import { clearStore } from '../../store/redux/clearStore'
import Button from "../../components/UI/Button";

function DeleteAccountScreen() {
    // Turn into async await when we get Axios Api call
    function deleteAccountHandler() {
        clearStore();
    }

    return (
        <ScrollView style ={{flex: 1}} contentContainerStyle={styles.page}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <View style={styles.page}>
                    <Text style={styles.mainHeader}>Delete Account</Text>
                    <Text style={styles.description}>
                        Sorry to see you go! Deleting your account will result
                        in losing your account for Bounty Hunter forever. Press the Button
                        to confirm your action.
                    </Text>
                    <Button title='Delete Account' buttonStyles={styles.buttonStyles}
                    textStyle={{fontFamily: 'BaiJamjuree-Bold'}} onPress={deleteAccountHandler}/>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 18
    },
    mainHeader: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center'
    },
    description: {
        color: GLOBAL_STYLES.colors.brown700,
        textAlign: 'center',
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 18
    },
    buttonStyles: {
        borderRadius: 6,
        paddingHorizontal: 18,
        paddingVertical: 8,
        backgroundColor: GLOBAL_STYLES.colors.blue300,
    }
})

export default DeleteAccountScreen