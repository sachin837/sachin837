import React, { useRef } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language'
import styles from './styles'
import { FONT_FAMILY_MEDIUM, FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { RED } from '../../../../utils/colors';
import moment from 'moment'
const OrderList = (props) => {
    const windowWidth = useWindowDimensions().width;
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);
    return (
        <View style={styles.container}>
            <Header />
            <View style={[styles.container, { padding: 10 }]}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#fad7ef', '#f1d5f4']}
                    style={{
                        paddingVertical: 5, height: 180
                    }}>
                    <View style={styles.headerCon}>
                        <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                            <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={styles.headerTxt}>{Language.MyOrders}</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.cartContainer}>
                    <View style={styles.cartInnerCon}>
                        <Text style={styles.currentOrderTxt}>current orders</Text>
                        {props.orderData ?
                            <FlatList
                                data={props.orderData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.flatCon}>
                                            <Text style={styles.txtStyl}>{Language.Date} : {moment(item.delivery_date).format("MMM Do YYYY")}</Text>
                                            <Text style={styles.txtStyl}>{Language.Time} : {moment(item.delivery_time).format("HH:mm")}</Text>
                                            <Text style={styles.txtStyl}>{Language.Status} : <Text style={{ color: item.status == '1' ? RED : item.status == '5' ? RED : '#85c7a8', fontFamily: FONT_FAMILY_BOLD, }}>{item.status == 1 ? 'Pending' : item.status == '2' ? 'Confirmed' : item.status == '3' ? 'On the way ' : item.status == '4' ? 'completed' : item.status == '5' ? 'Cancelled' : null}</Text></Text>
                                            <View style={styles.totalBillSty}>
                                                <Text style={styles.txtStyl}>{Language.TotalBilling} :</Text>
                                                <Text style={{}}> {'\u20AC'} {spanishNumberFormatter.format(item.total_amount)}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.txtStyl}>{Language.Address} : </Text>
                                                <View style={{ width: "75%" }}>
                                                    <Text style={styles.txtStyl}>{item.delivery_address}</Text>
                                                </View>
                                            </View>
                                            <Button
                                                onPress={() => props.OrderDetailsFun(item)}
                                                style={{ alignSelf: "center", marginVertical: 5, }}
                                                buttonText={Language.Details} />
                                        </View>
                                    )
                                }}
                            />
                            :
                            <View style={[styles.emptyContainer, { width: windowWidth }]}>
                                <View>
                                    <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                                </View>
                                <View>
                                    <Text style={styles.emptyTXT}>{Language.orderListmsg}</Text>
                                </View>
                            </View>
                        }
                    </View>

                </View>
            </View>
        </View>
    )
};
export default OrderList;