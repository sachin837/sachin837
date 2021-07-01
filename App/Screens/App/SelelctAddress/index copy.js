import React, { useState } from 'react';
import { View, Alert, Modal, Text, Platform, TouchableOpacity } from 'react-native';
import SelelctAddressScreen from './components/SelelctAddress'
import { useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import Button from '../../../components/Button';
import styles from './components/styles'
import Footer from '../../../components/Footer'
const SelelctAddress = ({ navigation, route }) => {
    const { totalAmount, couponCodeData, couponDis, DeliveryCharge, tax } = route.params
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [addressData, setAddressData] = useState('');
    const [selectaddressData, setSelectAddressData] = useState('');
    const [showIndex, setShowIndex] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [mode, setMode] = useState('date');
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [checkSunday, setCheckSunday] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [dateVisible, setDateVisible] = useState(false);
    const [monSatMsg, setMonSatMsg] = useState(false);
    const [pastTime, setPastTime] = useState(false);
    const [dateShowVisible, setDateShowVisible] = useState(false);
    const [timeShowVisible, setTimeShowVisible] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            getAddressList()
        }, [])
    );


    async function getAddressList() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_LIST_ADDRESS);
            if (data.status === 200) {
                setAddressData(data.data)
                setIsLoading(false)
            } else if (data.status === 201) {
                setAddressData('')
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            console.log('Error', e)
        }
    }



    const onSelelctPaymentMethod = async () => {
        const valid = await validationForm()
        if (valid === true) {
            navigation.navigate('SelelctPaymentMethod', { totalAmount, couponCodeData, couponDis, selectaddressData, DeliveryCharge, tax, time, date })
        }
    }
    const onTimeAndDate = async () => {
        setModalVisible(false)
        navigation.navigate('SelelctPaymentMethod', { totalAmount, couponCodeData, couponDis, selectaddressData, DeliveryCharge, tax, time, date })
    }
    const editAddress = () => {
        navigation.navigate('EditAddress')
    }
    const AddAddress = () => {
        navigation.navigate('AddAddress')
    }

    function validationForm() {
        if (selectaddressData == '') {
            setAlertMessage(Language.selectAddress);
            AnimatedAlert.showAlert()
            return false;
        }
        if (date == '') {
            setAlertMessage(Language.selectDate);
            AnimatedAlert.showAlert()
            return false;
        }
        if (time == '') {
            setAlertMessage(Language.selectTime);
            AnimatedAlert.showAlert()
            return false;
        }
        if (moment(date).weekday() == checkSunday) {
            setDateVisible(true)
            setMonSatMsg(true)
            return false;
        } else {
            setMonSatMsg(false)
        }
        var format = 'HH:mm:ss'
        var timesss = moment(time).format(format)
        var times = moment(timesss, format)
        var beforeTime = moment('09:00:00', format)
        var afterTime = moment('20:00:00', format);
        console.log('sfdsf', time > new Date())
        if (time > new Date()) {
            if (times.isBetween(beforeTime, afterTime)) {
                setPastTime(false)
            } else {
                setMonSatMsg(true)
                setModalVisible(true)
                setPastTime(false)
                return false;
            }
        } else {
            setPastTime(true)
            return false;
        }

        return true;
    };
    const selectAddress = async (item, index) => {
        setShowIndex(index)
        setSelectAddressData(item.address)
    }

    const onChangeDate = (event, selectedValue) => {
        const selectedDate = selectedValue || new Date();
        setDate(selectedDate);
        setDateShowVisible(!dateShowVisible)
        setTime('');
        setShowDate(false);
    };

    const onChangeTime = (event, selectedValue) => {
        const selectedTime = selectedValue || new Date();
        setTime(selectedTime);
        setTimeShowVisible(!timeShowVisible);
        setShowTime(false);
    };


    const showDatepicker = () => {
        setDateShowVisible(!dateShowVisible)
        setShowDate(true)
        setMonSatMsg(false)
    };

    const showTimepicker = () => {
        setTimeShowVisible(!timeShowVisible)
        setShowTime(true)
        setPastTime(false)
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <SelelctAddressScreen
                openDrawer={() => navigation.openDrawer()}
                onSelelctPaymentMethod={onSelelctPaymentMethod}
                editAddress={editAddress}
                AddAddress={AddAddress}
                addressData={addressData}
                selectAddress={selectAddress}
                showIndex={showIndex}
                showDatepicker={showDatepicker}
                showTimepicker={showTimepicker}

                date={date}
                time={time}
                monSatMsg={monSatMsg}
                pastTime={pastTime}
            />

            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={timeShowVisible}
                onRequestClose={() => {
                    setTimeShowVisible(!timeShowVisible);
                }}
             >
                <View style={styles.timeModelCon}>
                    <View style={styles.timeInnderCon} >
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 10 }}>
                            <TouchableOpacity onPress={() => setTimeShowVisible(!timeShowVisible)}>
                                <Entypo name='circle-with-cross' size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{height:100}}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'time'}
                                format="YYYY-MM-DD HH:mm"
                                is24Hour={true}
                                display={'spinner'}
                                // minimumDate={date}
                                // selectedTime={new Date()}
                                textColor={PINK_COLOR_CODE}
                                onChange={onChangeTime}
                                
                            />
                    </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={dateShowVisible}
                onRequestClose={() => {
                    setDateShowVisible(!dateShowVisible);
                }}
            >
                <View style={styles.timeModelCon}>
                    <View style={styles.timeInnderCon} >
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 10 }}>
                            <TouchableOpacity onPress={() => setDateShowVisible(!dateShowVisible)}>
                                <Entypo name='circle-with-cross' size={25} />
                            </TouchableOpacity>
                        </View>
                        {showDate && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'date'}
                                format="YYYY-MM-DD HH:mm"
                                is24Hour={true}
                                display={'spinner'}
                                textColor={PINK_COLOR_CODE}
                                onChange={onChangeDate}
                                minimumDate={new Date()}
                                
                            />
                        )}
                    </View>
                </View>
            </Modal>




            <Modal
                animationType="slide"
                transparent={true}
                visible={dateVisible}
                onRequestClose={() => {
                    setDateVisible(!dateVisible);
                }}
            >
                <View style={styles.timeModelCon}>
                    <View style={styles.timeInnderCon} >
                        <View style={styles.timeDataMsgCon}>
                            <Text style={styles.timeDataMsgTxt}>{Language.sundayDeliveryMsg}</Text>
                        </View>
                        <View style={styles.timeDateBtnCon}>
                            <Button
                                onPress={() => setDateVisible(!dateVisible)}
                                style={{ width: '40%', height: 35 }}
                                buttonText={Language.Cancel} />
                            <Button
                                onPress={() => { setCheckSunday(1), setDateVisible(false) }}
                                style={{ width: '40%', marginLeft: 10, height: 35 }}
                                buttonText={Language.OK} />
                        </View>
                    </View>
                </View>
            </Modal>

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
                            <Text style={styles.timeDataMsgTxt}>{Language.sundayDeliveryMsg}</Text>
                        </View>
                        <View style={styles.timeDateBtnCon}>
                            <Button
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{ width: '40%', height: 35 }}
                                buttonText={Language.Cancel} />
                            <Button
                                onPress={() => onTimeAndDate()}
                                style={{ width: '40%', marginLeft: 10, height: 35 }}
                                buttonText={Language.OK} />
                        </View>
                    </View>
                </View>
            </Modal>


            <Footer />
        </View>
    )
};
export default SelelctAddress;