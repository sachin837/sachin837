
import React, { useContext, useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, TextInput,
    TouchableOpacity, Platform, Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONT_FAMILY_REGULAR, PINK_COLOR_CODE, WHITE_COLOR_CODE, WARNING_COLOR_CODE } from '../utils/constants'
import Language from './Language'
import AnimatedAlert from './AnimatedAlert';
import { apiCall, setDefaultHeader } from '../utils/httpClient';
import ENDPOINTS from '../utils/apiEndPoints';

function Header(props) {
    const navigation = useNavigation()
    const [productName, setProductName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    async function onSearchFun() {
        navigation.navigate('FilterList', { productName })
    };



    return (
        <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.drawerBtn}>
                <Image
                    source={require('../Assets/Group_115.png')}
                />
            </TouchableOpacity>
            <View activeOpacity={0.9} style={{ flex: 4.8, padding: 10 }}>
                <View style={styles.searchIcon}>
                    {/* <View style={styles.searchimg}>
                        <Image source={require('../Assets/Union_1.png')} />
                    </View> */}
                    <View style={styles.inputCon}>
                        <TextInput
                            placeholder={Language.Search}
                            placeholderTextColor='#a9a9a9'
                            onChangeText={(val) => setProductName(val)}
                            style={{ flex: 1, fontFamily: FONT_FAMILY_REGULAR, color: '#000' }}
                        />
                        {/* <Text style={{ flex: 1, fontFamily: FONT_FAMILY_REGULAR,color:'#a9a9a9' }} >{Language.Search}</Text> */}
                    </View>
                    <TouchableOpacity onPress={() => onSearchFun()} style={styles.menuIMg}>
                        <Image source={require('../Assets/Union_1.png')} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileImg}>
                <Image
                    source={require('../Assets/Group_164.png')}
                />
            </TouchableOpacity>
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View >
    );
}
const styles = StyleSheet.create({
    topContainer: {
        paddingHorizontal: 5,
        height: Platform.OS === 'ios' ? 85 : 60,
        flexDirection: "row",
        backgroundColor: PINK_COLOR_CODE,
        paddingTop: Platform.OS === 'ios' ? 25 : 2
    },
    drawerBtn: {
        flex: 0.6,
        justifyContent: "center",
        alignItems: "center"
    },
    searchIcon: {
        borderRadius: 10,
        backgroundColor: WHITE_COLOR_CODE,
        flex: 1,
        flexDirection: "row"
    },
    searchimg: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center"
    },
    inputCon: {
        width: '85%',
        justifyContent: 'center',
        height: Platform.OS === 'ios' ? 43 : 45,
        paddingLeft: 5
        // paddingTop:8
    },
    menuIMg: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImg: {
        flex: 0.6,
        justifyContent: "center",
        alignItems: "center"
    }

})
export default Header;