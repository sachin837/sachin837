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
import Feather from 'react-native-vector-icons/dist/Feather';
import Slider from 'react-native-slider'
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language'

import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Profile = (props) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flex: 1, margin: 8 }}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => props.setLanguageShow(!props.languageShow)}
                            style={[styles.languageCon, {
                                borderBottomRightRadius: props.languageShow ? 0 : 10,
                                borderBottomLeftRadius: props.languageShow ? 0 : 10,
                            }]}>
                            <Text style={[styles.textSty,{color:props.categoryName ? "#000" :'#a9a9a9',paddingLeft:4}]}>{props.categoryName ? props.categoryName : Language.category}</Text>
                            <Entypo name={props.languageShow ? 'chevron-thin-up' : 'chevron-thin-down'} style={[styles.textSty, { fontSize: 20 }]} />
                        </TouchableOpacity>
                        {props.languageShow &&
                            props.shopCategoryData ?
                            <FlatList
                                data={props.shopCategoryData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => props.categoryNameFun(item)} style={styles.langInner}>
                                            <Text style={styles.langTxt}>{item.cat_name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            : null
                        }

                        <View style={styles.profileTab}>
                            <TextInput
                                placeholder={Language.productName}
                                placeholderTextColor='#a9a9a9'
                                style={styles.inputCon}
                                // value={props.profileData.name}
                                onChangeText={(val) => props.setProductName(val)}
                            />
                        </View>

                        {/* <View style={styles.sliderTab}>
                            <Text style={[styles.langTxt, { paddingTop: 7, }]}>{Language.Price}</Text>
                            <Slider
                                minimumTrackTintColor={PINK_COLOR_CODE}
                                thumbTintColor={PINK_COLOR_CODE}
                                minimumValue={4}
                                maximumValue={100}
                                style={{ height: 30,marginLeft:10,marginRight:10 }}
                                onValueChange={(value) => props.setPrice(value)}
                            />
                            <Text style={[styles.langTxt,{color:'#000',}]}>{'\u20AC'} {Math.floor(props.price)}</Text>
                        </View> */}
                        <View style={styles.btnCon}>
                            <Button
                                onPress={() => props.onSearchFun()}
                                style={{ width: '100%' }}
                                buttonText={Language.Search} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};
export default Profile;