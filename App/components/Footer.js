
import React, { useContext, useState, useEffect } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image,Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Text from "./_Text";
import { WHITE, APP_THEME } from '../utils/colors';
import { PINK_COLOR_CODE } from '../utils/constants';
function Footer(props) {
    const navigation = useNavigation();
    const [logoType, setLogoType] = useState(0)
    useEffect(() => {
        props.logoType && setLogoType(props.logoType)
    }, [])
    return (
        <View style={{
            height: Platform.OS === 'ios' ? 70 : 50,
             backgroundColor: PINK_COLOR_CODE, flexDirection: 'row',
            justifyContent: 'space-between', paddingHorizontal: 25
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('DashBoard')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={
                    logoType == 1 ?
                        require('../Assets/home1.png')
                        :
                        require('../Assets/home.png')
                } />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Category')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={
                    logoType == 2 ?
                        require('../Assets/list1.png')
                        :
                        require('../Assets/list.png')
                } />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={
                    logoType == 3 ?
                        require('../Assets/search1.png')
                        :
                        require('../Assets/search.png')
                } />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('OrderList')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={
                    logoType == 4 ?
                        require('../Assets/Group_162.png')
                        :
                        require('../Assets/Group_162.png')
                } tintColor={logoType == 4 ? '#7a23f8' : '#fff'} style={{ height: 27, width: 25 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={
                    logoType == 5 ?
                        require('../Assets/cart1.png')
                        :
                        require('../Assets/cart.png')
                } style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
        </View>
    );
}
Footer.defaultProps = {
    logoType: 0
};
const styles = StyleSheet.create({
    Footer: {
        height: 60,
        flexDirection: "row",
        backgroundColor: "#00bbd3"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
export default Footer;