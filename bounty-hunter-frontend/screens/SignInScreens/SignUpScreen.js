import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../../constants/styles";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";

function SignUpScreen(){
    const [createUser, setCreateUser] = useState({
        username: '',
        email: '',
        password: '',
        'confirm password': ''
    });

    function createUserChangeHandler(text, type) {
        setCreateUser((prevState) => ({
            ...prevState, [type]: text
        }))
    }

    function confirmChangesHandler() {
        console.log(createUser);
        setCreateUser({
            username: '',
            email: '',
            password: '',
            ['confirm password']: ''
        })
    }

    return (
        <>
        <LinearGradient
            colors={[GLOBAL_STYLES.colors.orange300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
        <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.page}>
                        <KeyboardAvoidingView style={{flex: 1}} behavior="position">
                            <View style={[styles.page]}>
                                <View style={styles.container}>
                                    <Text style={styles.header}>Create Account</Text>
                                    <CustomTextInput
                                    typeTitle='username'
                                    onPress={createUserChangeHandler}
                                    maxLength={12}
                                    value={createUser.username}
                                    keyboardType='default'
                                    helperText="Username has to be between 6-12 characters!"
                                    secureTextEntry={false}/>
                                    <CustomTextInput
                                    typeTitle='email'
                                    onPress={createUserChangeHandler}
                                    maxLength={64}
                                    value={createUser.email}
                                    keyboardType='email'
                                    helperText=""
                                    secureTextEntry={false}/>
                                    <CustomTextInput
                                    typeTitle='password'
                                    onPress={createUserChangeHandler}
                                    maxLength={18}
                                    value={createUser.password}
                                    keyboardType='default'
                                    helperText="Password must be between 8-22 charcters."
                                    secureTextEntry={true}/>
                                    <CustomTextInput
                                    typeTitle='confirm password'
                                    onPress={createUserChangeHandler}
                                    maxLength={18}
                                    value={createUser['confirm password']}
                                    keyboardType='default'
                                    helperText=""
                                    secureTextEntry={true}/>
                                    <Button
                                    title="Sign Up"
                                    onPress={confirmChangesHandler}
                                    buttonStyles={styles.buttonStyles}
                                    containerStyle={{alignSelf: 'center'}}/>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </>
            
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
        gap: 12,
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
    }
})

export default SignUpScreen;