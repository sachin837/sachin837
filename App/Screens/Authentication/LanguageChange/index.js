import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, Dimensions, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import {
    COMMON_COLOR_CODE, BLACK_COLOR_CODE,
    FONT_FAMILY_REGULAR,
    WHITE_COLOR_CODE,
    GREY_COLOR_CODE,
    THEME_COLOR_CODE,
    THEME_COLOR_CODE_DARK,
    THEME_COLOR_CODE_LIGHT,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE,
    WARNING_COLOR_CODE
} from '../../../utils/constants';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../../components/Button';
import Language from '../../../components/Language'

import Loader from '../../../utils/Loader';

import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LanguageChange = ({ navigation }) => {
    const [laguageType, setLanguageType] = useState()
    const [languageShow, setLanguageShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            language()
        }, [])
    );

    const language = async () => {
        const lang = await AsyncStorage.getItem('lang');
        setLanguageType(lang)
        Language.setLanguage(lang);
    }


    const changeLanguageFun = async (applang) => {
        setLanguageType(applang)
        Language.setLanguage(applang);
        setLanguageShow(!languageShow)
        await AsyncStorage.setItem('lang', applang)
    }


    const languageChange = async (applang) => {
        setLanguageType(applang)
        Language.setLanguage(applang);
        setLanguageShow(!languageShow)
        await AsyncStorage.setItem('lang', applang)

    }


    const onContinue = () => {
        laguageType ?
            navigation.navigate('Slider')
            :
            setAlertMessage('Please Select Language');
        AnimatedAlert.showAlert()
    }
    return (
        <View style={[Styles.container, { paddingTop: Platform.OS === 'ios' ? 20 : 2 }]}>
            {isLoading && <Loader state={isLoading} />}
            <View style={Styles.imgView}>
            <Image
                    source={require('../../../Assets/logoGODschwarzmitPunkten.png')} resizeMode='contain' style={{height:140,width:110}}
                />
            </View>
            <View style={Styles.box}>
                <View style={{ marginLeft: 25 }}>
                    <Text style={Styles.labelTxt}>{Language.selectLanguage}</Text>
                </View>

                <TouchableOpacity onPress={() => setLanguageShow(!languageShow)} style={[Styles.dropdown, {
                    borderBottomRightRadius: languageShow ? 0 : 10,
                    borderBottomLeftRadius: languageShow ? 0 : 10,
                }]}>
                    <Text style={{ color: '#a9a9a9', fontFamily: FONT_FAMILY_MEDIUM }}>Language</Text>
                    <Entypo name={languageShow ? 'chevron-thin-up' : 'chevron-thin-down'} style={{ color: '#a9a9a9', fontFamily: FONT_FAMILY_MEDIUM, fontSize: 20 }} />
                </TouchableOpacity>
                {languageShow &&
                    <View style={Styles.dropdownActive}>
                        <TouchableOpacity onPress={() => changeLanguageFun('English')} style={Styles.dropdownListView}>
                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: '#a9a9a9' }}>English</Text>
                            <View style={{ paddingRight: 8 }}>
                                <Feather name={laguageType == 'English' ? 'check-circle' : 'circle'} style={{ color: laguageType == 'English' ? PINK_COLOR_CODE : '#a9a9a9', fontFamily: FONT_FAMILY_MEDIUM, fontSize: 20 }} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeLanguageFun('German')} style={Styles.dropdownListView2}>
                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: '#a9a9a9' }}>German</Text>
                            <View style={{ paddingRight: 8 }}>
                                <Feather name={laguageType == 'German' ? 'check-circle' : 'circle'} style={{ color: laguageType == 'German' ? PINK_COLOR_CODE : '#a9a9a9', fontFamily: FONT_FAMILY_MEDIUM, fontSize: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        onPress={() => onContinue()}
                        style={{ width: '88%', marginTop: 30 }}
                        buttonText={Language.Continue} />
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, height: windowHeight / 2.8 }}>
                <ImageBackground source={require('../../../Assets/splash.png')} resizeMode='center'
                    style={{ width: windowWidth, height: windowHeight / 2.4 }}
                >
                </ImageBackground>
            </View>

            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    );
}

export default LanguageChange;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imgView: { height: 160, justifyContent: "center", alignItems: "center", marginTop: 10 },
    box: {
        flex: 1, marginTop: 20
    },
    labelTxt: { fontFamily: FONT_FAMILY_MEDIUM, color: '#a9a9a9' },
    dropdown: {
        height: 43,
        marginTop: 8,
        paddingLeft: 12,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        width: '90%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios'?0.5:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 2,
    },
    dropdownActive: {
        height: 80,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        marginRight: Platform.OS === 'ios' ? 20 : 15,
        marginLeft: 20,
        borderBottomColor: '#eaeaea',
        borderLeftColor: '#eaeaea',
        borderRightColor: '#eaeaea',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    dropdownListView: {
        borderBottomWidth: 2,
        height: 40,
        paddingLeft: 12,
        borderBottomColor: '#eaeaea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    dropdownListView2: {
        height: 40,
        paddingLeft: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 12
    },
})