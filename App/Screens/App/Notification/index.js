import React, { useState } from 'react';
import { View } from 'react-native';
import NotificationScreen from './components/Notification';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
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
const Notification = ({ navigation }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [notificationData, setNotificationData] = useState('');
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [offsetNum, setOffsetNum] = useState(0);
    useFocusEffect(
        React.useCallback(() => {
            ListFun()
        }, [])
    );

    async function ListFun() {
        try {
            setIsLoading(true)
            const params = {
                'offset': offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_NOTIFICATION, params);
            if (data.status === 200) {
                setIsLoading(false)
                setNotificationData(data.data)
            } else if (data.status === 201) {
                setNotificationData([])
                setIsLoading(false)
            } else if (data.status === 401) {
                setNotificationData([])

                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };


    async function DeleteNotification(item) {
        try {
            setIsLoading(true)
            const params = {
                'notification_id': item.notification_id
            }
            const { data } = await apiCall('POST', ENDPOINTS.DELETE_NOTIFICATION, params);
            if (data.status === 200) {
                setIsLoading(false)
                ListFun()
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };







    const goback = () => {
        navigation.goBack(null)
    }

    return (
        <View style={{ flex: 1 }}>
            <NotificationScreen
                goback={goback}
                notificationData={notificationData}
                DeleteNotification={DeleteNotification}
            />
            <Footer />
        </View>
    )
};
export default Notification;