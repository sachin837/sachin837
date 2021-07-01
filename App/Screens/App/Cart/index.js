import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";

import CartScreen from './components/Cart'
import { CartContext } from '../../../utils/UserContext';
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
const Cart = ({ navigation }) => {
    useIsFocused();
    const [cartVal, setCartVal] = React.useContext(CartContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponCodeData, setCouponCodeData] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [DeliveryCharge, setDeliveryCharge] = useState(0)
    const [taxDeliveryData, setTaxDeliveryData] = useState(0)
    const [totalTax, setTotalTax] = useState(0)
    const [isSelected, setSelection] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            TaxDeliveryFun()
        }, [navigation])
    );

    async function TaxDeliveryFun() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_TAX_DELIVERY_CHARGE);
            if (data.status === 200) {
                setIsLoading(false)
                setTaxDeliveryData(data.data)
                setDeliveryCharge(data.data.delivery_charge)
                setTotalTax(data.data)
                // setProductCategoryData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };


    const onSelelctAddress = (totalAmount, couponDis, tax) => {
        // navigation.navigate('PaymentMethod')
        isSelected ?
            navigation.navigate('SelelctAddress', { totalAmount, couponCodeData, couponDis, DeliveryCharge, tax, taxDeliveryData })
            :
            setAlertMessage(Language.checkTermsAndCondition);
        AnimatedAlert.showAlert()

    }
    const onContinueToShop = () => {
        navigation.navigate('DashBoard')
    }
    const onTermsAndConditon = () => {
        navigation.navigate('TermsAndConditon')
    }

    const createTwoButtonAlert = (id) =>
        Alert.alert(
            "",
            Language.deleteProduct,
            [
                {
                    text: Language.Cancel,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: Language.OK, onPress: () => deleteProduct(id) }
            ]
        );

    const deleteProduct = async (productId) => {
        const filteredItems = cartVal.filter(item => item.product_id !== productId)
        setCartVal(filteredItems)
        await AsyncStorage.setItem('cartData', JSON.stringify(filteredItems));
    }

    const onIncrease = async (i, item) => {
        var newArr = cartVal.map(function (data) {
            return data.product_id === item.product_id ? {
                product_id: item.product_id,
                product_name: item.product_name,
                cat_id: item.cat_id,
                product_unit_qty: item.product_unit_qty,
                unit_qty: item.unit_qty,
                product_unit_price: item.product_unit_price,
                total_unit_qty: i,
                total_unit_price: item.product_unit_price * i,
                product_description: item.product_description,
                image: item.image_url,
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
                    product_unit_price: item.product_unit_price,
                    total_unit_qty: i,
                    total_unit_price: item.product_unit_price * i,
                    product_description: item.product_description,
                    image: item.image_url,
                }
                    :
                    data;
            });
            setCartVal(newArr)
            await AsyncStorage.setItem('cartData', JSON.stringify(newArr));
        }

    }


    function validationForm() {
        if (couponCode == '') {
            setAlertMessage(Language.enterCouponCode);
            AnimatedAlert.showAlert()
            return false;
        }
        return true;
    };
    async function couponCodeFun() {
        const valid = await validationForm()
        if (valid === true) {
            try {
                setIsLoading(true)
                const params = {
                    'coupon_code': couponCode
                }
                const { data } = await apiCall('POST', ENDPOINTS.USE_COUPON_CODE, params);

                console.log('ddadad', data)
                if (data.status === 200) {
                    setCouponCodeData(data.data)
                    setIsLoading(false)
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setModalVisible(!modalVisible)
                } else if (data.status === 201) {
                    setCouponCodeData('')
                    setIsLoading(false)
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setModalVisible(!modalVisible)
                } else if (data.status === 401) {
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
            }
        }
    };


    const conditionCheck = (value) => {
        alert(value)

    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {isLoading && <Loader state={isLoading} />}
            <CartScreen
                openDrawer={() => navigation.openDrawer()}
                onSelelctAddress={onSelelctAddress}
                createTwoButtonAlert={createTwoButtonAlert}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                cartVal={cartVal}
                totalAmount={cartVal.reduce(
                    (prevValue, currentValue) => prevValue + (currentValue.total_unit_qty * currentValue.product_unit_price),
                    0
                )}
                setCouponCode={setCouponCode}
                couponCode={couponCode}
                couponCodeFun={couponCodeFun}
                couponPrice={couponCodeData ? couponCodeData.coupon_type == 'flat' ?
                    ((cartVal.reduce(
                        (prevValue, currentValue) => prevValue + (currentValue.total_unit_qty * currentValue.product_unit_price),
                        0
                    ) - couponCodeData.coupon_price).toFixed(2)) > 0 ?
                        couponCodeData.coupon_price
                        : 'bigDiscout'
                    :
                    (cartVal.reduce(
                        (prevValue, currentValue) => prevValue + (currentValue.total_unit_qty * currentValue.product_unit_price),
                        0
                    ) * couponCodeData.coupon_price / 100).toFixed(2) : 0
                }

                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                couponCodeData={couponCodeData}
                DeliveryCharge={DeliveryCharge}
                isLoading={isLoading}

                // couponPrice={couponCodeData ? couponCodeData : 0}
                totalTax={totalTax}
                onContinueToShop={onContinueToShop}
                taxDeliveryData={taxDeliveryData}
                onTermsAndConditon={onTermsAndConditon}
                isSelected={isSelected}
                conditionCheck={conditionCheck}
                setSelection={setSelection}
            />
            <Footer logoType='5' />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default Cart;