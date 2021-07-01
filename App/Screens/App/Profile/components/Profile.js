import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language'
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Profile = (props) => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={{
                            flexDirection: "row",
                        }}>
                        <View style={styles.userDataCon}>
                            <Text style={styles.userDataTxt}>{props.userData?.name}</Text>
                            <Text style={styles.userDataTxt}>{props.userData?.country_code} {props.userData?.mobile}</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => props.onProfileDetails()} style={styles.profileTab}>
                            <Text style={styles.textSty}> {Language.ProfileDetails}</Text>
                            <Entypo name='chevron-thin-right' style={[styles.textSty, { fontSize: 20 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.onAddressList()} style={styles.profileTab}>
                            <Text style={styles.textSty}>{Language.address}</Text>
                            <Entypo name='chevron-thin-right' style={[styles.textSty, { fontSize: 20 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.onPaymentHistory()} style={styles.profileTab}>
                            <Text style={styles.textSty}>{Language.PaymentHistory}</Text>
                            <Entypo name='chevron-thin-right' style={[styles.textSty, { fontSize: 20 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.setLanguageShow(!props.languageShow)}
                            style={[styles.languageCon, {
                                borderBottomRightRadius: props.languageShow ? 0 : 10,
                                borderBottomLeftRadius: props.languageShow ? 0 : 10,
                            }]}>
                            <Text style={styles.textSty}>Language</Text>
                            <Entypo name={props.languageShow ? 'chevron-thin-up' : 'chevron-thin-down'} style={[styles.textSty, { fontSize: 20 }]} />
                        </TouchableOpacity>
                        {props.languageShow &&
                             <View style={styles.langInner}>
                                <TouchableOpacity onPress={() => props.changeLanguageFun('English')}
                                    style={styles.engBoxCon}>
                                    <Text style={styles.langTxt}>English</Text>
                                    <View style={{ paddingRight: 8 }}>
                                        <Feather name={props.laguageType == 'English' ? 'check-circle' : 'circle'} style={{ color: props.laguageType == 'English' ? PINK_COLOR_CODE : '#a9a9a9', fontFamily: FONT_FAMILY_MEDIUM, fontSize: 20 }} />
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.changeLanguageFun('German')}
                                    style={styles.gerCon}>
                                    <Text style={styles.langTxt}>German</Text>
                                    <View style={{ paddingRight: 8 }}>
                                        <Feather name={props.laguageType == 'German' ? 'check-circle' : 'circle'} style={{ color: props.laguageType == 'German' ? PINK_COLOR_CODE : '#a9a9a9', fontFamily: FONT_FAMILY_MEDIUM, fontSize: 20 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                       {/* <TouchableOpacity onPress={() => props.onPaymentHistory()} style={styles.profileTab}>
                            <Text style={styles.textSty}>{Language.Logout}</Text>
                            <Entypo name='chevron-thin-right' style={[styles.textSty, { fontSize: 20 }]} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
export default Profile;