import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import DashBoardScreen from './components/DashBoard'
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
import { CartContext, UserDataContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer'

const DashBoard = ({ navigation }) => {
    useIsFocused();
    const [landingSlider, setLandingSlider] = React.useState([
        {
            Image: require('../../../Assets/Group_116.png'),
            // discount: 'Get 100% discount refer to any friend'
            discount: Language.firstSliderTxt
        },
        {
            Image: require('../../../Assets/Group174.png'),
            discount: Language.secondSliderTxt

        },
        {
            Image: require('../../../Assets/Group175.png'),
            discount: Language.thirdSliderTxt

        },
    ]);
    const [cartVal, setCartVal] = useContext(CartContext);
    const [userData, setUserData] = useContext(UserDataContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [shopCategoryData, setShopCategoryData] = useState('');
    const [popularProductData, setPopularProductData] = useState('');
    const [ProductListData, setProductListData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [offsetNum, setOffsetNum] = useState(5);
    const [lang, setLang] = useState('English');
    useFocusEffect(
        React.useCallback(() => {
            OnProductList()
            OnPopularProductList()
            OnCatoryList()
        }, [])
    );
    async function OnProductList() {
        const langs = await AsyncStorage.getItem('lang');
        setLang(langs)
        const params = {
            'offset': 0
        }
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_DASHBORD_PRODUCT_LIST, params);
            if (data.status === 200) {
                setIsLoading(false)
                setProductListData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };
    async function OnCatoryList() {
        try {
            const params = {
                'offset': 0
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_ALL_CATEGORY, params);
            console.log('sachin', data)
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

    async function OnPopularProductList() {
        const params = {
            'offset': 0
        }
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_POPULAR_PRODUCT, params);
            if (data.status === 200) {
                setIsLoading(false)

                setPopularProductData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    async function onEndPopularProductReachedFun() {
        const params = {
            'offset': offsetNum
        }
        try {
            const { data } = await apiCall('POST', ENDPOINTS.GET_POPULAR_PRODUCT, params);
            if (data.status === 200) {
                setOffsetNum(offsetNum + 5)
                const oldData = popularProductData
                const newAarry = oldData.concat(data.data)
                setPopularProductData(newAarry)
            } else if (data.status === 201) {
            } else if (data.status === 401) {
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    const categoryListFun = (item) => {
        global.item = item
        navigation.navigate('SubCategoryList', { item })
    }
    const SubByCategorySeeAll = () => {
        navigation.navigate('Category')
    }

    const onProductDetails = (item) => {
        navigation.navigate('ProductDetails', { item })
    }
    const seeAllProduct = (item) => {
        // console.log("🚀 ~ file: index.js ~ line 150 ~ seeAllProduct ~ item", item)
        navigation.navigate('CategoryList', { item })
        // navigation.navigate('SeeAllProduct', { item })
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
        await AsyncStorage.setItem('cartData', JSON.stringify(newArr));
    }
    const onDecrease = async (i, item) => {
        if (i == 0) {
            const items = cartVal.filter(datas => datas.product_id !== item.product_id)
            await AsyncStorage.setItem('cartData', JSON.stringify(items));
            setCartVal(items)
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
            await AsyncStorage.setItem('cartData', JSON.stringify(newArr));
        }

    }







    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <DashBoardScreen
                openDrawer={() => navigation.openDrawer()}
                landingSlider={landingSlider}
                shopCategoryData={shopCategoryData}
                categoryListFun={categoryListFun}
                popularProductData={popularProductData}
                ProductListData={ProductListData}
                onProductDetails={onProductDetails}
                seeAllProduct={seeAllProduct}
                cartVal={cartVal}
                addCart={addCart}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                SubByCategorySeeAll={SubByCategorySeeAll}
                onEndPopularProductReachedFun={onEndPopularProductReachedFun}
                userData={userData}
                lang={lang}
            />
            <Footer logoType='1' />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default DashBoard;