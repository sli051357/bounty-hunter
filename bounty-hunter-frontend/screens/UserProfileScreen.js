import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../constants/styles";



function UserProfileScreen(){
    const navigation = useNavigation();
    console.log(navigation);

    return (
        <View style={styles.page}>
            <View>
                <View>
                    <Image style={styles.profilePicture} source={require('../assets/profile.jpeg')}/>
                    <View>
                        <Text>USERNAME</Text>
                        <Text>ID</Text>
                    </View>
                </View>
                <View>
                    <Text>Rating and Friends</Text>
                </View>
            </View>
            <View>
                <Text>Will make component for resuability of About Me, Payment Methods, Recent Favors</Text>
                <TextInput />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1
    },
    profilePicture: {

    }
})
export default UserProfileScreen;