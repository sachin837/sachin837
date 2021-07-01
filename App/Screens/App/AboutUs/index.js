import React, { useState } from 'react';
import { View } from 'react-native';
import AboutUsScreen from './components/AboutUs'
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
const AboutUs = ({ navigation }) => {
    const goback = () => {
        navigation.goBack(null)
    }
    const [alertMessage, setAlertMessage] = useState('');
    const [aboutData, setAboutData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            AboutFun()
        }, [])
    );

    async function AboutFun() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.ABOUT_US);
            console.log("data aboutData", data);
            if (data.status === 200) {
                setIsLoading(false)
                setAboutData(data.data)
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
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            {isLoading && <Loader state={isLoading} />}
            <AboutUsScreen
                goback={goback}
                aboutData={aboutData}
            />
            <Footer />
        </View>
    )
};
export default AboutUs;