import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import moment from 'moment'

import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, COMMON_BUTTON_COLOR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const SelelctAddress = (props) => {


    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     console.log('currentDate', event)
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    // };





    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.addressContainerSty}>
                        <View style={styles.addressconTxt}>
                            <Text style={styles.selectAddressTxt}>{Language.selectAddress}</Text>
                        </View>
                        <View style={styles.addListContainer}>

                            <FlatList
                                data={props.addressData}
                                renderItem={({ index, item }) => (
                                    <View style={styles.flatlistContainer}>
                                        <View style={styles.flatInnerCon}>
                                            <TouchableOpacity onPress={() => props.selectAddress(item, index)} style={{ width: 30 }}>
                                                <Feather name={props.showIndex == index ? 'check-circle' : 'circle'} style={styles.circleView} />
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '85%' }}>
                                                    <Text style={styles.addTxt}>{Language.houseNoshow} : {item.house_no}</Text>
                                                    <Text style={styles.addTxt}>{item.address}</Text>
                                                    <Text style={styles.addTxt}>{Language.Landmark} : {item.landmark}</Text>
                                                    <Text style={styles.addTxt}>{Language.City} : {item.city}</Text>
                                                    <Text style={styles.addTxt}>{Language.Pincode} : {item.pin_code}</Text>
                                                </View>
                                                <View style={styles.editBtnCon}>
                                                    <TouchableOpacity onPress={() => props.editAddress(item)}>
                                                        <FontAwesome name='edit' style={styles.editBtnTxt} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.address}
                            />
                        </View>
                        <View style={{ margin: 15, borderTopColor: '#a9a9a9', borderTopWidth: 1 }}>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontSize: 15, fontFamily: FONT_FAMILY_SEMIBOLD, color: '#a9a9a9' }} >{Language.selectDateTime}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => props.showDatepicker()} style={{ flexDirection: 'row', width: '45%', margin: 5, borderBottomWidth: 1, borderBottomColor: '#a9a9a9', paddingBottom: 5 }}>
                                    <FontAwesome name='calendar' style={{ paddingLeft: 3, color: '#a9a9a9', fontSize: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontFamily: FONT_FAMILY_REGULAR, color: '#a9a9a9' }}>{props.date ? moment(props.date).format("MMM Do YYYY") : Language.Date}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.showTimepicker()} style={{ flexDirection: 'row', width: '45%', margin: 5, borderBottomWidth: 1, borderBottomColor: '#a9a9a9', paddingBottom: 5 }}>
                                    <FontAwesome name='clock-o' style={{ paddingLeft: 3, color: '#a9a9a9', fontSize: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontFamily: FONT_FAMILY_REGULAR, color: '#a9a9a9' }}>{props.time ? moment(props.time, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A') : Language.Time}</Text>
                                </TouchableOpacity>
                            </View>
                            {props.monSatMsg &&
                                <View style={styles.anotherMsgCon}>
                                    <Text style={styles.anotherTxt}>{Language.anotherDataTime}</Text>
                                </View>
                            }
                            {props.pastTime &&
                                <View style={styles.anotherMsgCon}>
                                    <Text style={styles.anotherTxt}>{Language.pastTimeMsg}</Text>
                                </View>
                            }

                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                onPress={() => props.AddAddress()}
                                style={{ width: '100%' }}
                                buttonText={Language.addNewAddress} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                onPress={() => props.onSelelctPaymentMethod()}
                                style={{ width: '100%' }}
                                buttonText={Language.ProceedForPayment} />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View >
    )
};
export default SelelctAddress;