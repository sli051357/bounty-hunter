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
    <View>
        <Text style={styles.title}>About Me:</Text>
        <Text style={[styles.text]}>{aboutMe}</Text>
    </View>; 

    if (isEditing) {
        editAboutMe = 
        <View style={styles.container}>
            <Text style={styles.title}>About Me:</Text>        
            <TextInput style={[styles.text, styles.editBox]} 
            defaultValue="Make your description!"
            onChangeText={(text)=>onPress(text)}
            value={aboutMe}
            multiline={true}
            maxLength={175}/>  
        </View>
    }

    return editAboutMe
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        gap: 4,
        minHeight: 155, 
        flex: 1
    },
    text: {
        color: GLOBAL_STYLES.colors.brown700,
        fontSize: 18
    },
    title: {
        color: GLOBAL_STYLES.colors.orange700,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 18
    },
    editBox: {
        fontSize: 18,
        borderRadius: 8,
        borderColor: GLOBAL_STYLES.colors.brown700,
        color: GLOBAL_STYLES.colors.brown700,
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderWidth: 2,
        maxWidth: '100%',
        overflow: 'hidden',
        flex: 1 
    }
})

export default EditAboutMe;