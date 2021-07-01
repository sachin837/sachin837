import React, { useEffect, useState, useContext } from 'react';
import {
    View, Text, Image, ImageBackground, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, ScrollView, onChangeText, useWindowDimensions, Keyboard, Modal
} from 'react-native';
import { GooglePlacesAutocomplete, } from 'react-native-google-places-autocomplete';

import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import {
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_SEMIBOLD,
    MAP_KEY,
    PINK_COLOR_CODE
} from '../../../../utils/constants';
import Geocoder from 'react-native-geocoding';
import styles from './styles';
Geocoder.init(MAP_KEY, { language: "en" })
const App = (props) => {
    const [modalVisible, setModalVisible] = useState(false)

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
        <KeyboardAvoidingView behavior={Platform.OS=='ios' ? 'padding' : null} style={[styles.Container, { paddingTop: Platform.OS === 'ios' ? 20 : 2 }]}>
            <ScrollView keyboardShouldPersistTaps='always'  contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.topImg}>
                    <Image
                        source={require('../../../../Assets/logoGODschwarzmitPunkten.png')} resizeMode='contain' style={{ height: 140, width: 110 }}
                    />
                </View>

                <View style={styles.inputContianer}>
                    <Text title style={{ fontSize: 20 }}>{Language.AlmostThere}</Text>
                    <View style={styles.inputContianersss}>
                        <TextInput
                            value={props.registrationData.name}
                            onChangeText={(val) => props.setRegistrationData({
                                ...props.registrationData,
                                name: val
                            })}
                            placeholder={Language.Name}
                            placeholderTextColor='#666666'
                            style={styles.inputSty}
                        />
                        <TextInput
                            value={props.registrationData.email}
                            onChangeText={(val) => props.setRegistrationData({
                                ...props.registrationData,
                                email: val
                            })}
                            placeholder={Language.Email}
                            placeholderTextColor='#666666'
                            style={styles.inputSty}
                        />
                        <TextInput
                            value={props.registrationData.houseNo}
                            onChangeText={(val) => props.setRegistrationData({
                                ...props.registrationData,
                                houseNo: val
                            })}
                            placeholder={Language.houseNo}
                            placeholderTextColor='#666666'
                            style={styles.inputSty}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
                            style={styles.addressCont}>
                            <Text numberOfLines={2} style={[styles.addressTxt, { color: props.registrationData.address ? '#000' : '#666666' }]}>{props.registrationData.address ? props.registrationData.address : Language.ResidenceAddress}</Text>
                        </TouchableOpacity>
                        {/* <TextInput
                            value={props.registrationData.landMark}
                            onChangeText={(val) => props.setRegistrationData({
                                ...props.registrationData,
                                landMark: val
                            })}
                            placeholder={Language.Landmark}
                            placeholderTextColor='#666666'
                            style={styles.inputSty}
                        /> */}
                        {props.addressAuto?.city ?
                            <View style={styles.cityCon}>
                                <Text style={{ paddingLeft: 6, fontFamily: FONT_FAMILY_REGULAR, color: props.addressAuto.city ? '#000' : '#666666' }}>{props.addressAuto.city ? props.addressAuto.city : Language.City}</Text>
                            </View>
                            :
                            <TextInput
                                value={props.registrationData.city}
                                onChangeText={(val) => props.setRegistrationData({
                                    ...props.registrationData,
                                    city: val
                                })}
                                placeholder={Language.City}
                                placeholderTextColor='#666666'
                                style={styles.inputSty}
                            />
                        }
                        {props.addressAuto?.pin_code ?
                            <View style={styles.cityCon}>
                                <Text style={{ paddingLeft: 6, fontFamily: FONT_FAMILY_REGULAR, color: props.addressAuto.pin_code ? '#000' : '#666666' }}>
                                    {props.addressAuto.pin_code ? props.addressAuto.pin_code : Language.Pincode}
                                </Text>
                            </View>
                            :
                            <TextInput
                                value={props.registrationData.pin_code}
                                onChangeText={(val) => props.setRegistrationData({
                                    ...props.registrationData,
                                    pin_code: val
                                })}
                                placeholder={Language.Pincode}
                                placeholderTextColor='#666666'
                                style={styles.inputSty}
                            />
                        }
                        <TextInput
                            // value={props.registrationData.referral_code}
                            onChangeText={(val) => props.setRegistrationData({
                                ...props.registrationData,
                                referral_code: val
                            })}
                            placeholder={Language.referralcode}
                            placeholderTextColor='#666666'
                            style={styles.inputSty}
                        />

                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{ backgroundColor: "#f5f2f2", height: "100%" }}>
                            <View style={{ flexDirection: 'row', height: Platform.OS === 'ios' ? 85 : 50, backgroundColor: PINK_COLOR_CODE, justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 20 : 2 }}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ paddingLeft: 15, height: 15, width: 50 }}>
                                    <Image source={require('../../../../Assets/arrow_left.png')} tintColor='#fff' style={{ height: 15, width: 22, }} />
                                </TouchableOpacity>
                                <View style={{ paddingRight: 20 }}>
                                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: FONT_FAMILY_SEMIBOLD }}>{Language.ResidenceAddress}</Text>
                                </View>
                                <View />
                            </View>
                            <View style={{ position: 'absolute', width: '100%', marginTop: Platform.OS === 'ios' ? 85 : 50 }}>
                                <GooglePlacesAutocomplete
                                    placeholder={Language.ResidenceAddress}
                                    getDefaultValue={() => {
                                        return ''; // text input default value
                                    }}
                                    onPress={(data, details = null) => {
                                        console.log("details ", details);
                                        Geocoder.from(details.description)
                                            .then(json => {
                                                console.log("json ", json);
                                                var location = json.results[0].geometry.location;
                                                props.getAddressObject(json.results[0].address_components)
                                                props.setRegistrationData({
                                                    ...props.registrationData,
                                                    latitude: location.lat,
                                                    longitude: location.lng,
                                                    address: details.description
                                                })
                                                setModalVisible(!modalVisible)

                                            })
                                            .catch(error => console.warn(error));
                                    }}
                                    query={{
                                        key: MAP_KEY,
                                        language: 'en',
                                    }}
                                    listViewDisplayed="auto"
                                    renderRow={(rowData, index) => {
                                        const title = rowData.structured_formatting.main_text;
                                        const address = rowData.description;
                                        return (
                                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                                <View style={{ width: '70%', paddingLeft: 1 }}>
                                                    <Text style={{ fontSize: 14 }}>{address}</Text>
                                                </View>

                                            </View>
                                        );
                                    }}
                                    styles={{
                                        row: {
                                            width: '98%',
                                        },
                                        listView: {
                                            // margin: 10,
                                            marginRight: 10,
                                            marginLeft: 10,
                                            borderRadius: 25,
                                            marginTop: 2,
                                            width: '99%',
                                        },

                                        textInputContainer: {
                                            // zIndex: 1,
                                            // backgroundColor: '#f5f2f2',
                                            // height: 70,
                                            // alignItems: 'flex-end',
                                        },
                                        textInput: {
                                            marginHorizontal: 10,
                                            borderRadius: 25,
                                            elevation: 10,
                                            marginTop: 15,
                                            // borderWidth:1,
                                            // backgroundColor: 'red',
                                            flexDirection: 'row',
                                            color: '#000',
                                        },
                                        description: {
                                            fontFamily: FONT_FAMILY_REGULAR,
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#a9a9a9'
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Button
                        onPress={() => props.onPressSignIn()}
                        style={{ width: '85%', marginTop: 30 }}
                        buttonText={Language.SUBMIT} />
                </View>
            </ScrollView>
            {/* {
                keyboardStatus == 'Keyboard Hidden' &&
                <View style={{ height: 220, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../../Assets/splash.png')}
                        style={{ height: 220, width: '100%' }}
                    />
                </View>
            } */}
        </KeyboardAvoidingView>
    );
};
export default App;



























