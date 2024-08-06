import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';

import { GLOBAL_STYLES } from "../../constants/styles";
import IconButton from "../../components/UI/IconButton";
import FavorCard from "../../components/FavorCard";
// import { DUMMY_FAVORS_OF_PROFILE_Updated } from "../util/dummy-data";
import { useDispatch, useSelector } from "react-redux";
import { removeBounty } from "../../store/bountyList";
import FloatingButton from "../../components/UI/FloatingButton";
import SortModal from '../../components/FilterSort/SortModal';

function BountiesListScreen(){
    const userBountyList = useSelector((state) => state.bountyList.bountyList);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //console.log(userBountyList);

    const [isSortVisible, setIsSortVisible] = useState(false);

    // DUMMY VALUES ///////////
    const DUMMY_SORT_VALUES = [
        {name: 'Newest First', active: true},
        {name: 'Oldest First', active: true},
        {name: 'Friend Name A-Z', active: false},
        {name: 'Bounty Title A-Z', active: true},
        {name: 'Price (Highest to Lowest)', active: false},
        {name: 'Price (Lowest to Highest)', active: false},
    ];

    // This is a tester function, NOT ACTUAL IMPLEMENTATION!
    function removeBountyHandler(bountyId){
        console.log(bountyId);
        dispatch(removeBounty(bountyId))
    }

    // Handles sorting implementation
    function sortHandler() {
        setIsSortVisible(false);
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.page}>
                <Text style={styles.mainHeader}>My Bounties</Text>
                <View style={styles.viewSpacing}>
                    <View style={styles.filterContainer}>
                        <View style={styles.searchBar}>
                            <IconButton icon='search-circle-outline' color={GLOBAL_STYLES.colors.brown700} iconSize={28} onPress={() => console.log('Filter Button')}/>
                            <TextInput
                            style={styles.textInput}
                            placeholder="Search..."
                            placeholderTextColor={GLOBAL_STYLES.colors.brown700}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            {/* Filter Button */}
                            <IconButton icon='filter' color={GLOBAL_STYLES.colors.brown700} iconSize={28} onPress={() => console.log('Filter Button')}/>

                            {/* Sort Button */}
                            <IconButton icon='swap-vertical-sharp' color={GLOBAL_STYLES.colors.brown700} iconSize={28} onPress={() => setIsSortVisible(true)}/>
                        </View>
                    </View>
                    {userBountyList.map((favor) => <FavorCard key={favor.bountyId} onPress={removeBountyHandler} favor={favor}/>)}
                </View>
            </ScrollView>
            <FloatingButton 
            onPress={() => navigation.navigate('CreateBounty')}
            icon='add-sharp'
            color={GLOBAL_STYLES.colors.blue300}/>

            <SortModal isVisible={isSortVisible} onClose={sortHandler} sortList={DUMMY_SORT_VALUES}/>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '10%',
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
        marginBottom: 6,
        gap: 8
    },
    searchBar: {
        width: '70%',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        borderColor: GLOBAL_STYLES.colors.brown700,
        borderWidth: 2,
        backgroundColor: GLOBAL_STYLES.colors.brown400,
        paddingHorizontal: 8,
        // paddingVertical: 1
    },
    textInput: {
        flex: 1,
        color: GLOBAL_STYLES.colors.brown700,
        marginLeft: 8,
        fontSize: 14
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    filterText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: GLOBAL_STYLES.colors.blue300
    }
})


export default BountiesListScreen;
