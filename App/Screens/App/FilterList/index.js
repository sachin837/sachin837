import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import FilterListScreen from './components/FilterList'
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import { CartContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer'
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
const FilterList = ({ navigation, route }) => {
    const { productName } = route.params
    console.log('productName',productName)
    const [cartVal, setCartVal] = useContext(CartContext);
    const [cartData, setCartData] = useState(cartVal)
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false)
    const [offsetNum, setOffsetNum] = useState(0);
    const [productCategoryData, setProductCategoryData] = useState([])
    const item = []
    useFocusEffect(
        React.useCallback(() => {
            onSearchFun(productName)
        }, [productName])
    );


    async function onSearchFun(productName) {
        try {
            setIsLoading(true)
            const params = {
                "cat_id": '',
                "product_name": productName,
                "product_unit_price": '',
            }

            console.log('params', params)
            const { data } = await apiCall('POST', ENDPOINTS.PRODUCT_SEARCH, params);
            console.log('data: ', data.data);
            if (data.status === 200) {
                setProductCategoryData(data.data)
                // navigation.navigate('FilterList', { item: data.data, productName: categoryName })
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


    const onProductDetails = (item) => {
        navigation.navigate('ProductDetails', { item })
    }
    const addCart = async (item) => {
        const cartArray = [...cartVal]
        let index = cartArray.findIndex(o => o.product_id === item.product_id);
        if (index != '-1') {
            cartArray[index].total_unit_qty = cartArray[index].total_unit_qty + 1
            setCartVal(cartArray)
            await AsyncStorage.setItem('cartData', JSON.stringify(cartArray));

        } else {
            cartArray.push({
                product_id: item.product_id,
                product_name: item.product_name,
                cat_id: item.cat_id,
                product_unit_qty: item.product_unit_qty,
                unit_qty: item.unit_qty,
                product_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.'),
                total_unit_qty: 1,
                total_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.'),
                product_description: item.product_description,
                image: item.product_image_list[0].image,
            })
            setCartVal(cartArray)
            await AsyncStorage.setItem('cartData', JSON.stringify(cartArray));
        }
    }
    const onIncrease = async (i, item) => {
        var newArr = cartVal.map(function (data) {
            return data.product_id === item.product_id ? {
                product_id: item.product_id,
                product_name: item.product_name,
                cat_id: item.cat_id,
                product_unit_qty: item.product_unit_qty,
                unit_qty: item.unit_qty,
                product_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.'),
                total_unit_qty: i,
                total_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.') * i,
                product_description: item.product_description,
                image: item.image_url,
            }
                :
                data;
        });
        setCartVal(newArr)
        await AsyncStorage.setItem('cartData', JSON.stringify(cartVal));
    }
    const onDecrease = async (i, item) => {
        if (i == 0) {
            const items = cartVal.filter(datas => datas.product_id !== item.product_id)
            setCartVal(items)
            await AsyncStorage.setItem('cartData', JSON.stringify(items));
        } else {
            var newArr = cartVal.map(function (data) {
                return data.product_id === item.product_id ? {
                    product_id: item.product_id,
                    product_name: item.product_name,
                    cat_id: item.cat_id,
                    product_unit_qty: item.product_unit_qty,
                    unit_qty: item.unit_qty,
                    product_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.'),
                    total_unit_qty: i,
                    total_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.') * i,
                    product_description: item.product_description,
                    image: item.image_url,
                }
                    :
                    data;
            });
            setCartVal(newArr)
            await AsyncStorage.setItem('cartData', JSON.stringify(cartVal));
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {isLoading && <Loader state={isLoading} />}
            <FilterListScreen
                openDrawer={() => navigation.openDrawer()}
                productCategoryData={productCategoryData}
                onProductDetails={onProductDetails}
                addCart={addCart}
                cartVal={cartVal}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                productName={productName}
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
export default FilterList;