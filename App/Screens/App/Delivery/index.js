import React, { useState } from 'react';
import { View } from 'react-native';
import DeliveryScreen from './components/Delivery'
import Footer from '../../../components/Footer'
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import AnimatedAlert from '../../../components/AnimatedAlert';
const Delivery = ({ navigation }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const goback = () => {
        navigation.goBack(null)
    }
    const editAddress = () => {
        navigation.navigate('EditAddress')

    }
    const getNotification = () => {
        setAlertMessage('wir melden uns bei dir Sobald es möglich ist für uns zu arbeiten');
        AnimatedAlert.showAlert()
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <DeliveryScreen
                goback={goback}
                editAddress={editAddress}
                getNotification={getNotification}
            />
            <Footer />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor='green'
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default Delivery;