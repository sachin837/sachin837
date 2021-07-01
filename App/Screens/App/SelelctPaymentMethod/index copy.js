import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Image } from 'react-native';
import SelelctPaymentMethodScreen from './components/SelelctPaymentMethod';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import stripe from "tipsi-stripe";
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
import { join } from 'lodash';
import Footer from '../../../components/Footer'
import Button from '../../../components/Button';
const SelelctPaymentMethod = ({ navigation, route }) => {
    const { totalAmount, couponCodeData, couponDis, selectaddressData, DeliveryCharge, tax, taxDeliveryData, time, date } = route.params
    const [cartVal, setCartVal] = React.useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [paymentMethod, SetPaymentMethod] = useState('1')
    const [modalVisStripe, setModalVisStripe] = useState(false)
    const [FormData, setFormData] = useState('');
    const [StripeToken, setStripeToken] = useState('');
    async function onOrderPlaced() {
        if (paymentMethod == '1') {
            // cash order
            try {
                setIsLoading(true)
                const params = {
                    'total_orders_item': cartVal.length,
                    'coupon_id': couponCodeData.coupon_id,
                    'coupon_code': couponCodeData.coupon_code,
                    'coupon_discount': couponDis,
                    'total_tax': tax,
                    'total_amount': totalAmount,
                    'order_method': paymentMethod,
                    'delivery_address': selectaddressData,
                    'delivery_charge': DeliveryCharge,
                    'referral_code_status': taxDeliveryData.referral_code_status,
                    'referral_code_id': taxDeliveryData.referral_code_id,
                    'paper_bag_charge': taxDeliveryData.paper_bag_charge,
                    'delivery_date': date,
                    'delivery_time': time,
                    'stripe_token': '',
                    'items': JSON.stringify(cartVal)
                }
                const { data } = await apiCall('POST', ENDPOINTS.PLACE_ORDER, params);
                if (data.status == 200) {
                    cartClear(data.data[0])
                    setIsLoading(false)
                } else if (data.status === 201) {
                    // setAddressData('')
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setIsLoading(false)
                }
            } catch (e) {
                setIsLoading(false)
                console.log('Error', e)
            }
        } else {
            //Online order bye Stripe call
            onPressPayNow()
        }
    }

    const cartClear = async (item) => {
        setCartVal([])
        await AsyncStorage.removeItem('cartData');
        navigation.navigate('OrderPlaced', { item })
    }

    const paymetType = (value) => {
        SetPaymentMethod(value)
    }

    const onPressPayNow = async (form) => {
        stripe.paymentRequestWithCardForm({
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'zip'
        })
            .then(async (res) => {
                if (res) {
                    // Stripe Token 
                    try {
                        setIsLoading(true)
                        const params = {
                            'total_orders_item': cartVal.length,
                            'coupon_id': couponCodeData.coupon_id,
                            'coupon_code': couponCodeData.coupon_code,
                            'coupon_discount': couponDis,
                            'total_tax': tax,
                            'total_amount': totalAmount,
                            'order_method': paymentMethod,
                            'delivery_address': selectaddressData,
                            'delivery_charge': DeliveryCharge,
                            'referral_code_status': taxDeliveryData.referral_code_status,
                            'referral_code_id': taxDeliveryData.referral_code_id,
                            'paper_bag_charge': taxDeliveryData.paper_bag_charge,
                            'delivery_date': date,
                            'delivery_time': time,
                            'stripe_token': res.id,
                            'items': JSON.stringify(cartVal)
                        }
                        const { data } = await apiCall('POST', ENDPOINTS.PLACE_ORDER, params);
                        if (data.status == 200) {
                            cartClear(data.data[0])
                            setIsLoading(false)
                        } else if (data.status === 201) {
                            // setAddressData('')
                            setIsLoading(false)
                        } else if (data.status === 401) {
                            setIsLoading(false)
                        }
                    } catch (e) {
                        setIsLoading(false)
                        console.log('Error', e)
                    }
                } else {
                    setAlertMessage('Payment failed please check card details');
                    AnimatedAlert.showAlert();
                }
            })
            .catch(err => {
                setAlertMessage(err.toString());
                AnimatedAlert.showAlert();
            })
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <SelelctPaymentMethodScreen
                openDrawer={() => navigation.openDrawer()}
                onOrderPlaced={onOrderPlaced}
                SetPaymentMethod={SetPaymentMethod}
                paymentMethod={paymentMethod}
                totalAmount={totalAmount}
                paymetType={paymetType}
            />
            <Footer />
        </View>
    )
};
export default SelelctPaymentMethod;