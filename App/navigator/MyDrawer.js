import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, Linking
} from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Share } from 'react-native';
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, PINK_COLOR_CODE, THEME_COLOR_CODE } from '../utils/constants';
import { AuthContext, UserDataContext } from '../utils/UserContext';
import Language from '../components/Language'
export default function CustomDrawerContent(props) {
    const [userData, setUserData] = React.useContext(UserDataContext);
    console.log('userData', userData)
    const { signOut } = React.useContext(AuthContext);
    const onShare = async () => {
        try {


            let text = Language.shareMsg + ' : ' + userData.referral_code + ' '
            if (Platform.OS === 'android') {
                text = text.concat('https://play.google.com/store/apps/details?id=com.groceriesondemand')
            } else {
                text = text.concat('https://play.google.com/store/apps/details?id=com.groceriesondemand')
            }
            const result = await Share.share({
                message: text,
            });


            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <DrawerContentScrollView
            style={{
                backgroundColor: PINK_COLOR_CODE
            }}
            {...props}
        >
            <StatusBar backgroundColor={PINK_COLOR_CODE} />
            <View style={{ flex: 1, borderTopRightRadius: 25, borderBottomRightRadius: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#FFF', flex: 1.5, marginBottom: 15, paddingTop: 10, paddingHorizontal: 20 }}>
                    <Text style={{
                        fontFamily: FONT_FAMILY_REGULAR,
                        fontSize: 20, color: 'white', fontWeight: 'bold',
                    }}>{userData?.name}</Text>
                </View>
                <View style={{ flex: 4.5, flexDirection: 'column' }}>
                    <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('DashBoard')}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/home.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('WhishList')} >
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/bookmark.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>Wishlist</Text>
                        </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('Cart')}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/cart.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>Cart</Text>
                        </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('OrderList')}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/Group_162.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>My Orders</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('Notification')}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/bell-solid-badged.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.Notification}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('Support')}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/bx-support.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.customerSupport}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.items} onPress={() => props.navigation.navigate('RateUs')}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/star-fill.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.RateUs}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.items} onPress={() => onShare()}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/share-solid.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.share}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AboutUs')} style={Styles.items}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/about.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.aboutUs}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Delivery')} style={Styles.items}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/truck.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.delivery}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => signOut()} style={Styles.items}>
                        <View style={Styles.icon}>
                            <Image resizeMode='contain' style={{ height: 25, width: 25 }} source={require('../Assets/logout-solid.png')} />
                        </View>
                        <View style={Styles.textView}>
                            <Text style={Styles.text}>{Language.Logout}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </DrawerContentScrollView>
    );
}

const Styles = StyleSheet.create({

    items: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7
    },
    icon: {
        flex: 1.5,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textView: {
        flex: 4.5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontFamily: FONT_FAMILY_MEDIUM
    }
})