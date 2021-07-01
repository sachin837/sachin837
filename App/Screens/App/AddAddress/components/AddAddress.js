import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput,Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language';

import styles from './styles'
import { MAP_KEY, FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete, } from 'react-native-google-places-autocomplete';


// Geocoder.init(MAP_KEY, { language: "en" })

const AddAddress = (props) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const images = new Array(3).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [showIndex, setShowIndex] = useState('')
    const [modalVisible, setModalVisible] = useState(false)




    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={{
                            flexDirection: "row", height: 50
                        }}>

                        <View style={styles.headerCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.headerTxt}>{Language.AddNewAddress} </Text>
                            </View>
                        </View>

                    </LinearGradient>
                    <View style={styles.topContainer}>
                        <View style={styles.profileTab}>
                            <TextInput
                                value={props.addressData.email}
                                onChangeText={(val) => props.setAddressData({
                                    ...props.addressData,
                                    houseNo: val
                                })}
                                placeholder={Language.houseNo}
                                placeholderTextColor='#a9a9a9'
                                style={styles.inputCon}
                            />
                        </View>
                        <View style={styles.profileTab}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.addressCon}>
                                <Text numberOfLines={2} style={{ paddingLeft: 2, fontFamily: FONT_FAMILY_REGULAR, color: props.addressData.address ? '#000' : '#a9a9a9' }}>{props.addressData.address ? props.addressData.address : Language.Address}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.profileTab}>
                            <TextInput
                                value={props.addressData.landMark}
                                onChangeText={(val) => props.setAddressData({
                                    ...props.addressData,
                                    landMark: val
                                })}
                                placeholder={Language.Landmark}
                                placeholderTextColor='#a9a9a9'
                                style={styles.inputCon}
                            />
                        </View> */}
                        {props.addressAuto.city ?
                            <View style={styles.profileTab}>
                                <Text numberOfLines={2} style={{ paddingLeft: 2, fontFamily: FONT_FAMILY_REGULAR, color: props.addressAuto.city ? '#000' : '#a9a9a9' }}>{props.addressAuto.city ? props.addressAuto.city : Language.City}</Text>
                            </View>
                            :
                            <View style={styles.profileTab}>
                                <TextInput
                                    value={props.addressData.city}
                                    onChangeText={(val) => props.setAddressData({
                                        ...props.addressData,
                                        city: val
                                    })}
                                    placeholder={Language.City}
                                    placeholderTextColor='#a9a9a9'
                                    style={styles.inputCon}
                                />
                            </View>
                        }
                        {props.addressAuto.postal_code ?
                            <View style={styles.profileTab}>
                                <Text numberOfLines={2} style={{ fontFamily: FONT_FAMILY_REGULAR, color: props.addressAuto.postal_code ? '#000' : '#a9a9a9' }}>{props.addressAuto.postal_code ? props.addressAuto.postal_code : Language.Pincode}</Text>
                            </View>
                            :
                            <View style={styles.profileTab}>
                                <TextInput
                                    value={props.addressData.postal_code}
                                    onChangeText={(val) => props.setAddressData({
                                        ...props.addressData,
                                        postal_code: val
                                    })}
                                    placeholder={Language.Pincode}
                                    keyboardType='number-pad'
                                    placeholderTextColor='#a9a9a9'
                                    style={styles.inputCon}
                                />
                            </View>
                        }
                        <View style={styles.btnCon}>
                            <View style={styles.btnInner}>
                                <Button
                                    onPress={() => props.onAddAddress()}
                                    style={{ width: '100%' }}
                                    buttonText={Language.Save} />
                            </View>
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{backgroundColor:'#FAFAFA', height: "100%" }}>
                            <View style={{ flexDirection: 'row', height: Platform.OS === 'ios' ? 70:50, paddingTop:Platform.OS === 'ios' ? 15:null, backgroundColor: PINK_COLOR_CODE, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ paddingLeft: 15 }}>
                                    <Image source={require('../../../../Assets/arrow_left.png')} tintColor='#fff' style={{ height: 15, width: 22, }} />
                                </TouchableOpacity>
                                <View style={{ paddingRight: 20 }}>
                                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: FONT_FAMILY_SEMIBOLD }}>{Language.Address}</Text>
                                </View>
                                <View />
                            </View>
                            <View style={{ position: 'absolute', width: '100%', marginTop:Platform.OS === 'ios' ?70 : 50}}>
                                <GooglePlacesAutocomplete
                                    placeholder={Language.Address}
                                    getDefaultValue={() => {
                                        return ''; // text input default value
                                    }}
                                    onPress={(data, details = null) => {
                                        Geocoder.from(details.description)
                                            .then(json => {
                                                var location = json.results[0].geometry.location;
                                                props.getAddressObject(json.results[0].address_components)
                                                props.setAddressData({
                                                    ...props.addressData,
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
                                    // renderLeftButton={()  => <Image source={require('../../../../Assets/scroller.png')} />}
                                    // renderRightButton={() => <Text>Custom text after the input</Text>}
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
                                            // backgroundColor: 'blue',
                                            // height: 70,
                                            // alignItems: 'flex-end',
                                        },
                                        textInput: {
                                            marginHorizontal: 10,
                                            borderRadius: 25,
                                            elevation: 10,
                                            marginTop: 15,
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
                </View>

            </View>
        </View>
    )
};
export default AddAddress;
