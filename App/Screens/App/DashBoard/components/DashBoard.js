import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions, Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer'
import Language from '../../../../components/Language'
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
import Shimmer from '../../../../components/Shimmer'
import InputSpinner from "react-native-input-spinner";
import _ from 'lodash'

const DashBoard = (props) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const images = new Array(3).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [indexShow, setIndexShow1] = useState(null)
    const [indexShow2, setIndexShow2] = useState(null)
    const { width, height } = Dimensions.get('window');
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={{
                        // height: windowHeight / 3.5,
                        width: windowWidth,
                    }}>
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
                            {props.landingSlider.map((item, index) => {
                                return (
                                    <View key={index} style={{ width: windowWidth, height: windowHeight / 3.5 }}>
                                        <ImageBackground resizeMode='cover' style={{ width: windowWidth, height: windowHeight / 3.5 }} source={item.Image} >
                                            {index == 2 ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center', height: windowHeight / 3.5, justifyContent: 'space-between', width: width, }}>
                                                    <View style={{ width: width / 2 - 100 }}>
                                                        <Text style={{ color: 'red' }}></Text>
                                                    </View>
                                                    <View style={{ width: width / 2, paddingRight: 20 }}>
                                                        <Text style={[styles.saveUpTxt, { fontSize: 20, color: '#000' }]}>{item.discount}</Text>
                                                    </View>
                                                </View>
                                                : index == 1 ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: windowHeight / 3.5, justifyContent: 'space-between', width: width, }}>
                                                        <View style={{ width: width / 2 - 100 }}>
                                                            <Text style={{ color: 'red' }}></Text>
                                                        </View>
                                                        <View style={{ width: width / 2, paddingRight: 50 }}>
                                                            <Text style={[styles.saveUpTxt, { fontSize: 20 }]}>{item.discount}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: windowHeight / 3.5, }}>
                                                        <Text style={styles.saveUpTxt}>{item.discount}</Text>
                                                    </View>
                                            }
                                        </ImageBackground>
                                    </View>
                                );
                            }
                            )}
                        </ScrollView>
                        <View style={[styles.saveUptoDot, { top: windowHeight / 4, }]}>
                            {images.map((image, imageIndex) => {
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
                                        style={[styles.normalDot, { width }]}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <Text style={[styles.headingTxt, { paddingTop: 5 }]}>
                        {Language.shopByCategory}
                    </Text>
                    <View style={styles.shopCategoryContainer}>
                        {props.shopCategoryData ?
                            <FlatList
                                data={props.shopCategoryData}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={4}
                                renderItem={({ item, index }) => {
                                    return (
                                        index < 8 ?
                                            <View style={[styles.shopInnerContainer, { width: windowWidth / 4.5, }]} key={index}>
                                                {index < 7 ?
                                                    <>
                                                        <TouchableOpacity activeOpacity={0.6} onPress={() => props.categoryListFun(item)} style={{ flexDirection: 'row' }}>
                                                            <View style={[styles.shopBox, { width: windowWidth / 4.5, }]}>
                                                                <Image
                                                                    style={{ width: windowWidth / 4.5, height: 90,}} resizeMode='stretch'
                                                                    source={{ uri: item.cat_image }}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>
                                                        <View style={styles.shopCateCon}>
                                                            <Text numberOfLines={1} style={styles.shopCateTxt}>
                                                                {item.cat_name}
                                                            </Text>
                                                        </View>
                                                    </>
                                                    :
                                                    <TouchableOpacity activeOpacity={0.6} onPress={() => props.SubByCategorySeeAll()} style={[styles.shopBox, { width: windowWidth / 4.5, }]}>
                                                        <Image source={require('../../../../Assets/arrow_left_circle.png')} />
                                                        <Text style={styles.seeAllText} >{Language.seeAll}</Text>
                                                    </TouchableOpacity>
                                                }

                                            </View>
                                            :
                                            null
                                    )
                                }}
                            />
                            :
                            null
                        }

                    </View>

                    <View style={{ padding: 8 }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#E8C2D7', '#CEBCE6']}
                            style={styles.linnerGradientSty}>
                            <Image
                                source={require('../../../../Assets/logoGODschwarzmitPunkten.png')} resizeMode='contain' style={{ height: 130, width: 110 }}
                            />
                            <View>
                                {props.lang == 'English' ?
                                    <Text style={styles.linnerGradientTxt}>
                                        Orders are delivered{'\n'} Mon to Fr from 9 a.m.{'\n'} to 8 p.m. When you want
                                    </Text>
                                    :
                                    <Text style={styles.linnerGradientTxt}>
                                        Bestellungen werden Mo- Fr{'\n'} von 09 - 20 Uhr geliefert.{'\n'} Wann sie wollen
                                    </Text>
                                }
                            </View>
                        </LinearGradient>
                    </View>

                    {props.popularProductData ?
                        <View style={{ marginLeft: 3 }}>
                            <FlatList
                                data={props.popularProductData}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                enableEmptySections={true}
                                // refreshing={props.isFetching}
                                onEndReachedThreshold={0.4}
                                onEndReached={() => props.onEndPopularProductReachedFun()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.6} onPress={() => props.onProductDetails(item)} style={styles.popularProductStyCon}>
                                            <View style={styles.popularProductStyInne}>
                                                {item.product_image_list ?
                                                    <ImageBackground
                                                        style={styles.imgStyle} resizeMode='contain'
                                                        source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                    >
                                                        <TouchableOpacity activeOpacity={0.6} style={styles.bookMarkSty}>
                                                            <Image source={require('../../../../Assets/bookmark11.png')} />
                                                        </TouchableOpacity>
                                                    </ImageBackground>
                                                    :
                                                    null
                                                }
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
                                                <TouchableOpacity activeOpacity={0.6} onPress={() => props.addCart(item)}
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
                        : null}


                    {props.ProductListData ?
                        <View>
                            {props.ProductListData.map((data) => {
                                return (
                                    <View>
                                        <Text style={styles.headingTxt}>
                                            {data.cat_name}
                                        </Text>
                                        <View style={[styles.itemContainer]}>
                                            <FlatList
                                                data={data.product_list}
                                                numColumns={4}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={[styles.shopInnerContainer, { width: windowWidth / 4.5, }]} key={index}>
                                                            {index < 3 ?
                                                                <>
                                                                    <View style={{
                                                                        flexDirection: 'row'

                                                                    }}>
                                                                        <TouchableOpacity activeOpacity={0.6} onPress={() => props.onProductDetails(item)} style={[styles.itemCont,{width: windowWidth / 4.5,}]}>
                                                                            <View style={[styles.imgStyles, { justifyContent: 'center', alignItems: 'center' }]}>
                                                                                <Image
                                                                                    style={[styles.imgStylesss, { width: windowWidth / 4.5, }]} resizeMode='contain'
                                                                                    source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                                                />
                                                                            </View>
                                                                        </TouchableOpacity>

                                                                        {index == 2 ?
                                                                            <TouchableOpacity activeOpacity={0.6} onPress={() => props.seeAllProduct(data)} style={[styles.seeAllConat, { width: windowWidth / 4.5 }]}>
                                                                                <Image source={require('../../../../Assets/arrow_left_circle.png')} />
                                                                                <Text style={styles.seeAllText} >{Language.seeAll}</Text>
                                                                            </TouchableOpacity>
                                                                            :

                                                                            null}
                                                                    </View>
                                                                    <View style={styles.itemContTxtCon}>
                                                                        <Text numberOfLines={1} style={styles.itemContTxt}>
                                                                            {item.product_name}
                                                                        </Text>
                                                                    </View>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        : null
                    }
                </ScrollView>
            </View>
        </View>
    )
};
export default DashBoard;