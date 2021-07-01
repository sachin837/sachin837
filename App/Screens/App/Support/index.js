import React, { useState } from 'react';
import { View } from 'react-native';
import SupportScreen from './components/Support';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import Language from '../../../components/Language';
import { CartContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer'
const Support = ({ navigation }) => {
    const goback = () => {
        navigation.goBack(null)
    }
    const [alertMessage, setAlertMessage] = useState('');
    const [costomerSupportData, setCostomerSupportData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            ContactFun()
        }, [])
    );

    async function ContactFun() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.CONTACT_US);
            console.log("data contact", data);
            if (data.status === 200) {
                setIsLoading(false)
                setCostomerSupportData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
           {isLoading && 
            <View style={{position:'absolute'}}>
            <Loader state={isLoading} />
            </View>}
            <SupportScreen
                goback={goback}
                costomerSupportData={costomerSupportData}
            />
            <Footer />
        </View>
    )
};
export default Support;