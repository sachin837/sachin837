import React, { useState, useEffect, useContext } from 'react';
import { Keyboard, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import EditMobileNo from './Components/EditMobileNo';
import { AuthContext } from '../../../utils/UserContext';
import CountryArray from './Components/countryData';
import AnimatedAlert from '../../../components/AnimatedAlert';
import Loader from '../../../utils/Loader';
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import Language from '../../../components/Language';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import Footer from '../../../components/Footer'
const EditMobileNoView = ({ navigation, route }) => {
    const { profileData } = route.params;
    console.log("route.params ", route.params);
    const { signIn } = React.useContext(AuthContext);
    const [mobileNo, setMobileNo] = useState(profileData.mobile);
    const [countyPicker, setCountyPicker] = useState(false)
    const [countryData, setCountryData] = useState(CountryArray)
    const [countryCode, setCountryCode] = useState(profileData.country_code)
    const [countryFlag, setCountryFlag] = useState('🇩🇪')
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmation, setConfirmation] = useState('');
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);
    const [verificationStatus, setVerificationStatus] = useState('0');
    const [otp, setOtp] = useState('')

    useEffect(() => {
        setVerificationStatus('0')
    }, []);

    async function handleCountryCode(search) {
        // setCountryCode(search)
        if (search) {
            if (isNaN(search)) {
                let array = CountryArray.filter(l => {
                    return l.name.includes(search)
                });
                setCountryData(array)
            } else {
                let array = CountryArray.filter(l => {
                    return l.dial_code.includes(+search)
                });
                setCountryData(array)
            }
        } else {
            setCountryData(CountryArray)
        }

    }

    async function selectCountryData(countryCode, flag) {
        setCountryData(CountryArray)
        setCountryCode(countryCode)
        setCountryFlag(flag)
        setCountyPicker(false)

    }




    function validationForm() {
        if (mobileNo == '') {
            setAlertMessage(Language.mobileVali);
            AnimatedAlert.showAlert()
            return false;
        }
        return true;
    };

    async function onPressVerification() {
        const valid = await validationForm()
        if (valid === true) {
            try {
                setIsLoading(true)
                const params = {
                    "mobile": mobileNo,
                    "country_code": countryCode,
                }
                const { data } = await apiCall('POST', ENDPOINTS.MOBILE_NUMBER_CHECK, params);
                console.log('data: ', data.data);
                if (data.status === 200) {
                    if (data.data.user_registration == '1') {
                        AnimatedAlert.showAlert()
                        setAlertMessage(Language.mobileNoRegiter);
                    } else if (data.data.user_registration == '0') {
                        await auth().signInWithPhoneNumber(countryCode + mobileNo)
                            .then(confirmations => {
                                setConfirmation(confirmations)
                                setVerificationStatus('1')
                                // navigation.navigate('Verification', { confirmations, mobileNo, countryCode, type: 'Login', userData: data.data }),
                                setIsLoading(false)
                            })
                            .catch(error => {
                                setAlertMessage(error.message);
                                AnimatedAlert.showAlert(); console.log(error.message); setIsLoading(false)
                            });
                    } else {
                        setIsLoading(false)
                        setAlertMessage(data.message);
                        AnimatedAlert.showAlert()
                    }
                    setIsLoading(false)
                } else if (data.status === 201) {
                    AnimatedAlert.showAlert()
                    setAlertMessage(Language.ValiCredentials);
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
            }
        }
    };



    const otpFun = (valu) => {
        setOtp(valu)
        console.log(valu)
    }

    const resendOtp = async () => {
        setOtp('')
        setIsLoading(true)
        await auth().signInWithPhoneNumber(countryCode + mobileNo, true)
            .then(confirmResult => { setConfirmation(confirmResult), setIsLoading(false), console.log('sendingsuccess') })
            .catch(error => { setIsLoading(false) });
    }


    async function onPressAllMostThere() {
        try {
            setIsLoading(true)
            confirmation.confirm(otp)
                .then(async (user) => {
                    const params = {
                        'name': profileData.name,
                        'email': profileData.email,
                        'mobile': mobileNo,
                        'country_code': countryCode,
                    }
                    const { data } = await apiCall('POST', ENDPOINTS.GET_UPDATE_PROFILE, params);
                    console.log('data: 3333', data);
                    if (data.status === 200) {
                        setIsLoading(false)
                        setVerificationStatus('0')
                        navigation.navigate('ProfileDetails')
                    } else if (data.status === 201) {
                        setIsLoading(false)
                    } else if (data.status === 401) {
                        setIsLoading(false)
                    }
                })
                .catch(error => {
                    setIsLoading(false),
                        setAlertMessage('Please Enter Valid OTP');
                    AnimatedAlert.showAlert()
                });



            // const result = await confirmation.confirm(otp);
            // console.log("result ", result);
            // if (result) {
            //     try {
            //         setIsLoading(true)
            //         const params = {
            //             'name': profileData.name,
            //             'email': profileData.email,
            //             'mobile': mobileNo,
            //             'country_code': countryCode,
            //         }
            //         const { data } = await apiCall('POST', ENDPOINTS.GET_UPDATE_PROFILE, params);
            //         console.log('data: 3333', data);
            //         if (data.status === 200) {
            //             setIsLoading(false)
            //             navigation.navigate('ProfileDetails')
            //         } else if (data.status === 201) {
            //             setIsLoading(false)
            //         } else if (data.status === 401) {
            //             setIsLoading(false)
            //         }
            //     } catch (e) {
            //         setIsLoading(false)
            //         console.log('Error', e)
            //     }
            // }else{
            //     alert('ss')
            // }
        } catch (e) {
            setIsLoading(false)
            console.log('Error', e)
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading &&
                <Loader state={isLoading} />
            }
            <EditMobileNo
                onPressVerification={onPressVerification}
                openCountryPicker={() => setCountyPicker(true)}
                setCountyPicker={setCountyPicker}
                countyPicker={countyPicker}
                countryData={countryData}
                handleCountryCode={(val) => handleCountryCode(val)}
                selectCountryData={(val, flag) => selectCountryData(val, flag)}
                countryCode={countryCode}
                countryFlag={countryFlag}

                setMobileNo={setMobileNo}
                mobileNo={mobileNo}
                verificationStatus={verificationStatus}

                setOtp={setOtp}
                otp={otp}
                otpFun={otpFun}
                resendOtp={resendOtp}

                onPressAllMostThere={onPressAllMostThere}
            />
            <Footer />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
}
export default EditMobileNoView;