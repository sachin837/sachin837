import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import CategoryScreen from './components/Category'
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import { CartContext, UserDataContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer';
import Language from '../../../components/Language';
const Category = ({ navigation }) => {
    // useIsFocused();
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
        }
    ]);
    const [userData, setUserData] = useContext(UserDataContext);
    const [cartVal, setCartVal] = useContext(CartContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [shopCategoryData, setShopCategoryData] = useState([]);
    const [productData, setProductData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [popularProductData, setPopularProductData] = useState('');
    const [productCategoryData, setProductCategoryData] = useState('');
    const [CategoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [pageSlider, setPageSlider] = useState([])
    const [offsetNum, setOffsetNum] = useState(0);
    const [showIndex, setShowIndex] = useState(null);
    useFocusEffect(
        React.useCallback(() => {
            OnPopularProductList()
            OnCatoryList()
        }, [])
    );

    async function OnPopularProductList() {
        try {
            setIsLoading(true)
            const params = {
                'offset': 0
            }
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

    async function OnCatoryList() {
        setShowIndex(null)
        try {
            const params = {
                'offset': 0
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_ALL_CATEGORY, params);
            if (data.status === 200) {
                setIsLoading(false)
                // ListFun(data.data[0])

                setShopCategoryData(data.data)
                setOffsetNum(offsetNum + 10)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    async function onEndShopCateReachedFun() {
        try {
            const params = {
                'offset': offsetNum
            }
            const { data } = await apiCall('POST', ENDPOINTS.GET_ALL_CATEGORY, params);
            if (data.status === 200) {
                const oldData = shopCategoryData
                const newAarry = oldData.concat(data.data)
                setShopCategoryData(newAarry)
                setOffsetNum(offsetNum + 10)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    async function subCategoryFun(item) {
        navigation.navigate('SubCategoryList', { item })
        // try {

        //     let index = pageSlider.findIndex(o => o.cat_id === item.cat_id);
        //     if (index != '-1') {
        //         const newArray = []
        //         newArray.push({
        //             'cat_id': item.cat_id,
        //             'cat_name': item.cat_name
        //         })
        //         setPageSlider(newArray)
        //     } else {
        //         const newArray = []
        //         newArray.push({
        //             'cat_id': item.cat_id,
        //             'cat_name': item.cat_name
        //         })
        //         setPageSlider(newArray)
        //     }



        //     const params = {
        //         'cat_id': item.cat_id
        //     }
        //     setIsLoading(true)
        //     const { data } = await apiCall('POST', ENDPOINTS.GET_SUB_CATEGORY_PRIDUCT, params);
        //     if (data.status === 200) {
        //         setIsLoading(false)
        //         setProductData(data.data)
        //         setCategoryType(data.list_type)

        //     } else if (data.status === 201) {
        //         setProductData([])
        //         setIsLoading(false)
        //     } else if (data.status === 401) {
        //         setProductData([])
        //         setIsLoading(false)
        //     }
        // } catch (error) {
        //     setIsLoading(false)
        // }
    };
    async function InnserSubCategoryFun(item) {
        try {
            const params = {
                'cat_id': item.cat_id
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_SUB_CATEGORY_PRIDUCT, params);
            if (data.status === 200) {
                setIsLoading(false)
                setProductData(data.data)
                setCategoryType(data.list_type)
                pageSlider.push({
                    'cat_id': item.cat_id,
                    'cat_name': item.cat_name
                })
                setPageSlider(pageSlider)

            } else if (data.status === 201) {
                setProductData([])
                setIsLoading(false)
            } else if (data.status === 401) {
                setProductData([])
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
            const params = {
                'cat_id': item.cat_id
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_SUB_CATEGORY_PRIDUCT, params);
            if (data.status === 200) {
                setIsLoading(false)
                setProductData(data.data)
                setCategoryType(data.list_type)
            } else if (data.status === 201) {
                setProductData([])
                setIsLoading(false)
            } else if (data.status === 401) {
                setProductData([])
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

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
    const productDetailsFun = (item) => {
        navigation.navigate('ProductDetails', { item })
    }

    const RecommandedProducts = (item) => {
        navigation.navigate('SeeAllProduct')
    }
    const categoryListFun = (item) => {
        global.item = item
        navigation.navigate('SubCategoryList', { item })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <CategoryScreen
                openDrawer={() => navigation.openDrawer()}
                landingSlider={landingSlider}
                productDetailsFun={productDetailsFun}
                shopCategoryData={shopCategoryData}
                subCategoryFun={subCategoryFun}
                productData={productData}
                popularProductData={popularProductData}
                productCategoryData={productCategoryData}

                cartVal={cartVal}
                addCart={addCart}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                CategoryName={CategoryName}
                RecommandedProducts={RecommandedProducts}
                categoryType={categoryType}
                pageSlider={pageSlider}
                previewsSerachFun={previewsSerachFun}
                InnserSubCategoryFun={InnserSubCategoryFun}
                categoryListFun={categoryListFun}

                onEndShopCateReachedFun={onEndShopCateReachedFun}
                setShowIndex={setShowIndex}
                showIndex={showIndex}
                userData={userData}
            />
            <Footer logoType='2' />
        </View>
    )
};
export default Category;