import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import OrderDetailsScreen from './components/OrderDetails';
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
const OrderDetails = ({ navigation, route }) => {
    const { item } = route.params
    const [alertMessage, setAlertMessage] = useState('');
    const [orderDetailsData, setOrderDetailsData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            ListFun()
        }, [item])
    );

    async function ListFun() {
        try {
            setIsLoading(true)
            const params = {
                'order_id': item.order_id
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_ORDER_DETAILS, params);
            if (data.status === 200) {
                setIsLoading(false)
                setOrderDetailsData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };


    async function cancelOderFun(item) {
        try {
            setIsLoading(true)
            const params = {
                'order_id': item.order_id,
                'status': 5,
            }
            const { data } = await apiCall('POST', ENDPOINTS.CANCEL_ORDER, params);
            if (data.status === 200) {
                setIsLoading(false)
                navigation.navigate('OrderList')
            } else if (data.status === 201) {
                setIsLoading(false)
                ListFun()
            } else if (data.status === 401) {
                setIsLoading(false)
                ListFun()
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    const goback = () => {
        navigation.goBack(null)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <OrderDetailsScreen
                openDrawer={() => navigation.openDrawer()}
                goback={goback}
                orderDetailsData={orderDetailsData}
                totalAmount={orderDetailsData ? orderDetailsData[0].ordersItems.reduce(
                    (prevValue, currentValue) => prevValue + (currentValue.total_unit_qty * currentValue.product_unit_price),
                    0
                ) : null}
                cancelOderFun={cancelOderFun}
            />
            <Footer />
        </View>
    )
};
export default OrderDetails;