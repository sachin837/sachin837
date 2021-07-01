import React, { useEffect, useState, useContext } from 'react';
import {
    View, Text, Image, ImageBackground, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, ScrollView, onChangeText, useWindowDimensions, Keyboard
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import {
    windowHeight
} from '../../../../utils/constants';
import styles from './styles';
const App = (props) => {
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
    const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
    const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");
    return (
        <View style={[styles.Container, { paddingTop: Platform.OS === 'ios' ? 20 : 2 }]}>
            <View style={styles.topImgSty}>
            <Image
                    source={require('../../../../Assets/logoGODschwarzmitPunkten.png')} resizeMode='contain' style={{height:140,width:110}}
                />
            </View>
            <View style={styles.verficationText}>
                <Text title style={{ fontSize: 20 }}>{Language.VERIFICATION}</Text>
                <Text style={styles.enterCodeTxt}>
                    {Language.enterCodeMsg}
                </Text>
                <View style={styles.OTPViewStyle}>
                    <OTPInputView
                        // secureTextEntry={true}
                        code={props.otp}
                        onCodeChanged={(val) => props.otpFun(val)}
                        style={styles.OTPMainStyle}
                        pinCount={6}
                        inputCellLength={1}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />
                </View>
                <View style={styles.btnConatiner}>
                    <Button onPress={() => props.onPressAllMostThere()}
                        style={{ width: '85%', }}
                        buttonText={Language.SUBMIT} />
                    <View style={styles.scoilConatainer}>
                        <Text style={styles.donthaveCode}>{Language.haveNotReceive}</Text>
                        <TouchableOpacity onPress={() => props.resendOtp()}>
                            <Text style={styles.resendTxt}>{Language.resendCode}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                keyboardStatus == 'Keyboard Hidden' &&
                <View style={styles.bottomImg}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../../Assets/splash.png')}
                        style={{ height: windowHeight / 2 - 125, width: '100%' }}
                    />
                </View>
            }
        </View >
    );
};
export default App;























