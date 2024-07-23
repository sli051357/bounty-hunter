import { View, Text, StyleSheet, Image, Pressable, ScrollView} from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';
import WishlistCard from '../components/WishlistCard';

import DUMMY_WISHLIST from '../util/wishlist'

function WishlistScreen({ user }) {
    const [isEditing, setIsEditing] = useState(false);

    function isEditingHandler() {
        setIsEditing((curr) => !curr);
    }

    return (

        <ScrollView style={styles.page}>
            <View>
                <Text style={styles.headerText}>My Wishlist</Text>
            </View>

            <View>
                <Pressable onPress={(isEditingHandler)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </Pressable>
            </View>

            <View>
                <WishlistCard
                    title='Lego Set'
                    description='https://www.lego.com/en-us/product/wildflower-bouquet-10313'
                    price='55'
                    imagePath={{uri: 'https://www.lego.com/cdn/cs/set/assets/bltc4a6c2103a34f22e/10313_alt2.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1.5'}}
                />
            </View>

            <View>
                {DUMMY_WISHLIST.map((item) => <WishlistCard key={item.title} isEditing={false}/>)}
            </View>



            {/* <View>
                {isEditing ? (
                    
                ) : (

                )}
            </View> */}
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingTop: 100,
    },
    headerText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center',
        marginBottom: 10,
    }
})

export default WishlistScreen;