import { 
    View, 
    Text, 
    StyleSheet,  
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../../constants/styles";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";


function UpdatePasswordScreen(){
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [newPassword, setNewPassword] = useState({
        ['new password']: '',
        ['confirm new password']: ''
    });

    function newPasswordChangeHandler(text, type) {
        setNewPassword((prevState) => ({
            ...prevState, [type]: text
        }))
    }

    function confirmChangesHandler() {
        console.log(newPassword);
        setNewPassword({
            password: '',
            ['confirm password']: ''
        })
        navigation.navigate('ReturnLoginScreen')
    }

    return (
        <>
        <LinearGradient
            colors={[GLOBAL_STYLES.colors.orange300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
            <View style={{flex: 1, marginTop: insets.top+40}}>
                <View style={[styles.page]}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Update Password</Text>
                        <Text style={styles.description}>
                            Your email has been successfully verified.
                             Update your password below.
                        </Text>
                        <CustomTextInput
                        typeTitle='new password'
                        onPress={newPasswordChangeHandler}
                        maxLength={22}
                        value={newPassword['new password']}
                        keyboardType='default'
                        helperText=""
                        secureTextEntry={true}/>
                        <CustomTextInput
                        typeTitle='confirm new password'
                        onPress={newPasswordChangeHandler}
                        maxLength={22}
                        value={newPassword['confirm new password']}
                        keyboardType='default'
                        helperText="Passwords do not match!"
                        secureTextEntry={true}/>
                        <Button
                        title="Update Password"
                        onPress={confirmChangesHandler}
                        buttonStyles={styles.buttonStyles}
                        containerStyle={{alignSelf: 'center'}}/>
                    </View>
                </View>
            </View>
        </>
            
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '100%'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 22,
        padding: 12,
        marginHorizontal: '5%',
        width: '90%'
    },
    header: {
        textAlign: 'center',
        fontSize: 32,
        color: GLOBAL_STYLES.colors.brown300,
        fontWeight: '900',
        alignSelf: 'center'
    },
    buttonStyles: {
        borderRadius: 6,
        paddingHorizontal: 32,
        paddingVertical: 8,
    },
    description: {
        textAlign: 'center',
        fontSize: 22,
        color: GLOBAL_STYLES.colors.brown300,
    },
})

export default UpdatePasswordScreen;