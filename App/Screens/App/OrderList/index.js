import React, { useState } from 'react';
import { View } from 'react-native';
import OrderListScreen from './components/OrderList';
import AsyncStorage from "@react-native-community/async-storage";
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
import Footer from '../../../components/Footer'
const OrderList = ({ navigation }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [orderData, setOrderData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            ListFun()
        }, [])
    );

    async function ListFun() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_ORDER_LIST);
            console.log("data 111", data);
            if (data.status === 200) {
                setIsLoading(false)
                setOrderData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    const OrderDetailsFun = (item) => {
        navigation.navigate('OrderDetails', { item })
    }
    const goback = () => {
        navigation.goBack(null)
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <OrderListScreen
                openDrawer={() => navigation.openDrawer()}
                OrderDetailsFun={OrderDetailsFun}
                goback={goback}
                orderData={orderData}
            />
            <Footer  logoType='4' />
        </View>
    )
};
export default OrderList;