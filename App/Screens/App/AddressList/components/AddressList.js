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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language';
import styles from './styles'
const AddressList = (props) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={styles.linerCon}>

                        <View style={styles.headerCon}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                    <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                                </TouchableOpacity>
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={styles.headerTxt}>{Language.Address}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => props.AddAddress()} style={{ paddingRight: 30 }}>
                                <FontAwesome name='plus-circle' style={styles.addAddBtn} />
                            </TouchableOpacity>

                        </View>
                    </LinearGradient>
                    <View style={styles.topContainer}>
                        {props.addressData ?
                            <FlatList
                                data={props.addressData}
                                renderItem={({ item }) => (
                                    <View style={styles.flatCon}>
                                        <View style={styles.textCon}>
                                            <View style={{ width: '80%' }}>
                                                <Text style={styles.txtSty}>{Language.houseNoshow} : {item.house_no}</Text>
                                                <Text style={styles.txtSty}>{item.address}</Text>
                                                {/* <Text style={styles.txtSty}>{Language.Landmark} : {item.landmark}</Text> */}
                                                <Text style={styles.txtSty}>{Language.City} : {item.city}</Text>
                                                <Text style={styles.txtSty}>{Language.Pincode} : {item.pin_code}</Text>
                                            </View>
                                            <View style={styles.btnCon}>
                                                <TouchableOpacity onPress={() => props.editAddress(item)}>
                                                    <FontAwesome name='edit' style={styles.iconTxt} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => props.deleteAddress(item)} >
                                                    <MaterialCommunityIcons name='delete' style={[styles.iconTxt,{paddingLeft:10}]}/>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.email}
                            />
                            :
                            <View style={styles.emtyCon}>
                                <View>
                                    <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                                </View>
                                <View>
                                    <Text style={styles.emptXT}>{Language.addressEmptyList}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>

            </View>
        </View>
    )
};
export default AddressList;