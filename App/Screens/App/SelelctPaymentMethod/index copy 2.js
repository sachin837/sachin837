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
    }

    const cartClear = async (item) => {
        setCartVal([])
        await AsyncStorage.removeItem('cartData');
        navigation.navigate('OrderPlaced', { item })
    }

    const paymetType = (value) => {
        SetPaymentMethod(value)
        value == 2 ? setModalVisStripe(true) : setModalVisStripe(false)
    }

    const onPressPayNow = async (form) => {
        setFormData(form)
        try {
            if (form.status.number === "valid" && form.status.cvc === 'valid' && form.status.expiry === "valid") {
                const expiryArray = form.values.expiry.split('/')
                const params = {
                    number: form.values.number,
                    expMonth: parseInt(expiryArray[0]),
                    expYear: parseInt(expiryArray[1]),
                    cvc: form.values.cvc,
                }
                const tok = await stripe.createTokenWithCard(params)
                console.log("🚀 ~ file: index.js ~ line 91 ~ onPressPayNow ~ tok", tok)
                setStripeToken(tok.tokenId);
            }
            else {
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function _handlePayment() {
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
                'stripe_token': StripeToken,
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

            {paymentMethod == 2 ?
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisStripe}
                    onRequestClose={() => {
                        setModalVisStripe(!modalVisStripe);

                    }}
                >
                    <View style={{ flex: 1, backgroundColor: 'red' }}>
                        <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setModalVisStripe(!modalVisStripe)} style={{ paddingLeft: 5 }}>
                                <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../Assets/arrow_left.png')} />
                            </TouchableOpacity>
                            <Text style={{ paddingLeft: 15 }}>Online Payment</Text>
                        </View>
                        <View>
                            <View style={{ marginTop: 13, marginBottom: 20, borderWidth: 1, borderColor: '#fff', margin: 5, borderRadius: 5, padding: 15 }}>
                                <LiteCreditCardInput
                                    placeholderColor='#fff'
                                    placeholders={{ number: "**** **** **** ****", expiry: "MM/YY", cvc: "CVC" }}
                                    onChange={onPressPayNow}
                                    inputStyle={{ color: "#fff", fontSize: 18 }}
                                    validColor={"#009900"}
                                />
                            </View>
                            {FormData.valid === true &&
                                <Button
                                    style={{ margin: 15 }}
                                    buttonText={"PAY NOW"}
                                    onPress={() => FormData.valid === true && _handlePayment()}
                                />
                            }
                        </View>
                    </View>
                </Modal>
                : null}







            <Footer />
        </View>
    )
};
export default SelelctPaymentMethod;