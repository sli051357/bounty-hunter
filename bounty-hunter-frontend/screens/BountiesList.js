import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import { GLOBAL_STYLES } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import FavorCard from "../components/FavorCard";
// import { DUMMY_FAVORS_OF_PROFILE_Updated } from "../util/dummy-data";
import { useDispatch, useSelector } from "react-redux";
import { removeBounty } from "../store/bountyList";

function BountiesList(){
    const userBountyList = useSelector((state) => state.bountyList.bountyList);
    const dispatch = useDispatch();
    //console.log(userBountyList);

    // This is a tester function, NOT ACTUAL IMPLEMENTATION!
    function removeBountyHandler(bountyId){
        console.log(bountyId);
        dispatch(removeBounty(bountyId))
    }


    return (
        <ScrollView style={styles.page}>
            <Text style={styles.mainHeader}>My Bounties</Text>
            <View style={styles.viewSpacing}>
                <View style={styles.filterContainer}>
                    <View style={styles.filterContainerPressable}>
                        <Pressable>
                            <Text style={styles.filterText}>All</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.filterText}>Owed</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.filterText}>Received</Text>
                        </Pressable>
                    </View>

                    <View style={styles.filterContainer}>
                        <IconButton icon='filter' color='grey' iconSize={22} onPress={() => console.log('Filter Button')}/>
                        <IconButton icon='swap-vertical-sharp' color='grey' iconSize={22} onPress={() => console.log('Sort Button')}/>
                    </View>
                </View>
                {userBountyList.map((favor) => <FavorCard key={favor.bountyId} onPress={removeBountyHandler} favor={favor}/>)}
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
    mainHeader: {
        fontSize: 36,
        fontWeight: 'bold',
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center'
    },
    viewSpacing: {
        marginVertical: 8
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
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


export default BountiesList;