import React, { useState } from 'react';
import { View } from 'react-native';
import OrderPlacedScreen from './components/OrderPlaced';
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
const OrderPlaced = ({ navigation, route }) => {
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
            console.log("data 11 GET_ORDER_DETAILS1", data);
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


    const goback = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <OrderPlacedScreen
                openDrawer={() => navigation.openDrawer()}
                goback={goback}
                orderDetailsData={orderDetailsData}
                totalAmount={orderDetailsData ? orderDetailsData[0].ordersItems.reduce(
                    (prevValue, currentValue) => prevValue + (currentValue.total_unit_qty * currentValue.product_unit_price),
                    0
                ) : null}
            />
            <Footer />
        </View>
    )
};
export default OrderPlaced;