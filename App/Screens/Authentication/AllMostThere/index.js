import React, { useState, useEffect, useContext } from 'react';
import { Keyboard } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import AllMostThere from './Components/AllMostThere';
import { AuthContext, UserDataContext } from '../../../utils/UserContext';
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

const AllMostThereView = ({ navigation, route }) => {
    const { mobileNo, countryCode } = route.params;
    // var mobileNo, countryCode;
    const { signIn } = React.useContext(AuthContext);
    const [userData, setUserData] = useContext(UserDataContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [addressAuto, setAddressAuto] = useState();
    const [registrationData, setRegistrationData] = useState({
        name: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        city: '',
        landMark: '',
        pin_code: '',
        houseNo: '',
        referral_code: null
    })

    const navtoMobileNO = () => {
        navigation.navigate('MobileNumber')
    }
    const navtoForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    const onPressForgotPass = () => {
        navigation.navigate('ForgotPassword')
    }

    function validationForm() {
        if (registrationData.name == '') {
            setAlertMessage(Language.enterName);
            AnimatedAlert.showAlert()
            return false;
        }
        if (registrationData.email == '') {
            setAlertMessage(Language.enterEmail);
            AnimatedAlert.showAlert()
            return false;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(registrationData.email) === false) {
            AnimatedAlert.showAlert()
            setAlertMessage(Language.enterCorrectEmail);
            return false;
        }
        if (registrationData.houseNo == '') {
            setAlertMessage(Language.houseNo);
            AnimatedAlert.showAlert()
            return false;
        }
        if (registrationData.address == '') {
            setAlertMessage(Language.enterAddress);
            AnimatedAlert.showAlert()
            return false;
        }
        // if (registrationData.landMark == '') {
        //     setAlertMessage(Language.landMark);
        //     AnimatedAlert.showAlert()
        //     return false;
        // }
        if (addressAuto?.city ? addressAuto.city == '' : registrationData.city == '') {
            setAlertMessage(Language.city);
            AnimatedAlert.showAlert()
            return false;
        }
        if (addressAuto?.pin_code ? addressAuto.pin_code == '' : registrationData.pin_code == '') {
            setAlertMessage(Language.pinCode);
            AnimatedAlert.showAlert()
            return false;
        }
        return true;
    };


    async function onPressSignIn() {
        const deviceToken = await AsyncStorage.getItem("fcmToken")
        const lang = await AsyncStorage.getItem('lang');
        let deviceId = DeviceInfo.getDeviceId();
        let deviceType = DeviceInfo.getDeviceType();
        const valid = await validationForm()
        if (valid === true) {

            try {
                setIsLoading(true)
                const params = {
                    "name": registrationData.name,
                    "email": registrationData.email,
                    "mobile": mobileNo,
                    "country_code": countryCode,
                    "device_id": deviceId,
                    "device_type": deviceType,
                    "device_token": deviceToken,
                    "latitude": registrationData.latitude,
                    "longitude": registrationData.longitude,
                    "address": registrationData.address,
                    "language": lang == 'English' ? 1 : 2,

                    "address_type": 1,
                    "house_no": registrationData.houseNo,
                    "landmark": registrationData.landMark,
                    "city": addressAuto.city ? addressAuto.city : registrationData.city,
                    "pin_code": addressAuto.pin_code ? addressAuto.pin_code : registrationData.pin_code,
                    "referral_code": registrationData.referral_code

                }
                console.log('params', params)
                const { data } = await apiCall('POST', ENDPOINTS.USER_REGISTRATION, params);
                console.log('data: ', data.data);
                if (data.status === 200) {
                    setUserData(data.data)
                    setDefaultHeader('token', data.data.token)
                    signIn(data.data)
                    setIsLoading(false)
                } else if (data.status === 201) {
                    setIsLoading(false)
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                } else if (data.status === 401) {
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
            }
        }
    };

    function getAddressObject(address_components) {
        var ShouldBeComponent = {
            home: ["street_number"],
            pin_code: ["postal_code"],
            street: ["street_address", "route"],
            region: [
                "administrative_area_level_1",
                "administrative_area_level_2",
                "administrative_area_level_3",
                "administrative_area_level_4",
                "administrative_area_level_5"
            ],
            city: [
                "locality",
                "sublocality",
                "sublocality_level_1",
                "sublocality_level_2",
                "sublocality_level_3",
                "sublocality_level_4"
            ],
            country: ["country"]
        };

        var address = {
            home: "",
            pin_code: "",
            street: "",
            region: "",
            city: "",
            country: ""
        };
        address_components.forEach(component => {
            for (var shouldBe in ShouldBeComponent) {
                if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                    address[shouldBe] = component.long_name;
                }
            }
        });
        setAddressAuto(address)
        console.log("address ", address);
        return address;
    }

    return (
        <>
            {isLoading && <Loader state={isLoading} />}
            <AllMostThere
                navtoMobileNO={navtoMobileNO}
                navtoForgotPassword={navtoForgotPassword}
                onPressForgotPass={onPressForgotPass}
                onPressSignIn={onPressSignIn}
                registrationData={registrationData}
                setRegistrationData={setRegistrationData}
                getAddressObject={getAddressObject}
                addressAuto={addressAuto}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </>
    )
}
export default AllMostThereView;