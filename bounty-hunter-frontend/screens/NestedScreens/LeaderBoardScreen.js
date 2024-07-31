import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../../constants/styles";
import { fullYear } from "../../util/date";
import LeaderboardFriendTab from "../../components/LeaderboardFriendTab";
import { DETAILED_FRIEND_LIST } from "../../util/dummy-data";
import ScrollViewHelper from "../../components/UI/ScrollViewHelper";

/*
    Need an axios call to get current FriendList with
    - Friend ID,
    - Friend username
    - Friend profile reference
    - Friend Rating
    (Look at dummy_data DETAILED_FRIEND_LIST for reference)
*/

function LeaderBoardScreen() {
    const navigation = useNavigation();

    return (
            <ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
                <View style={styles.page}>
                    <Text style={styles.mainHeader}>Leaderboard</Text>
                    <Text style={styles.dateHeader}>{fullYear}</Text>
                    <View style={styles.listContainer}>
                        {DETAILED_FRIEND_LIST.map((value, index) =>
                        <LeaderboardFriendTab username={value.friendUsername}
                        rating={value.friendRating} userImage={value.friendProfilePic}
                        rank={index+1} friendProfilePage={() => navigation.navigate('FriendProfile', {userId: 'A12309899'})}
                        key={value.friendId}/>)}
                    </View>
                </View>
            </ScrollViewHelper>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '10%',
        paddingVertical: 4,
        gap: 8,
        alignItems: 'stretch', 
        justifyContent: 'center',
    },
    mainHeader: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 30,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center'
    },
    dateHeader: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 18,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center',
        marginBottom: 12
    },
    listContainer: {
        gap: 24,
        flex: 1
    }
})

export default LeaderBoardScreen;