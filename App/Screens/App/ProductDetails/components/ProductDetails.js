import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language'
import InputSpinner from "react-native-input-spinner";
import styles from './styles'
import _ from 'lodash'

import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Category = (props) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#fad7ef', '#f1d5f4']}
                    style={{
                        paddingVertical: 5, height: 180
                    }}>
                    <View style={styles.headerCon}>
                        <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 8 }}>
                            <Image style={{ height: 15, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 10 }}>
                            {/* <Text style={styles.headerTxt}>{Language.MyOrders}</Text> */}
                        </View>
                    </View>
                </LinearGradient>
                <View style={{ position: 'absolute', marginTop: 35, height: '100%', paddingBottom: 40 }}>
                    <ScrollView>
                        <View style={[styles.topContainer, { width: windowWidth, }]}>
                            <ScrollView
                                horizontal={true}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event([
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                x: scrollX
                                            }
                                        }
                                    }
                                ], { useNativeDriver: false }
                                )}
                                scrollEventThrottle={1}
                            >
                                {
                                    props.productDetails ?
                                        props.productDetails?.singleProductDetails[0]?.product_image_list.map((item, index) => {
                                            return (
                                                <View key={index} style={styles.RenderViewStyle}>
                                                    <ImageBackground resizeMode='contain' style={[styles.DeliveryImge]} source={{ uri: props.productDetails?.singleProductDetails[0].product_image_url + item.image }} >
                                                        {/* <View style={{ position: 'absolute', width: '100%', height: 200, paddingLeft: 10, paddingTop: 15 }}>
                                                        <TouchableOpacity onPress={() => props.goback()} style={{ width: 30 }} >
                                                            <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} />
                                                        </TouchableOpacity>
                                                    </View> */}
                                                    </ImageBackground>
                                                </View>
                                            );
                                        }
                                        )
                                        : null
                                }
                            </ScrollView>
                            <View style={[styles.topSilderDot, { top: windowHeight / 4, }]}>
                                {props.productDetails ?
                                    props.productDetails?.singleProductDetails[0]?.product_image_list.map((image, imageIndex) => {
                                        const width = scrollX.interpolate({
                                            inputRange: [
                                                windowWidth * (imageIndex - 1),
                                                windowWidth * imageIndex,
                                                windowWidth * (imageIndex + 1)
                                            ],
                                            outputRange: [8, 16, 8],
                                            extrapolate: "clamp"
                                        });
                                        return (
                                            <Animated.View
                                                key={imageIndex}
                                                style={[styles.normalDot, { width, }]}
                                            />
                                        );
                                    })
                                    : null
                                }
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff' }}>
                            <View style={styles.itemDetailCon}>
                                <View>
                                    <Text style={styles.itemName}>{props.productDetails ? props.productDetails?.singleProductDetails[0]?.product_name : null}</Text>
                                </View>
                                {props.productDetails ? props.productDetails.singleProductDetails[0]?.additional_price !== '0' ?
                                    <View>
                                        <Text style={{ fontSize: 12, color: '#000', paddingLeft: 10 }}>{'\u20AC'} {props.productDetails ? props.productDetails?.singleProductDetails[0]?.price : null} + {'\u20AC'} {props.productDetails ? props.productDetails?.singleProductDetails[0]?.additional_price : null} </Text>
                                    </View>
                                    : null : null}
                                <View style={styles.PriceSty}>
                                    <Text style={{ fontSize: 12, }}>{'\u20AC'} {props.productDetails ? props.productDetails?.singleProductDetails[0]?.product_unit_price : null}</Text>
                                    {/* <Text style={styles.actulPrice}> {'\u20AC'} {props.productDetails ? parseInt(props.productDetails?.singleProductDetails[0]?.product_unit_price) + parseInt(props.productDetails?.singleProductDetails[0]?.discount) : null}</Text> */}
                                    <Text style={styles.actulPrice}> {'\u20AC'} {props.productDetails ? spanishNumberFormatter.format(parseFloat((`${props.productDetails?.singleProductDetails[0]?.product_unit_price}`).replace(/,/g, '.')) + parseFloat((`${props.productDetails?.singleProductDetails[0]?.discount}`).replace(/,/g, '.'))) : null}</Text>

                                </View>
                                <View style={{ paddingTop: 10 }}>
                                    <Text style={styles.packSize}>{Language.PackSize} : {props.productDetails ? props.productDetails?.singleProductDetails[0]?.product_unit_qty : null} {props.productDetails ? props.productDetails?.singleProductDetails[0]?.unit_qty : null}</Text>
                                </View>
                                <View style={styles.AboutProduct}>
                                    <Text style={styles.aboutProductHead}>{Language.aboutProduct}</Text>
                                </View>
                                <View style={{ paddingRight: 8, paddingBottom: 5 }}>
                                    <Text style={styles.aboutProductTxt}>
                                        {props.productDetails ? props.productDetails?.singleProductDetails[0]?.product_description : null}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            {/* <TouchableOpacity style={styles.btnInnerCont}>
                                <Text style={styles.btnTxt}>{Language.saveForLater}</Text>
                            </TouchableOpacity> */}
                            {_.filter(props.cartVal, { product_id: props.productDetails ? props.productDetails.singleProductDetails[0]?.product_id : null }).length > 0 ?
                                <View style={[styles.btnInnerCont, { paddingLeft: 20, paddingRight: 20 }]}>
                                    <InputSpinner
                                        colorMax={PINK_COLOR_CODE}
                                        colorMin={PINK_COLOR_CODE}
                                        colorPress={PINK_COLOR_CODE}
                                        // min={1}
                                        step={1}
                                        height={30}
                                        // width={30}
                                        skin='square'
                                        color={PINK_COLOR_CODE}
                                        buttonTextColor={'#ffffff'}
                                        value={_.filter(props.cartVal, { product_id: props.productDetails ? props.productDetails?.singleProductDetails[0]?.product_id : null })[0].total_unit_qty}
                                        onDecrease={(i) => props.onDecrease(i, props.productDetails?.singleProductDetails[0])}
                                        onIncrease={(i) => props.onIncrease(i, props.productDetails?.singleProductDetails[0])}
                                        buttonStyle={{
                                            width: 40,
                                        }}
                                        inputStyle={{
                                            color: "#000",
                                            fontSize: 12,
                                            paddingBottom: Platform.OS === 'ios' ? 0 : 5,
                                        }}
                                        editable={false}
                                    />
                                </View>
                                :
                                <TouchableOpacity onPress={() => props.addCart(props.productDetails?.singleProductDetails[0])} style={styles.btnInnerCont}>
                                    <Text style={styles.btnTxt}>{Language.BuyNow}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View>
                            <View style={styles.similarProductCona}>
                                <Text style={styles.similarTxt}>{Language.SimilarProducts}</Text>
                            </View>
                            <View>
                                <View style={styles.linerHeadingConSty}>
                                    {props.productDetails ?
                                        <View>
                                            <FlatList
                                                data={props.productDetails?.similarProduct}
                                                keyExtractor={(item, index) => index.toString()}
                                                horizontal
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => props.productDetailsFun(item)} style={styles.popularProductStyCon}>
                                                            <View style={styles.popularProductStyInne}>
                                                                <ImageBackground
                                                                    style={styles.imgStyle} resizeMode='center'
                                                                    source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                                >
                                                                    <TouchableOpacity style={styles.bookMarkSty}>
                                                                        <Image source={require('../../../../Assets/bookmark11.png')} />
                                                                    </TouchableOpacity>
                                                                </ImageBackground>
                                                            </View>
                                                            <Text numberOfLines={1} style={[styles.itemContTxt, { paddingTop: 2 }]}>
                                                                {item.product_name}
                                                            </Text>
                                                            <Text numberOfLines={1} style={[styles.itemContTxt]}>
                                                                {item.product_unit_qty} {item.unit_qty}
                                                            </Text>
                                                            <View style={styles.popularPriceCon}>
                                                                <Text style={{ fontSize: 12, }}>{'\u20AC'} {item.product_unit_price}</Text>
                                                                <Text style={styles.popularActulPrice}> {'\u20AC'} {spanishNumberFormatter.format(parseFloat((`${item.product_unit_price}`).replace(/,/g, '.')) + parseFloat((`${item.discount}`).replace(/,/g, '.')))}</Text>
                                                            </View>
                                                            {_.filter(props.cartVal, { product_id: item.product_id }).length > 0 ?
                                                                <View style={styles.popularInputSty}>
                                                                    <InputSpinner
                                                                        colorMax={PINK_COLOR_CODE}
                                                                        colorMin={PINK_COLOR_CODE}
                                                                        colorPress={PINK_COLOR_CODE}
                                                                        // min={1}
                                                                        step={1}
                                                                        height={27}
                                                                        width={90}
                                                                        skin='square'
                                                                        color={PINK_COLOR_CODE}
                                                                        buttonTextColor={'#ffffff'}
                                                                        value={_.filter(props.cartVal, { product_id: item.product_id })[0].total_unit_qty}
                                                                        onDecrease={(i) => props.onDecrease(i, item)}
                                                                        onIncrease={(i) => props.onIncrease(i, item)}
                                                                        buttonStyle={{
                                                                            width: 30,
                                                                        }}
                                                                        inputStyle={{
                                                                            color: "#000",
                                                                            fontSize: 12,
                                                                            paddingBottom: Platform.OS === 'ios' ? 0 : 5,
                                                                        }}
                                                                        editable={false}
                                                                    />
                                                                </View>
                                                                :
                                                                <TouchableOpacity onPress={() => props.addCart(item)}
                                                                    style={styles.addBtnCont}>
                                                                    <Text style={styles.addBtnTxt}>
                                                                        {Language.add}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            }
                                                        </TouchableOpacity>
                                                    )
                                                }}
                                            />
                                        </View>
                                        :
                                        null
                                    }
                                </View>
                            </View>



                        </View>
                    </ScrollView>
                </View>
            </View>
        </View >
    )
};
export default Category;