import React from 'react';
import { View } from 'react-native';
import ProfileScreen from './components/PaymentHistoryfile'
import Footer from '../../../components/Footer'
const Profile = ({ navigation }) => {
    const goback = () => {
        navigation.goBack(null)
    }

    return (
        <View style={{ flex: 1,backgroundColor:'#FFFF' }}>
            <ProfileScreen
                goback={goback}
            />
            <Footer />
        </View>
    )
};
export default Profile;