import React, { useEffect, useState, useContext } from 'react';
import {
    View, Text, Image, ImageBackground, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, ScrollView, onChangeText, useWindowDimensions, Keyboard, Modal, FlatList
} from 'react-native';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import {
    BLACK_COLOR_CODE,
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_BOLD,
    GREY_COLOR_CODE,
    THEME_COLOR_CODE,
    THEME_COLOR_CODE_DARK,
    COMMON_BUTTON_COLOR,
    FONT_FAMILY_MEDIUM,
    FONT_FAMILY_SEMIBOLD,
    THEME_COLOR_CODE_LIGHT,
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
    const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');
    const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
    const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");
    return (
        <View style={[styles.Container, { paddingTop: Platform.OS === 'ios' ? 20 : 2 }]}>
            <View style={styles.TopIMg}>
                <Image
                    source={require('../../../../Assets/logoGODschwarzmitPunkten.png')} resizeMode='contain' style={{ height: 140, width: 110 }}
                />
            </View>
            <View style={styles.loginContainer}>
                <Text title style={{ fontSize: 20 }}>{Language.SIGNUP}</Text>
                {props.type == 'Login' ?
                    <Text style={styles.loginSignTxt}>{Language.aledyNumberRegister}</Text>
                    :
                    null}
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => props.openCountryPicker()} style={styles.countryCodeSty}>
                        <Text style={styles.countryCodeTxt}>{props.countryFlag} {props.countryCode}</Text>
                        <Image resizeMode="center" tintColor='#000' style={styles.dropImgSty}
                            source={require('../../../../Assets/down_arrow.png')} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder={Language.enterMobileNo}
                        placeholderTextColor='#666666'
                        style={styles.inputSty}
                        keyboardType='number-pad'
                        onChangeText={(val) => {
                            if (val.length > 12) {
                            } else {
                                props.setMobileNo(val)
                            }
                        }
                        }
                        value={props.mobileNo}
                    />
                </View>
                <Button onPress={() => props.onPressVerification()}
                    style={{ width: '85%', marginTop: 30 }}
                    buttonText={Language.SUBMIT} />
                <View style={styles.dontHaveAccount}>
                    <Text style={styles.dontHaveAccountTxt}>{Language.allReadyHave}</Text>
                    <TouchableOpacity onPress={() => props.onPressSignIn()}>
                        <Text style={styles.registerTxt}> {Language.LOGIN}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.continueWithSty}>{Language.continueWith}</Text>
                {Platform.OS === 'ios' ?
                    null
                    :
                    <View style={styles.socialContianer}>
                        <TouchableOpacity
                            onPress={() => props.onPressGoogleLogin()}
                        >
                            <Image style={{ height: 33, width: 33 }} source={require('../../../../Assets/GOOGLE.png')} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ marginLeft: 8 }}
                    // onPress={() => props.onPressFacebookLogin()}
                    >
                        <Image style={{ height: 35, width: 35 }} source={require('../../../../Assets/FACEBOOK.png')} />
                    </TouchableOpacity> */}
                    </View>
                }
            </View>
            {
                keyboardStatus == 'Keyboard Hidden' &&
                <View style={styles.bottomImgSty}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../../Assets/splash.png')}
                        style={{ height: windowHeight / 2 - 125, width: '100%' }}
                    />
                </View>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.countyPicker}
                onRequestClose={() => {
                    props.setCountyPicker(!props.countyPicker)
                }}
            >
                <View style={styles.countyModelCon}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.searchInputCon}>
                            <TextInput
                                // keyboardType="phone-pad"
                                onChangeText={(text) => props.handleCountryCode(text)}
                                // value={props.countryCode}
                                placeholder='Search...'
                                style={styles.serchInput}
                                placeholderTextColor={'#a9a9a9'}
                            />
                        </View>
                        <TouchableOpacity onPress={() => props.setCountyPicker(!props.countyPicker)} style={{ paddingRight: 30, }}>
                            <Image source={require('../../../../Assets/add-filled.png')} tintColor='#a9a9a9' resizeMode='center' style={{ height: 35, width: 35 }} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={props.countryData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => props.selectCountryData(item.dial_code, item.flag)}
                                style={styles.countryCodeSelect}>
                                <Text style={{ textAlign: "left", width: 30 }}>{item.flag}</Text>
                                <Text style={{ textAlign: "left", width: 40 }}>{item.dial_code}</Text>
                                <Text style={{ marginLeft: 10, textAlign: "left" }}>{item.name}</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </Modal>
        </View>
    );
};
export default App;