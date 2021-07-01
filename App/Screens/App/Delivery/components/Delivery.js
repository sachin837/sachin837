import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import Header from '../../../../components/Header';
import Language from '../../../../components/Language';

import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, COMMON_BUTTON_COLOR, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Delivery = (props) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={{
                            flexDirection: "row", height: 110
                        }}>

                        <View style={{ flexDirection: "row", paddingTop: 10 }}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                {/* <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} /> */}
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontFamily: FONT_FAMILY_MEDIUM, color: PINK_COLOR_CODE, fontSize: 14 }}>{Language.Delivery}</Text>
                            </View>
                        </View>

                    </LinearGradient>
                    <View style={styles.topContainer}>
                        <View style={{ padding: 10, flex: 1 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                            {/* <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE ,fontSize:18}}>{Language.comingSoon}</Text> */}

                                <TouchableOpacity onPress={()=> props.getNotification()} style={{ width: '90%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: PINK_COLOR_CODE, height: 55, borderRadius: 50, marginTop: 30 }}>
                                    <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE ,fontSize:12}}>{Language.getNotified}</Text>
                                    <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE ,fontSize:13}}>{Language.eranMoney}</Text>
                                </TouchableOpacity>


                            </View>

                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
};
export default Delivery;