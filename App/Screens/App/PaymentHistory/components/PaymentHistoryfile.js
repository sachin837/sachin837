import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language';
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const PaymentHistory = (props) => {
    const windowWidth = useWindowDimensions().width;
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={styles.linerCON}>

                        <View style={styles.headerCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.headerTxt}>{Language.PaymentHistory}</Text>
                            </View>
                        </View>

                    </LinearGradient>
                    <View style={styles.topContainer}>
                        {/* <FlatList
                            data={[{ 'id': 1 }, { 'id': 1 }, { 'id': 1 },]}
                            renderItem={({ item }) => (
                                <View style={styles.flatCon}>
                                    <View style={{ padding: 12, }}>
                                        <View style={{}}>
                                            <Text style={styles.txtCon}>{Language.TransactionId} : 74312349503</Text>
                                        </View>
                                        <Text style={styles.txtCon}>{Language.Date} : 06/05/2021      {Language.Time}: 02:09 PM</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.txtCon}>{Language.AmountPaid} : </Text>
                                            <Text> {'\u20AC'} 34 </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.email}
                        /> */}
                          <View style={[styles.emptyContainer, { width: windowWidth }]}>
                                <View>
                                    <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                                </View>
                                <View>
                                    <Text style={styles.emptyTXT}>{Language.paymentHistoryListmsg}</Text>
                                </View>
                            </View>
                    </View>
                </View>

            </View>
        </View>
    )
};
export default PaymentHistory;