import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import AutoHeightWebView from 'react-native-autoheight-webview'

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language'
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, COMMON_BUTTON_COLOR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const AboutUs = (props) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={{
                            flexDirection: "row", height: 110
                        }}>

                        <View style={styles.headerCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.hearderTxt}>{Language.termsAndConditon}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.topContainer}>
                        <ScrollView contentContainerStyle={{ padding: 10 }}>
                            {props.aboutData ? <AutoHeightWebView
                                style={{ width: Dimensions.get('window').width - 30 }}
                                // customScript={`document.body.style.background = 'lightyellow';`}

                                customStyle={`
                        * {
                            font-family: ${FONT_FAMILY_REGULAR};
                            font-size: 13px;
                            color:#666;
                            font-weight:none;
                        }`
                                }
                                automaticallyAdjustContentInsets={true}
                                originWhitelist={['*']}
                                source={{ html: props.aboutData.terms_condition }}
                            />
                                :
                                null}
                        </ScrollView>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
};
export default AboutUs;