import React, { useState, useEffect, useContext } from 'react';
import { Keyboard } from 'react-native';
import Verification from './Components/Verification';
import Loader from '../../../utils/Loader';
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../../utils/UserContext';
import Language from '../../../components/Language';

const VerificationView = ({ navigation, route }) => {
    const { confirmations, mobileNo, countryCode, type, userData } = route.params;
    const { signIn } = React.useContext(AuthContext);
    const [confirmation, setConfirmation] = useState(confirmations);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('')

    const navtoMobileNO = () => {
        navigation.navigate('MobileNumber')
    }
    const navtoForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }
    const onPressLogin = () => {
        navigation.navigate('Home')
    }
    const onPressForgotPass = () => {
        navigation.navigate('ForgotPassword')
    }
    // const onPressAllMostThere = () => {
    //     navigation.navigate('AllMostThere')
    // }


    function validationForm() {
        if (otp.length < 6) {
            setAlertMessage(Language.otpVali);
            AnimatedAlert.showAlert()
            return false;
        }
        return true;
    };

    async function onPressAllMostThere() {
        const valid = validationForm()
        if (valid) {
            try {
                setIsLoading(true)
                const result = await confirmation.confirm(otp);
                if (result) {
                    if (type == 'Login') {
                        setDefaultHeader('token', userData.token)
                        signIn(userData)
                    } else {
                        navigation.navigate('AllMostThere', { mobileNo, countryCode })
                    }
                    setIsLoading(false)
                }
            } catch (e) {
                setAlertMessage(Language.otpVali);
                AnimatedAlert.showAlert()
                setIsLoading(false)
                console.log('Error', e)
            }
        }
    }


    const resendOtp = async () => {
        setOtp('')
        setIsLoading(true)
        auth().signInWithPhoneNumber(countryCode + mobileNo, true)
            .then(confirmResult => { setConfirmation(confirmResult), setIsLoading(false), console.log('sendingsuccess') })
            .catch(error => { alert(error.message); setIsLoading(false) });
    }

    const otpFun = (valu) => {
        setOtp(valu)
        console.log(valu)
    }


    return (
        <>
            {isLoading && <Loader state={isLoading} />}
            <Verification
                navtoMobileNO={navtoMobileNO}
                navtoForgotPassword={navtoForgotPassword}
                onPressAllMostThere={onPressAllMostThere}
                onPressForgotPass={onPressForgotPass}
                setOtp={setOtp}
                otp={otp}
                otpFun={otpFun}
                resendOtp={resendOtp}
            // onPressSignIn={onPressSignIn}
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
export default VerificationView;