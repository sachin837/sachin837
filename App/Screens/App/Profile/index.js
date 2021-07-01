import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { UserDataContext } from '../../../utils/UserContext';

import RNRestart from 'react-native-restart';
import ProfileScreen from './components/Profile'
import Language from '../../../components/Language'
import Loader from '../../../utils/Loader';
import Footer from '../../../components/Footer'
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useContext(UserDataContext);
    console.log("userData ", userData);
    const [languageShow, setLanguageShow] = useState(false)
    const [laguageType, setLanguageType] = useState('English')
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    useFocusEffect(
        React.useCallback(() => {
            language()
        }, [])
    );

    const language = async () => {
        const lang = await AsyncStorage.getItem('lang');
        setLanguageType(lang)
    }
    const onProfileDetails = () => {
        navigation.navigate('ProfileDetails')
    }
    const onAddressList = () => {
        navigation.navigate('AddressList')
    }
    const onPaymentHistory = () => {
        navigation.navigate('PaymentHistory')
    }
    const logout = () => {
        navigation.navigate('Login')
    }

    const changeLanguageFun = async (applang) => {
        try {
            setIsLoading(true)
            const params = {
                'language': applang == 'English' ? 1 : 2
            }
            const { data } = await apiCall('POST', ENDPOINTS.LANGUAGE_CHANGE, params);
            if (data.status === 200) {
                languageChange(applang)
                setIsLoading(false)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            console.log('Error', e)
        }


    }


    const languageChange = async (applang) => {
        Language.setLanguage(applang);
        setLanguageShow(!languageShow)
        setLanguageType(applang)
        await AsyncStorage.setItem('lang', applang)
        // RNRestart.Restart();

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <ProfileScreen
                onProfileDetails={onProfileDetails}
                onAddressList={onAddressList}
                onPaymentHistory={onPaymentHistory}
                logout={logout}
                changeLanguageFun={changeLanguageFun}
                languageShow={languageShow}
                setLanguageShow={setLanguageShow}
                laguageType={laguageType}
                userData={userData}
            />
            <Footer />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default Profile;