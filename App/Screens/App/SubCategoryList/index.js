import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import SubCategoryListScreen from './components/SubCategoryList'
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
import _ from 'lodash'
import Footer from '../../../components/Footer'
const SubCategoryList = ({ navigation, route }) => {
    useIsFocused();
    const { item } = route.params;
    // console.log('item',item)
    const [cartVal, setCartVal] = useContext(CartContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [productCategoryData, setProductCategoryData] = useState('');
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [offsetNum, setOffsetNum] = useState(0);
    const [type, setType] = useState('');
    const [pageSlider, setPageSlider] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            ListFun(item.cat_id)
        }, [item])
    );

    async function ListFun(id) {
        const newArray = []
        newArray.push({
            'cat_id': item.cat_id,
            'cat_name': item.cat_name
        })
        setPageSlider(newArray)
        try {
            setIsLoading(true)
            const params = {
                'cat_id': id ,
                // 'offset': offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_SUB_CATEGORY_PRIDUCT, params);
            if (data.status === 200) {
                setIsLoading(false)
                setType(data.list_type)
                setProductCategoryData(data.data)
            } else if (data.status === 201) {
                setProductCategoryData([])
                setIsLoading(false)
            } else if (data.status === 401) {
                setProductCategoryData([])
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    async function SubCategoryListFun(item) {
        try {
            setIsLoading(true)
            const params = {
                'cat_id': item.cat_id,
                // 'offset': offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_SUB_CATEGORY_PRIDUCT, params);
            if (data.status === 200) {
                setIsLoading(false)
                setType(data.list_type)
                setProductCategoryData(data.data)
                let index = pageSlider.findIndex(o => o.cat_id === item.cat_id);
                if (index != '-1') {
                } else {
                    pageSlider.push({
                        'cat_id': item.cat_id,
                        'cat_name': item.cat_name
                    })
                }
                setPageSlider(pageSlider)
            } else if (data.status === 201) {
                setProductCategoryData([])
                setIsLoading(false)
            } else if (data.status === 401) {
                setProductCategoryData([])
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    async function previewsSerachFun(item, startIndex) {
        const newArray = []
        pageSlider.map((user, index) => (
            index >= startIndex + 1 ?
                null
                :
                newArray.push({
                    'cat_id': user.cat_id,
                    'cat_name': user.cat_name
                })
        ))
        setPageSlider(newArray)
        try {
            setIsLoading(true)
            const params = {
                'cat_id': item.cat_id,
                // 'offset': offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_SUB_CATEGORY_PRIDUCT, params);
            if (data.status === 200) {
                setIsLoading(false)
                setType(data.list_type)
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
                'cat_id': item.cat_id,
                'offset': offsetNum + 10
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_PRODUCT_CATEGORY, params);
            if (data.status === 200) {
                setOffsetNum(offsetNum + 10)
                const oldData=productCategoryData
                const newAarry = oldData.concat(data.data)
                setProductCategoryData(newAarry)
            } else if (data.status === 201) {
                // setIsLoading(false)
                setIsFetching(false)
            } else if (data.status === 401) {
                // setIsLoading(false)
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
                    product_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.'),
                    total_unit_qty: i,
                    total_unit_price: (`${item.product_unit_price}`).replace(/,/g, '.') * i,
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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <SubCategoryListScreen
                openDrawer={() => navigation.openDrawer()}
                productCategoryData={productCategoryData}
                item={item}
                onProductDetails={onProductDetails}
                addCart={addCart}
                cartVal={cartVal}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onEndReachedFun={onEndReachedFun}
                isFetching={isFetching}
                type={type}
                ListFun={ListFun}
                pageSlider={pageSlider}
                previewsSerachFun={previewsSerachFun}
                SubCategoryListFun={SubCategoryListFun}
            />
            <Footer/>

        </View>
    )
};
export default SubCategoryList;