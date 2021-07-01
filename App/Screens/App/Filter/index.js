import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { UserDataContext } from '../../../utils/UserContext';

import RNRestart from 'react-native-restart';
import FilterScreen from './components/Filter'
import Language from '../../../components/Language'
import Loader from '../../../utils/Loader';

import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import Footer from '../../../components/Footer'
const Filter = ({ navigation }) => {
    const [userData, setUserData] = useContext(UserDataContext);
    const [languageShow, setLanguageShow] = useState(false)
    const [laguageType, setLanguageType] = useState('English')
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [shopCategoryData, setShopCategoryData] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    useFocusEffect(
        React.useCallback(() => {
            OnCatoryList()
        }, [])
    );

    async function OnCatoryList() {
        try {
            const params = {
                'offset': 0
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_ALL_CATEGORY, params);
            if (data.status === 200) {
                setIsLoading(false)
                setShopCategoryData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };
    const categoryNameFun = (item) => {
        setCategoryName(item.cat_name)
        setCategoryId(item.cat_id)
        setLanguageShow(!languageShow)
    }

    async function onSearchFun() {
        try {
            setIsLoading(true)
            const params = {
                "cat_id": categoryId,
                "product_name": productName,
                "product_unit_price": '',
            }

            console.log('params', params)
            const { data } = await apiCall('POST', ENDPOINTS.PRODUCT_SEARCH, params);
            console.log('data: ', data.data);
            if (data.status === 200) {
                navigation.navigate('FilterList', { item: data.data, productName: categoryName })
                setIsLoading(false)
            } else if (data.status === 201) {
                AnimatedAlert.showAlert()
                setAlertMessage(data.message);
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
            {isLoading && <Loader state={isLoading} />}
            <FilterScreen
                price={price}
                setPrice={setPrice}
                setLanguageShow={setLanguageShow}
                languageShow={languageShow}
                shopCategoryData={shopCategoryData}
                categoryNameFun={categoryNameFun}
                setProductName={setProductName}
                onSearchFun={onSearchFun}
                categoryName={categoryName}
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
export default Filter;