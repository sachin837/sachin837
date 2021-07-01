import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Text,
    useWindowDimensions,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput, Alert, Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import InputSpinner from "react-native-input-spinner";
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language'
import styles from './styles'
import _ from 'lodash'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Cart = (props) => {
    const windowWidth = useWindowDimensions().width;
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                {props.cartVal?.length > 0 ?
                    <ScrollView>
                        <View style={styles.cartHeadingCon}>
                            <View style={styles.headingInnerCon}>
                                <View style={{ width: '45%' }}>
                                    <Text style={styles.headignTxt}>{Language.Products}</Text>
                                </View>
                                <View style={styles.QuantityCon}>
                                    <Text style={styles.headignTxt}>{Language.Quantity}</Text>
                                </View>
                                <View style={styles.PriceCon}>
                                    <Text style={styles.headignTxt}>{Language.Price}</Text>
                                </View>
                            </View>
                            <FlatList
                                data={props.cartVal}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.flatCont}>
                                            <View style={styles.productNameCon}>
                                                <View style={{ width: '90%' }}>
                                                    <Text numberOfLines={1} style={styles.productTxt}>{item.product_name}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => props.createTwoButtonAlert(item.product_id)}>
                                                    <Image source={require('../../../../Assets/delete.png')} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.InputSpinnerSty}>
                                                <InputSpinner
                                                    colorMax={PINK_COLOR_CODE}
                                                    colorMin={PINK_COLOR_CODE}
                                                    colorPress={PINK_COLOR_CODE}
                                                    // min={1}
                                                    step={1}
                                                    height={28}
                                                    // width={30}
                                                    skin='square'
                                                    color={PINK_COLOR_CODE}
                                                    buttonTextColor={'#ffffff'}
                                                    value={_.filter(props.cartVal, { product_id: item.product_id })[0]?.total_unit_qty}
                                                    onDecrease={(i) => props.onDecrease(i, item)}
                                                    onIncrease={(i) => props.onIncrease(i, item)}
                                                    buttonStyle={{
                                                        width: 30,
                                                    }}
                                                    inputStyle={{
                                                        color: "#000",
                                                        fontSize: 12,
                                                        paddingBottom: Platform.OS === 'ios' ? 0 : 5,
                                                    }}
                                                    editable={false}
                                                />
                                            </View>
                                            <View style={styles.priceCon}>
                                                <Text>{'\u20AC'} {spanishNumberFormatter.format(item.total_unit_price)}</Text>
                                            </View>
                                        </View>

                                    )
                                }}
                            />
                            <View style={styles.couponCodeCon}>
                                <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)} style={styles.couponCodeView}>
                                    <View style={styles.couponView}>
                                        <Text numberOfLines={1} style={styles.couponCodeTxt}>{Language.couponCode}</Text>
                                    </View>
                                    <View style={{ paddingRight: 17 }}>
                                        <Text style={styles.applyBtnTxt}>{Language.Apply}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.totalAmountCon}>
                                <View style={styles.amoutInner}>
                                    <Text style={styles.amoutHeadTxt}>{Language.TotalAmount}</Text>
                                    <View style={styles.flexDirectionView}>
                                        <Text style={styles.signicon}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {spanishNumberFormatter.format(props.totalAmount)}</Text>
                                    </View>
                                </View>
                                {/* { // 
                                referral_code_status=1 ? 100% discout : null,
                                props.totalTax.tax_type == '2' ? flat:percentag

                                         
                                
                                } */}
                                {props.totalTax.referral_code_status == '1' ?
                                    <View style={styles.amoutInner}>
                                        <Text style={styles.amoutHeadTxt}>{Language.ReferralDiscount} </Text>
                                        <View style={styles.flexDirectionView}>
                                            <Text style={[styles.signicon, { color: 'red' }]}>-</Text>
                                            <Text style={{}}> {'\u20AC'}
                                                {spanishNumberFormatter.format(
                                                    parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.totalAmount)
                                                    + parseFloat(
                                                        props.totalTax.tax_type == '1' ?
                                                            ((props.couponPrice == 'bigDiscout' ? 0 : parseFloat(props.couponPrice) + parseFloat(props.totalAmount)) * props.totalTax.tax / 100).toFixed(2)
                                                            :
                                                            parseFloat(props.totalTax.tax)
                                                    )
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.amoutInner}>
                                        <Text style={styles.amoutHeadTxt}>{Language.CouponDiscount}{props.couponCodeData ? props.couponCodeData.coupon_type == 'flat' ? null : "(" + props.couponCodeData.coupon_price + "%)" : null}</Text>
                                        <View style={styles.flexDirectionView}>
                                            <Text style={[styles.signicon, { color: 'red' }]}>-</Text>
                                            <Text style={{}}> {'\u20AC'} {props.couponPrice == 'bigDiscout' ? 0 : spanishNumberFormatter.format(props.couponPrice)}</Text>
                                        </View>
                                    </View>
                                }

                                <View style={styles.amoutInner}>
                                    <Text style={styles.amoutHeadTxt}>{Language.DeliveryCharge}</Text>
                                    <View style={styles.flexDirectionView}>
                                        <Text style={styles.signicon}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {spanishNumberFormatter.format(props.DeliveryCharge)}</Text>
                                    </View>
                                </View>
                                <View style={styles.amoutInner}>
                                    <Text style={styles.amoutHeadTxt}>{Language.peparBugCharge}</Text>
                                    <View style={styles.flexDirectionView}>
                                        <Text style={styles.signicon}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {spanishNumberFormatter.format(props.taxDeliveryData.paper_bag_charge)}</Text>
                                    </View>
                                </View>

                                {/* <View style={styles.amoutInner}>
                                    <Text style={{ fontFamily: FONT_FAMILY_REGULAR, paddingRight: 25 }}>{Language.Tax} {props.totalTax.tax_type == '1' ? "(" + props.totalTax.tax + "%)" : null}</Text>
                                    <View style={styles.flexDirectionView}>
                                        <Text style={styles.signicon}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {spanishNumberFormatter.format(props.totalTax.tax_type == '1' ?
                                            ((props.couponPrice == 'bigDiscout' ? 0 : parseFloat(props.couponPrice) + parseFloat(props.totalAmount)) * props.totalTax.tax / 100).toFixed(2)
                                            :
                                            parseFloat(props.totalTax.tax))
                                        }
                                        </Text>
                                    </View>
                                </View> */}
                                <View style={styles.amoutInner}>
                                    <Text style={{ fontFamily: FONT_FAMILY_REGULAR, paddingRight: 25 }}>{Language.InculdTax}</Text>
                                    <View style={styles.flexDirectionView}>
                                        <Text style={styles.signicon}></Text>
                                        <Text style={{}}>  {'\u20AC'}
                                            {/* (29,5/119)*19 == 4,71€*/}
                                            {spanishNumberFormatter.format(
                                                (((parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.totalAmount) +
                                                    parseFloat(props.DeliveryCharge) + parseFloat(props.taxDeliveryData.paper_bag_charge)
                                                    - parseFloat(props.couponPrice)) / 119) * 19).toFixed(2)
                                            )
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.totalAmountView}>
                                <View style={styles.flexDirectionView}>
                                    <Text style={styles.amoutHeadTxt}>{Language.TotalPay}</Text>
                                    <View style={styles.flexDirectionView}>
                                        <Text style={{}}> {'\u20AC'} {spanishNumberFormatter.format(
                                            props.totalTax.referral_code_status == '2' ?
                                                parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.totalAmount) + parseFloat(props.DeliveryCharge) + parseFloat(props.taxDeliveryData.paper_bag_charge)
                                                // + parseFloat(
                                                //     props.totalTax.tax_type == '1' ?
                                                //         ((props.couponPrice == 'bigDiscout' ? 0 : parseFloat(props.couponPrice) + parseFloat(props.totalAmount)) * props.totalTax.tax / 100).toFixed(2)
                                                //         :
                                                //         parseFloat(props.totalTax.tax)

                                                // )
                                                - parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.couponPrice)
                                                : parseFloat(props.DeliveryCharge) + parseFloat(props.taxDeliveryData.paper_bag_charge)

                                        )}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.btnCon}>
                                <Button
                                    onPress={() => props.onSelelctAddress(
                                        props.totalTax.referral_code_status == '2' ?
                                            parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.totalAmount) + parseFloat(props.DeliveryCharge) + parseFloat(props.taxDeliveryData.paper_bag_charge)
                                            /* + parseFloat(
                                                props.totalTax.tax_type == '1' ?
                                                    ((props.couponPrice == 'bigDiscout' ? 0 : parseFloat(props.couponPrice) + parseFloat(props.totalAmount)) * props.totalTax.tax / 100).toFixed(2)
                                                    :
                                                    parseFloat(props.totalTax.tax)

                                            ) */
                                            - parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.couponPrice)
                                            : parseFloat(props.DeliveryCharge) + parseFloat(props.taxDeliveryData.paper_bag_charge)
                                        ,

                                        props.couponPrice == 'bigDiscout' ? 0 : props.couponPrice
                                        ,

                                        (((parseFloat(props.couponPrice == 'bigDiscout' ? 0 : props.totalAmount) +
                                            parseFloat(props.DeliveryCharge) + parseFloat(props.taxDeliveryData.paper_bag_charge)
                                            - parseFloat(props.couponPrice)) / 119) * 19).toFixed(2)

                                    )}
                                    style={{ width: '100%' }}
                                    buttonText={Language.Checkout} />


                                <View style={styles.checkboxContainer}>
                                    <TouchableOpacity onPress={() => props.setSelection(!props.isSelected)} style={{ flexDirection: 'row', paddingRight: 10, paddingTop: 5 }}>
                                        {props.isSelected ?
                                            <MaterialIcons name='check-circle-outline' style={{ color: PINK_COLOR_CODE, fontSize: 25 }} />
                                            :
                                            <MaterialIcons name='radio-button-unchecked' style={{ color: PINK_COLOR_CODE, fontSize: 25 }} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.onTermsAndConditon()} style={{ paddingTop: 8 }}>
                                        <Text style={styles.continueTxt}>{Language.termsAndConditon}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button
                                    onPress={() => props.onContinueToShop()}
                                    style={{ width: '100%', marginTop: 8 }}
                                    buttonText={Language.ContinueShopping} />

                            </View>
                        </View>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={props.modalVisible}
                            onRequestClose={() => {
                                props.setModalVisible(!props.modalVisible);
                            }}>
                            <View style={styles.modelCon}>
                                <View style={styles.modelInnerCon}>
                                    <View style={styles.closeBtnCon}>
                                        <Text style={styles.couponTxt}>{Language.appliedCounpon}</Text>
                                        <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)} style={{ paddingRight: 10 }}>
                                            <Image source={require('../../../../Assets/add-filled.png')} tintColor='#8333f8' style={{ height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.modelInput}>
                                        <TextInput
                                            placeholder={Language.enterCoupon}
                                            placeholderTextColor='#a9a9a9'
                                            style={styles.inputCont}
                                            value={props.couponCode}
                                            onChangeText={(val) => props.setCouponCode(val)}
                                        />
                                    </View>
                                    <View style={styles.modelBtnCon}>
                                        <Button
                                            onPress={() => props.couponCodeFun()}
                                            style={{ width: '100%' }}
                                            buttonText={Language.Apply} />
                                    </View>

                                </View>
                            </View>
                        </Modal>


                    </ScrollView>
                    :
                    <View style={[styles.emptyContainer, props.isLoading ? null : { elevation: Platform.OS === 'ios' ? 1 : 2, }]}>
                        <View>
                            <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                        </View>
                        <View>
                            <Text style={styles.emptyTXT}>{Language.cartEmptyList}</Text>
                        </View>
                    </View>
                }



            </View>
        </View>
    )
};
export default Cart;