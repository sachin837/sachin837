import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,Dimensions,Platform
} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import InputSpinner from "react-native-input-spinner";
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language'
import styles from './styles'
import _ from 'lodash'

import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Category = (props) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
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
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{
                        height: windowHeight / 3.5,
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
                                    <View key={index} style={styles.RenderViewStyle}>
                                        <ImageBackground  style={[styles.s]} source={item.Image} >
                                            {index == 2 ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height / 3.5, justifyContent: 'space-between', width: width, }}>
                                                    <View style={{ width: width / 2 - 100 }}>
                                                        <Text style={{ color: 'red' }}></Text>
                                                    </View>
                                                    <View style={{ width: width / 2, paddingRight: 20 }}>
                                                        <Text style={[styles.saveUpTxt, { fontSize: 20, color: '#000' }]}>{item.discount}</Text>
                                                    </View>
                                                </View>
                                                : index == 1 ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: height / 3.5, justifyContent: 'space-between', width: width, }}>
                                                        <View style={{backgroundColor:'red' }}>
                                                            <Text style={{ color: 'red' }}></Text>
                                                        </View>
                                                        <View style={{ width: width / 2.2,paddingRight: 10 }}>
                                                            <Text style={[styles.saveUpTxt, { fontSize: 20 }]}>{item.discount}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: height / 3.5, }}>
                                                        <Text style={styles.saveUpTxt}>{item.discount}</Text>
                                                    </View>
                                            }
                                        </ImageBackground>
                                    </View>
                                );
                            }
                            )}
                        </ScrollView>
                        <View style={{
                            position: 'absolute',
                            top: windowHeight / 4, alignItems: 'center',
                            justifyContent: 'center',
                            right: 20, flexDirection: "row"
                        }}>
                            {props.landingSlider.map((image, imageIndex) => {
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
                    <View style={{ flexDirection: 'row', height: 100 }}>
                        {props.shopCategoryData ?
                            <FlatList
                                data={props.shopCategoryData}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                enableEmptySections={true}
                                // refreshing={props.isFetching}
                                onEndReachedThreshold={0.4}
                                onEndReached={() => props.onEndShopCateReachedFun()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.6} onPress={() => props.categoryListFun(item)}
                                            style={[styles.topCategoryCon, { width: windowWidth / 4.5, }]} key={index}>
                                            <View>
                                                <View style={[styles.topBoxSty, { width: windowWidth / 4.5, }]}>
                                                    <Image
                                                        style={{ width: windowWidth / 4.5, height: 70 }} resizeMode='cover'
                                                        source={{ uri: item.cat_image }}
                                                    />
                                                    <View style={{}}>
                                                        <Text numberOfLines={1} style={{ fontSize: 12 }}>
                                                            {item.cat_name}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            :
                            null
                        }
                    </View>
                    <View style={{ marginRight: 10, marginLeft: 10, marginTop: 5, backgroundColor: "#fff", height: 450, paddingBottom: 10 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
                            {props.shopCategoryData ?
                                <FlatList
                                    data={props.shopCategoryData}
                                    keyExtractor={(item, index) => index.toString()}
                                    enableEmptySections={true}
                                    // refreshing={props.isFetching}
                                    onEndReachedThreshold={0.4}
                                    onEndReached={() => props.onEndShopCateReachedFun()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View>
                                                <TouchableOpacity activeOpacity={0.6} onPress={() => {
                                                    // index === props.showIndex ? null :
                                                    props.subCategoryFun(item)
                                                    //  ,
                                                    // props.setShowIndex(index === props.showIndex ? null : index)
                                                }}
                                                    style={styles.subcategoryConSty}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                        <Image source={{ uri: item.cat_image }} resizeMode='cover' style={styles.subCateImg} />
                                                        <Text numberOfLines={1} style={{ paddingLeft: 5, fontSize: 16, fontFamily: FONT_FAMILY_REGULAR }}>{item.cat_name}</Text>
                                                    </View>
                                                    <AntDesign name={index === props.showIndex ? 'down' : 'right'} style={styles.circleView} />
                                                </TouchableOpacity>
                                                {index === props.showIndex &&
                                                    <View>
                                                        {/* <View style={{ backgroundColor: '#e8e8e8', paddingLeft: 20 }}>
                                                        <FlatList
                                                            data={props.pageSlider}
                                                            keyExtractor={(item, index) => index.toString()}
                                                            horizontal
                                                            renderItem={({ item, index }) => {
                                                                return (
                                                                    <TouchableOpacity onPress={() => props.previewsSerachFun(item, index)} style={{ margin: 2, padding: 2, }}>
                                                                        <Text style={{ color: PINK_COLOR_CODE, fontFamily: FONT_FAMILY_BOLD, padding: 2 }}>{item.cat_name} {'>'}</Text>
                                                                    </TouchableOpacity>
                                                                )
                                                            }}
                                                        />
                                                    </View> */}
                                                        {props.productData ?
                                                            <>
                                                                {/* {props.productData.categoryList ?
                                                                <FlatList
                                                                    data={props.productData.categoryList}
                                                                    keyExtractor={(item, index) => index.toString()}
                                                                    renderItem={({ item, index }) => {
                                                                        return (
                                                                            <TouchableOpacity activeOpacity={0.6} onPress={() => props.InnserSubCategoryFun(item)} style={styles.subcategorySty}>
                                                                                <View style={[styles.subCateTxt, { paddingLeft: 38, paddingBottom: 15, flexDirection: "row", justifyContent: 'space-between' }]}>
                                                                                    <Text numberOfLines={1} style={{ paddingLeft: 5 }}>{item.cat_name}</Text>
                                                                                    <AntDesign name='right' style={styles.circleView} />

                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )
                                                                    }}
                                                                />
                                                                : null
                                                            } */}
                                                                {/* {props.productData.categoryList ? props.productData.productList ?
                                                                    <FlatList
                                                                        data={props.productData.productList}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                        renderItem={({ item, index }) => {
                                                                            return (
                                                                                <TouchableOpacity activeOpacity={0.6} onPress={() => props.productDetailsFun(item)} style={styles.innerSubcategorySty}>
                                                                                    <View style={[styles.subCateTxt, { paddingLeft: 30, paddingBottom:8,paddingTop:5,alignItems:'center'}]}>
                                                                                        <Image source={{ uri: item.product_image_url + item.product_image_list[0].image }} resizeMode= 'cover'  style={styles.subCateImg} />
                                                                                        <Text numberOfLines={1} style={{ paddingLeft: 5 }}>{item.product_name}</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            )
                                                                        }}
                                                                    />
                                                                    : null
                                                                    : null
                                                                } */}
                                                                {props.productData.categoryList ? props.productData.productList ?

                                                                    <FlatList
                                                                        data={props.productData.productList}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                        numColumns={2}
                                                                        renderItem={({ item, index }) => {
                                                                            return (
                                                                                <TouchableOpacity activeOpacity={0.6} onPress={() => props.productDetailsFun(item)} key={index} style={styles.productItemCantainer} key={index}>
                                                                                    <View>
                                                                                        <View style={styles.productItemInnerCantainer}>
                                                                                            <ImageBackground
                                                                                                style={{ width: 110, height: 110 }} resizeMode='cover'
                                                                                                source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                                                            >
                                                                                                <TouchableOpacity activeOpacity={0.6} style={styles.bookmark}>
                                                                                                    {/* <Image source={require('../../../../Assets/bookmark11.png')} /> */}
                                                                                                </TouchableOpacity>
                                                                                            </ImageBackground>
                                                                                        </View>
                                                                                        <View style={styles.namePriceCon}>
                                                                                            <Text numberOfLines={1} style={styles.productTxt}>
                                                                                                {item.product_name}
                                                                                            </Text>
                                                                                            <Text numberOfLines={1} style={styles.productTxt}>
                                                                                                {item.product_unit_qty} {item.unit_qty}
                                                                                            </Text>
                                                                                            <View style={styles.priceContainer}>
                                                                                                <Text style={{ fontSize: 12, }}>{'\u20AC'} {item.product_unit_price}</Text>
                                                                                                <Text style={styles.priceTxt}> {'\u20AC'} {spanishNumberFormatter.format(parseFloat((`${item.product_unit_price}`).replace(/,/g, '.')) + parseFloat((`${item.discount}`).replace(/,/g, '.')))}</Text>
                                                                                            </View>
                                                                                            {_.filter(props.cartVal, { product_id: item.product_id }).length > 0 ?
                                                                                                <View style={styles.inputspinnersty}>
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
                                                                                                        value={_.filter(props.cartVal, { product_id: item.product_id })[0].total_unit_qty}
                                                                                                        onDecrease={(i) => props.onDecrease(i, item)}
                                                                                                        onIncrease={(i) => props.onIncrease(i, item)}
                                                                                                        buttonStyle={{
                                                                                                            width: 40,
                                                                                                        }}
                                                                                                        inputStyle={{
                                                                                                            color: "#000",
                                                                                                            fontSize: 12,
                                                                                                            paddingBottom:Platform.OS === 'ios' ? 0 : 5,
                                                                                                        }}
                                                                                                        editable={false}
                                                                                                    />
                                                                                                </View>
                                                                                                :
                                                                                                <TouchableOpacity activeOpacity={0.6} onPress={() => props.addCart(item)} style={styles.buyBtnContainer}>
                                                                                                    <Text style={styles.btnTxt}>
                                                                                                        {Language.Buy}</Text>
                                                                                                </TouchableOpacity>
                                                                                            }
                                                                                        </View>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            )
                                                                        }}
                                                                        ListEmptyComponent={
                                                                            <View style={[styles.emptyContainer, { width: windowWidth, height: windowHeight - 150 }]}>
                                                                                <View>
                                                                                    <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                                                                                </View>
                                                                                <View>
                                                                                    <Text style={styles.emptyTXT}>{Language.productEmptyList}</Text>
                                                                                </View>
                                                                            </View>

                                                                        }
                                                                    />








                                                                    // <FlatList
                                                                    //     data={props.productData.productList}
                                                                    //     keyExtractor={(item, index) => index.toString()}
                                                                    //     renderItem={({ item, index }) => {
                                                                    //         return (
                                                                    //             <TouchableOpacity activeOpacity={0.6} onPress={() => props.productDetailsFun(item)} style={styles.innerSubcategorySty}>
                                                                    //                 <View style={[styles.subCateTxt, { paddingLeft: 30, paddingBottom: 8, paddingTop: 5, alignItems: 'center' }]}>
                                                                    //                     <Image source={{ uri: item.product_image_url + item.product_image_list[0].image }} resizeMode='cover' style={styles.subCateImg} />
                                                                    //                     <Text numberOfLines={1} style={{ paddingLeft: 5 }}>{item.product_name}</Text>
                                                                    //                 </View>
                                                                    //             </TouchableOpacity>
                                                                    //         )
                                                                    //     }}
                                                                    // />
                                                                    : null
                                                                    : null
                                                                }
                                                            </>
                                                            :
                                                            <View style={[styles.subcategorySty, { justifyContent: 'center', alignItems: 'center' }]}>
                                                                <Text style={styles.emptyTXT}>{Language.productEmptyList}</Text>
                                                            </View>
                                                        }
                                                    </View>
                                                }



                                            </View>
                                        )
                                    }}
                                />
                                :
                                null
                            }
                        </ScrollView>
                    </View>

                    <View style={{ height: 250, margin: 5 }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#fad7ef', '#f1d5f4']}
                            style={{
                                flexDirection: "row", height: 160,
                            }}>

                        </LinearGradient>
                        <View style={styles.linerHeadingConSty}>
                            <View style={[styles.linerHeadingSty, { width: windowWidth }]}>
                                <Text style={styles.headinTxt}>{Language.RecommandedProducts}</Text>
                                <TouchableOpacity activeOpacity={0.6} style={{ paddingRight: 15 }} onPress={() => props.RecommandedProducts()}>
                                    <Text style={styles.seeAllTxt}>{Language.seeAll}</Text>
                                </TouchableOpacity>
                            </View>
                            {props.popularProductData ?
                                <View>
                                    <FlatList
                                        data={props.popularProductData}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity activeOpacity={0.6} onPress={() => props.productDetailsFun(item)} style={styles.popularProductStyCon}>
                                                    <View style={styles.popularProductStyInne}>
                                                        <ImageBackground
                                                            style={styles.imgStyle} resizeMode='center'
                                                            source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                        >
                                                            <TouchableOpacity activeOpacity={0.6} style={styles.bookMarkSty}>
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
                                                                    paddingBottom:Platform.OS === 'ios' ? 0 : 5,
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
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View >
    )
};
export default Category;