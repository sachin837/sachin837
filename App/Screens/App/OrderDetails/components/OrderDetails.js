import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Text,
    Image,
    FlatList,
    TouchableOpacity, Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language';
import moment from 'moment'
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_MEDIUM, FONT_FAMILY_SEMIBOLD, COMMON_BUTTON_COLOR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
import { RED } from '../../../../utils/colors';
import Button from '../../../../components/Button';
const OrderDetails = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [modalVisible, setModalVisible] = useState(false);
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
                                <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.headerTxt}>{Language.Orders}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.boxCon}>
                        <View style={styles.billDetailsCon}>
                            <Text style={styles.billDetailsTxt}>{Language.DeliveryDetails}</Text>
                            <View style={styles.billInnerCon}>
                                {props.orderDetailsData ?
                                    <View style={{ paddingLeft: 8 }}>
                                        <Text style={styles.bilTxt}>{Language.Date} : {moment(props.orderDetailsData[0].orderDetails[0].delivery_date).format("MMM Do YYYY")}</Text>
                                        {/* <Text style={styles.bilTxt}>{Language.Time} : 1:00 P.M</Text> */}
                                        <Text style={styles.bilTxt}>{Language.Time} : {moment(props.orderDetailsData[0].orderDetails[0].delivery_time).format("HH:mm")}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.bilTxt]}>{Language.Status} : </Text>
                                            <Text style={[styles.bilTxt, { fontFamily: FONT_FAMILY_BOLD, color: props.orderDetailsData[0].orderDetails[0].status == '1' ? RED : props.orderDetailsData[0].orderDetails[0].status == '5' ? RED : '#85c7a8' }]}>{props.orderDetailsData[0].orderDetails[0].status == 1 ? 'Pending' : props.orderDetailsData[0].orderDetails[0].status == '2' ? 'Confirmed' : props.orderDetailsData[0].orderDetails[0].status == '3' ? 'On the way ' : props.orderDetailsData[0].orderDetails[0].status == '4' ? 'completed' : props.orderDetailsData[0].orderDetails[0].status == '5' ? 'Cancelled' : null}</Text>
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
                            {props.orderDetailsData ?
                                <View style={styles.deliverImg}>
                                    {/* <Image source={require('../../../../Assets/Group_165.png')} resizeMode='contain' style={{ height: 100, width: 100 }} /> */}
                                    {props.orderDetailsData[0].orderDetails[0].status == '1' ?
                                        < TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ marginTop: 8, padding: 8, borderWidth: 1, borderRadius: 8, borderColor: PINK_COLOR_CODE }}>
                                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE }}>Cancel Order</Text>
                                        </TouchableOpacity>
                                        :
                                        props.orderDetailsData[0].orderDetails[0].status == '2' ?
                                            < TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ marginTop: 8, padding: 8, borderWidth: 1, borderRadius: 8, borderColor: PINK_COLOR_CODE }}>
                                                <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE }}>Cancel Order</Text>
                                            </TouchableOpacity>
                                            : null
                                    }
                                </View>
                                :
                                null}
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
                                    <Text style={styles.txtHead}>{Language.peparBugCharge}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={styles.addSingTxt}>+</Text>
                                        <Text style={{}}>  {'\u20AC'} {props.orderDetailsData ? spanishNumberFormatter.format(props.orderDetailsData[0].orderDetails[0].paper_bag_charge) : null}</Text>
                                    </View>
                                </View>
                                <View style={styles.flexDirec}>
                                    <Text style={styles.taxSty}>{Language.InculdTax}</Text>
                                    <View style={styles.flexDirec}>
                                        <Text style={styles.addSingTxt}>+</Text>
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

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.timeModelCon}>
                            <View style={styles.timeInnderCon} >
                                <View style={styles.timeDataMsgCon}>
                                    <Text style={styles.timeDataMsgTxt}>{Language.CancelOder}</Text>
                                </View>
                                <View style={styles.timeDateBtnCon}>
                                    <Button
                                        onPress={() => setModalVisible(!modalVisible)}
                                        style={{ width: '40%', height: 35 }}
                                        buttonText='No' />
                                    <Button
                                        onPress={() => { setModalVisible(!modalVisible), props.cancelOderFun(props.orderDetailsData[0].orderDetails[0]) }}
                                        style={{ width: '40%', marginLeft: 10, height: 35 }}
                                        buttonText='Yes' />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </View >
    )
};
export default OrderDetails;