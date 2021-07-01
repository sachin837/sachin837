import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputSpinner from "react-native-input-spinner";
import _ from 'lodash'
import Header from '../../../../components/Header';
import Language from '../../../../components/Language';
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Category = (props) => {
    const windowWidth = useWindowDimensions().width;
    const formatConfig = {
        currency: "USD", // CNY for Chinese Yen, EUR for Euro
        minimumFractionDigits: 2,
    };
    const spanishNumberFormatter = new Intl.NumberFormat("es-ES", formatConfig);
    return (

        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#fad7ef', '#f1d5f4']}
                    style={styles.lenerargradient}>
                    <View style={styles.lenerHeadingTxt}>
                        <Text style={styles.headingTxt}>
                            {props.item?.cat_name}
                        </Text>
                    </View>
                </LinearGradient>
                <View style={styles.productListCantainer}>
                    {props.productCategoryData ?
                        <FlatList
                            data={props.productCategoryData}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            // enableEmptySections={true}
                            // refreshing={props.isFetching}
                            // onEndReachedThreshold={0.4}
                            // onEndReached={() => props.onEndReachedFun()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => props.onProductDetails(item)} key={index} style={styles.productItemCantainer} key={index}>
                                        <View>
                                            <View style={styles.productItemInnerCantainer}>
                                                <ImageBackground
                                                    style={{ width: 110, height: 110 }} resizeMode='stretch'
                                                    source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                >
                                                    <TouchableOpacity activeOpacity={0.6} style={styles.bookmark}>
                                                        <Image source={require('../../../../Assets/bookmark11.png')} />
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
                        />
                        :
                        <View style={[styles.emptyContainer, { width: windowWidth }]}>
                            <View>
                                <Image source={require('../../../../Assets/2eacfa305d7715bdcd86bb4956209038.png')} />
                            </View>
                            <View>
                                <Text style={styles.emptyTXT}>{Language.productEmptyList}</Text>
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
        </View >
    )
};
export default Category;