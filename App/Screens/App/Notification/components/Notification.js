import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Language from '../../../../components/Language';

import styles from './styles'
import moment from 'moment'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Notification = (props) => {
    const windowWidth = useWindowDimensions().width;
    const createTwoButtonAlert = (item) =>
        Alert.alert(
            "",
            Language.notificationDelete,
            [
                {
                    text: Language.Cancel,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: Language.OK, onPress: () => props.DeleteNotification(item) }
            ]
        )
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{margin: 8 ,flex:1}}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={{
                            flexDirection: "row", height: 110
                        }}>

                        <View style={styles.headerCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                {/* <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} /> */}
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.headerTxt}>{Language.Notification}</Text>
                            </View>
                        </View>

                    </LinearGradient>
                    <View style={styles.profileTab}>
                        <View style={styles.topCon}>
                            {props.notificationData ?
                                <FlatList
                                    data={props.notificationData}
                                    renderItem={({ item,index }) => (
                                        <View  style={styles.flatListCon}>
                                            <View style={{ padding: 10, }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: '93%' }}>
                                                        <Text style={styles.headingTxt}>{item.title}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => createTwoButtonAlert(item)} style={{}}>
                                                        <Image source={require('../../../../Assets/add-filled.png')} tintColor='#a9a9a9' style={{ height: 25, width: 25 }} />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>
                                                    {item.msg}
                                                </Text>
                                                <View style={styles.dateCon}>
                                                    <Text style={styles.dateTxt}>{moment(item.date).format("MMM Do YYYY")}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={item => item.email}
                                />
                                :
                                <View style={[styles.emptyContainer, { width: windowWidth }]}>
                                    <View>
                                        <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                                    </View>
                                    <View>
                                        <Text style={styles.emptyTXT}>{Language.notificationListmsg}</Text>
                                    </View>
                                </View>
                            }
                        </View>




                    </View>
                </View>

            </View>
        </View>
    )
};
export default Notification;