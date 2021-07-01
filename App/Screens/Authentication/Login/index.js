import React, { useState, useEffect, useContext } from 'react';
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import Login from './Components/Login';
import { AuthContext, UserDataContext } from '../../../utils/UserContext';
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
const LoginView = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    const [userData, setUserData] = useContext(UserDataContext);
    const [mobileNo, setMobileNo] = useState('');
    const [countyPicker, setCountyPicker] = useState(false)
    const [countryData, setCountryData] = useState(CountryArray)
    const [countryCode, setCountryCode] = useState('+49')
    const [countryFlag, setCountryFlag] = useState('🇩🇪')
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    useEffect(() => {
        oneTimeShowSlider()
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '698726724893-26f56upiqc6aqm1ickjfhifropcb3l6b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    const oneTimeShowSlider = async () => {
        await AsyncStorage.setItem('sliderShow', '01');
    }

    const onPressGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userInfo ", userInfo);
            if (userInfo) {
                onGoogle(userInfo)
            }
            console.log("userInfo ", userInfo);
            // this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }


    async function onGoogle(userInfo) {
        const deviceToken = await AsyncStorage.getItem("fcmToken")
        const lang = await AsyncStorage.getItem('lang');
        let deviceId = DeviceInfo.getDeviceId();
        let deviceType = DeviceInfo.getDeviceType();
        try {
            setIsLoading(true)
            const params = {
                "name": userInfo.user.name,
                "email": userInfo.user.email,
                "signup_mode": 2,
                "social_id": userInfo.user.id,
                "device_id": deviceId,
                "device_type": deviceType,
                "device_token": deviceToken,
                "accesstoken": userInfo.idToken,
                "language": lang == 'English' ? 1 : 2,
            }
            const { data } = await apiCall('POST', ENDPOINTS.SOCIAL_LOGIN, params);
            console.log('data: ', data.data);
            if (data.status === 200) {
                setDefaultHeader('token', data.data.token)
                signIn(data.data)
                setIsLoading(false)
            } else if (data.status === 201) {
                AnimatedAlert.showAlert()
                setAlertMessage(data.meassage);
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };


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
        const deviceToken = await AsyncStorage.getItem("fcmToken")
        const valid = await validationForm()
        if (valid === true) {
            try {
                setIsLoading(true)
                const params = {
                    "mobile": mobileNo,
                    "country_code": countryCode,
                    "device_token": deviceToken,
                }
                const { data } = await apiCall('POST', ENDPOINTS.MOBILE_NUMBER_CHECK, params);
                console.log('data: ', data.data);
                if (data.status === 200) {
                    if (data.data.user_registration == '1') {
                        await auth().signInWithPhoneNumber(countryCode + mobileNo)
                            .then(confirmations => {
                                console.log('sendingsuccess'),
                                    navigation.navigate('Verification', { confirmations, mobileNo, countryCode, type: 'Login', userData: data.data }),
                                    setIsLoading(false)
                            })
                            .catch(error => {
                                setAlertMessage(error.message);
                                AnimatedAlert.showAlert();
                                console.log(error.message); setIsLoading(false)
                            });
                        setUserData(data.data)
                    } else if (data.data.user_registration == '0') {
                        navigation.navigate('SingUp', { MobileNo: mobileNo, CountryCode: countryCode, type: 'Login' })
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


    const onPressSignUp = () => {
        // navigation.navigate('AllMostThere')
        navigation.navigate('SingUp', { MobileNo: '', CountryCode: '', type: 'Register' })
    }
   

    return (
        <>
            {isLoading &&
                <Loader state={isLoading} />
            }
            <Login
                onPressVerification={onPressVerification}
                onPressSignUp={onPressSignUp}

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
                onPressGoogleLogin={onPressGoogleLogin}
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
export default LoginView;