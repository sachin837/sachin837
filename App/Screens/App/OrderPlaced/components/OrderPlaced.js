import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import moment from 'moment'


import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_MEDIUM, FONT_FAMILY_SEMIBOLD, COMMON_BUTTON_COLOR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const OrderDetails = (props) => {
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={styles.linearGra}>
                        <View style={styles.headCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                {/* <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} /> */}
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.headerTxt}>{Language.Orders}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.boxCon}>
                        <View style={styles.billDetailsCon}>
                            <View style={{ height: 40, justifyContent: 'center', paddingLeft: 8, }}>
                                <Text style={{ fontSize: 15, fontFamily: FONT_FAMILY_SEMIBOLD, color: '#a9a9a9' }}>{Language.orderPlace}</Text>
                            </View>
                            <Text style={styles.billDetailsTxt}>{Language.DeliveryDetails}</Text>
                            <View style={styles.billInnerCon}>
                                {props.orderDetailsData ?
                                    <View style={{ paddingLeft: 8 }}>
                                        <Text style={styles.bilTxt}>{Language.Date} : {moment(props.orderDetailsData[0].orderDetails[0].delivery_date).format("MMM Do YYYY")}</Text>
                                        <Text style={styles.bilTxt}>{Language.Time} : {moment(props.orderDetailsData[0].orderDetails[0].delivery_time).format("HH:mm")}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.bilTxt]}>{Language.Status} : </Text>
                                            <Text style={[styles.bilTxt, { fontFamily: FONT_FAMILY_BOLD, color: props.orderDetailsData[0].orderDetails[0].status.status == '1' ? RED : '#85c7a8' }]}>{props.orderDetailsData[0].orderDetails[0].status == 1 ? 'Pending' : props.orderDetailsData[0].orderDetails[0].status == '2' ? 'Confirmed' : props.orderDetailsData[0].orderDetails[0].status == '3' ? 'On the way ' : props.orderDetailsData[0].orderDetails[0].status == '4' ? 'completed' : props.orderDetailsData[0].orderDetails[0].status == '5' ? 'Cancelled' : null}</Text>
                                        </View>
                                        <View style={styles.flexDirec}>
                                            <Text style={styles.bilTxt}>{Language.Address} : </Text>
                                            <View style={{ width: "75%" }}>
                                                <Text style={styles.bilTxt}>{props.orderDetailsData[0].orderDetails[0].delivery_address} </Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                                }

                            </View>
                            <View style={styles.deliverImg}>
                                <Image source={require('../../../../Assets/1122.png')} resizeMode='center' style={{ height: 120, width: 120 }} />
                            </View>
                            <Text style={styles.billDetialTxt}>{Language.BillingDetails}</Text>

                            <View style={styles.headingCon}>
                                <View style={styles.productCon}>
                                    <Text style={styles.productTxt}>{Language.Products}</Text>
                                </View>
                                <View style={styles.QuantityCon}>
                                    <Text style={styles.productTxt}>{Language.Quantity}</Text>
                                </View>
                                <View style={styles.priceCon}>
                                    <Text style={styles.productTxt}>{Language.Price}</Text>
                                </View>
                            </View>
                            {props.orderDetailsData ?
                                <FlatList
                                    data={props.orderDetailsData[0].ordersItems}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.flatCon}>
                                                <View style={styles.productCon}>
                                                    <Text numberOfLines={1} style={styles.flatTxt}>{item.product_name}</Text>
                                                </View>
                                                <View style={styles.quantitytxt}>
                                                    <Text numberOfLines={1} style={styles.flatTxt}>{item.total_unit_qty}</Text>
                                                </View>
                                                <View style={styles.pricetxt}>
                                                    <Text>{'\u20AC'}{spanishNumberFormatter.format(item.total_unit_price)}</Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                                : null
                            }
                            <View style={styles.totalAmoutCon}>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.txtHead}>{Language.TotalAmount}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={styles.addSingTxt}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {props.totalAmount ? spanishNumberFormatter.format(props.totalAmount) : null}</Text>
                                    </View>
                                </View>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.txtHead}>{Language.CouponDiscount}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={[styles.addSingTxt, { color: 'red' }]}>-</Text>
                                        <Text style={{}}>  {'\u20AC'} {props.orderDetailsData ? spanishNumberFormatter.format(props.orderDetailsData[0].orderDetails[0].coupon_discount) : null}</Text>
                                    </View>
                                </View>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.txtHead}>{Language.DeliveryCharge}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={styles.addSingTxt}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {props.orderDetailsData ? spanishNumberFormatter.format(props.orderDetailsData[0].orderDetails[0].delivery_charge) : null}</Text>
                                    </View>
                                </View>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.taxSty}>{Language.peparBugCharge}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={styles.addSingTxt}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {props.orderDetailsData ? spanishNumberFormatter.format(props.orderDetailsData[0].orderDetails[0].paper_bag_charge) : null}</Text>
                                    </View>
                                </View>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.taxSty}>{Language.InculdTax}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={styles.addSingTxt}></Text>
                                        <Text style={{}}>  {'\u20AC'} {props.orderDetailsData ? spanishNumberFormatter.format(props.orderDetailsData[0].orderDetails[0].total_tax) : null}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.totalAmoutTxt}>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.txtHead}>{Language.TotalPay}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={{}}> {'\u20AC'} {props.orderDetailsData ? spanishNumberFormatter.format(props.orderDetailsData[0].orderDetails[0].total_amount) : null}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
};
export default OrderDetails;