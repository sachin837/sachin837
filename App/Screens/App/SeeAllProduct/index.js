import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import SeeAllProductScreen from './components/SeeAllProduct'
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
import { CartContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer'

const SeeAllProduct = ({ navigation, route }) => {
    // const { item, productName } = route.params
    const [cartVal, setCartVal] = useContext(CartContext);
    console.log("cartVal ", cartVal);
    const [cartData, setCartData] = useState(cartVal)
    const [alertMessage, setAlertMessage] = useState('');
    const [productCategoryData, setProductCategoryData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false)
    const [offsetNum, setOffsetNum] = useState(0);
    useFocusEffect(
        React.useCallback(() => {
            OnPopularProductList()
        }, [])
    );

    async function OnPopularProductList() {
        try {
            // setIsLoading(true)
            const params = {
                'offset':offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_POPULAR_PRODUCT, params);
            if (data.status === 200) {
                setIsLoading(false)
                setProductCategoryData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    async function onEndReachedFun() {
        try {
            // setIsLoading(true)
            setIsFetching(true)
            const params = {
                'offset': offsetNum + 10
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_POPULAR_PRODUCT, params);
            if (data.status === 200) {

                const oldData=productCategoryData
                const newAarry = oldData.concat(data.data)
                setProductCategoryData(newAarry)
                setOffsetNum(offsetNum + 10)
                setIsLoading(false)
                setIsFetching(false)
                
            } else if (data.status === 201) {
                setIsLoading(false)
                setIsFetching(false)
            } else if (data.status === 401) {
                setIsLoading(false)
                setIsFetching(false)

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
                product_unit_price:(`${item.product_unit_price}`).replace(/,/g, '.'),
                total_unit_qty: 1,
                total_unit_price:(`${item.product_unit_price}`).replace(/,/g, '.'),
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
                product_unit_price:(`${item.product_unit_price}`).replace(/,/g, '.'),
                total_unit_qty: i,
                total_unit_price:(`${item.product_unit_price}`).replace(/,/g, '.') * i,
                product_description: item.product_description,
                image: item.product_image_list[0].image,
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
                    product_unit_price:(`${item.product_unit_price}`).replace(/,/g, '.'),
                    total_unit_qty: i,
                    total_unit_price:(`${item.product_unit_price}`).replace(/,/g, '.') * i,
                    product_description: item.product_description,
                    image: item.product_image_list[0].image,
                }
                    :
                    data;
            });
            setCartVal(newArr)
            await AsyncStorage.setItem('cartData', JSON.stringify(cartVal));
        }

    }
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <SeeAllProductScreen
                openDrawer={() => navigation.openDrawer()}
                productCategoryData={productCategoryData}
                // item={item}
                onProductDetails={onProductDetails}
                addCart={addCart}
                cartVal={cartVal}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onEndReachedFun={onEndReachedFun}
                isFetching={isFetching}
            // productName={productName}
            />
            <Footer />
        </View>
    )
};
export default SeeAllProduct;