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

import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, COMMON_BUTTON_COLOR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const SelelctPaymentMethod = (props) => {
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.selectPaymentCon}>
                        <View style={styles.paymentMethodcon}>
                            <Text style={styles.paymentMethodTxt}>{Language.selectPaymentMethod}</Text>
                        </View>
                        <View style={styles.amoutContainer}>
                            <View>
                                <Text style={styles.amoutTxt}>{Language.Totalpayment}</Text>
                            </View>
                            <View style={{ paddingRight: 12 }}>
                                <Text>{'\u20AC'} {spanishNumberFormatter.format(props.totalAmount)}</Text>
                            </View>
                        </View>
                        <View style={styles.paymentMethodCon}>
                            <TouchableOpacity onPress={() => props.paymetType('1')} style={styles.imgCon}>
                                {props.paymentMethod == '1' ?
                                    <Image source={require('../../../../Assets/Group_126.png')} />
                                    :
                                    <Entypo name='circle' style={{ color: '#777777', fontSize: 25 }} />
                                }
                            </TouchableOpacity>
                            <View style={styles.txtCon}>
                                <Text style={styles.methodTxt}>{Language.Cash}</Text>
                            </View>
                        </View>
                        <View style={styles.onlineBtnCon}>
                            <TouchableOpacity onPress={() => props.paymetType('2')} style={styles.imgCon}>
                                {props.paymentMethod == '2' ?
                                    <Image source={require('../../../../Assets/Group_126.png')} />
                                    :
                                    <Entypo name='circle' style={{ color: '#777777', fontSize: 25 }} />
                                }
                            </TouchableOpacity>
                            <View style={styles.txtCon}>
                                <Text style={styles.methodTxt}>{Language.OnlineMathod}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnInnerCon}>
                            <Button
                                onPress={() => props.onOrderPlaced()}
                                style={{ width: '100%' }}
                                buttonText={Language.Checkout} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View >
    )
};
export default SelelctPaymentMethod;