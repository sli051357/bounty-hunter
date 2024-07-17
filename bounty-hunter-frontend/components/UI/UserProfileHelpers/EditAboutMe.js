import { View, Text, StyleSheet, TextInput} from "react-native";

import TitleWithButton from "../TitleWithButton";
import { GLOBAL_STYLES } from "../../../constants/styles";
// import './api/apiRequest.js';


function EditAboutMe({aboutMe, onPress, isEditing}) {

    // const handleSaveAboutMe = async () => {
    //     try {
    //         // Call the updateUserBio function from apiRequest to update the bio
    //         await apiRequest.updateUserBio(userId, aboutMe); // Replace userId with the actual user ID
    //         // Optionally, you can notify the user that the bio was successfully updated
    //         console.log('Bio updated successfully');

    //         // Call onPress[0] to exit editing mode
    //         onPress[0](); // change this to onpress to exit
            
    //     } catch (error) {
    //         console.error('Failed to update bio:', error);
    //         // Handle error (e.g., show error message to user)
    //     }
    // };

    let editAboutMe = 
    <>
        <TitleWithButton
        title='About Me'
        titleColor={GLOBAL_STYLES.colors.orange700}
        icon='create-sharp'
        iconColor={GLOBAL_STYLES.colors.orange700}
        onPress={onPress[0]} /> 
        <Text style={[styles.text, styles.editBox]}>
            {aboutMe}
        </Text>
    </>; 

    if (isEditing) {
        editAboutMe = 
        <>
            <View>
                <TitleWithButton
                    title='About Me'
                    titleColor={GLOBAL_STYLES.colors.orange700}
                    icon='checkmark-circle-sharp'
                    iconColor={GLOBAL_STYLES.colors.orange700}
                    onPress={onPress[0]}/>
            </View>        
            <TextInput style={[styles.text, styles.editBox]} 
            defaultValue="Some Default Value"
            onChangeText={(text)=>onPress[1](text)}
            value={aboutMe}
            multiline={true}
            maxLength={175}/>  
        </>
    }

    return (
            <View>
                {editAboutMe}
            </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: GLOBAL_STYLES.colors.brown700,
        fontSize: 18
    },
    editBox: {
        borderColor: GLOBAL_STYLES.colors.orange700,
        borderRadius: 8,
        padding: 4,
        borderWidth: 2
    }
})

export default EditAboutMe;