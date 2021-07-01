import React, { useState } from 'react';
import { View } from 'react-native';
import SearchScreen from './components/Search';
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
const Search = ({ navigation }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [offsetNum, setOffsetNum] = useState(0);
    const [recommendedProduct, setRecommendedProduct] = useState(0);
    useFocusEffect(
        React.useCallback(() => {
            // ListFun()
        }, [])
    );

    async function ListFun() {
        try {
            setIsLoading(true)
            const params = {
                'offset': offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.RECOMMENDED_PRODUCT, params);
            console.log('data', data)
            if (data.status === 200) {
                setIsLoading(false)
                setRecommendedProduct(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    const onProductDetails = (item) => {
        navigation.navigate('ProductDetails', { item })
    }
    const getNotification = () => {
        setAlertMessage('wir melden uns bei dir Sobald es möglich ist für uns zu arbeiten');
        AnimatedAlert.showAlert()
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <SearchScreen
                openDrawer={() => navigation.openDrawer()}
                recommendedProduct={recommendedProduct}
                onProductDetails={onProductDetails}
                isLoading={isLoading}
                getNotification={getNotification}
            />
            <Footer logoType='3' />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor='green'
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default Search;