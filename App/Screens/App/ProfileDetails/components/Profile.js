import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import styles from './styles'
const Profile = (props) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={styles.linerCon}>

                        <View style={styles.profileDetCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.profileDetailTxt}>{Language.ProfileDetails}</Text>
                            </View>
                        </View>

                    </LinearGradient>
                    <View style={styles.topContainer}>
                        <View style={styles.profileTab}>
                            <TextInput
                                placeholder={Language.Name}
                                placeholderTextColor='#a9a9a9'
                                style={styles.inputCon}
                                value={props.profileData.name}
                                onChangeText={(val) => props.setProfileData({
                                    ...props.profileData,
                                    name: val
                                })}
                            />
                        </View>
                        <View style={styles.profileTab}>
                            <View style={styles.addreassCon}>
                                {props.profileData.mobile ?
                                    <Text style={styles.addressTxt}> {props.profileData.country_code} {props.profileData.mobile}</Text>
                                    : <Text style={styles.addressTxt}>{Language.AddMobileNo}</Text>
                                }
                                <TouchableOpacity onPress={() => props.editMobileNo()} style={{ paddingRight: 10 }}>
                                    <FontAwesome name='edit' style={styles.editCon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.profileTab}>
                            <TextInput
                                placeholder={Language.Email}
                                placeholderTextColor='#a9a9a9'
                                style={styles.inputCon}
                                value={props.profileData.email}
                                onChangeText={(val) => props.setProfileData({
                                    ...props.profileData,
                                    email: val
                                })}
                            />
                        </View>
                        <View style={styles.btnCon}>
                            <View style={styles.innerCon}>
                                <Button
                                    onPress={() => props.updateProfileFun()}
                                    style={{ width: '100%' }}
                                    buttonText={Language.Update} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};
export default Profile;
