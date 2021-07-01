import { Dimensions,Platform, StyleSheet } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_SEMIBOLD,
    PINK_COLOR_CODE,
    FONT_FAMILY_BOLD,
    WHITE_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    RenderViewStyle: {
        height: height / 4,
        width: width,
    },
    DeliveryImge: {
        width: width,
        height: height / 3.5,
        justifyContent: "center",
        alignItems: "center"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: PINK_COLOR_CODE,
        marginHorizontal: 4,
    },
    popularProductStyCon: {
        width: 110,
        height: 200,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 14,
        paddingLeft: 10
    },
    popularProductStyInne: {
        height: 90,
        width: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 14,
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookMarkSty: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    popularPriceCon: {
        flexDirection: 'row',
        paddingLeft: 2
    },
    popularActulPrice: {
        fontSize: 12,
        paddingLeft: 5,
        color: '#a9a9a9',
        textDecorationLine: "line-through",
    },
    addBtnCont: {
        borderWidth: 1,
        height: 30,
        marginRight: 10,
        borderColor: PINK_COLOR_CODE,
        marginTop: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBtnTxt: {
        fontSize: 13,
        fontFamily: FONT_FAMILY_REGULAR,
        color: PINK_COLOR_CODE
    },
    popularInputSty: {
        marginRight: 12,
        marginLeft: 2,
        paddingTop: 7
    },
    imgStyle: {
        width: 80,
        height: 80
    },
    linerHeadingConSty: {
        position: 'absolute',
        marginLeft: 8
    },
    linerHeadingSty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        height: 35,
        alignItems: 'center',
    },
    headinTxt: {
        color: '#ee47b3',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    seeAllTxt: {
        color: '#9244f5',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    topCategoryCon: {
        height: 100,
        margin: 5,
        borderRadius: 5,
    },
    topBoxSty: {
        height: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subcategorySty: {
        height: 40,
        backgroundColor: '#e8e8e8',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    innerSubcategorySty:{
        // height: 40,
        backgroundColor: '#e8e8e8',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft:2,
        // paddingRight: 10,
        // margin:5
    },
    subcategoryConSty: {
        height: 50,
        marginTop: 8,
        backgroundColor: '#e8e8e8',
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    subCateImg: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    subCateTxt: {
        flexDirection: 'row',
        width: '85%',
        paddingBottom: 5
    },
    circleView: {
        paddingLeft: 3,
        color: '#777777',
        fontSize: 20
    },
    saveUpTxt: {
        fontFamily: FONT_FAMILY_BOLD,
        color: WHITE_COLOR_CODE,
        fontSize: 25,
        textAlign:'center'
    },
    productItemCantainer: {
        // width: '46%',
        width: width / 2.2,
        height: 260,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        marginTop:8

        // marginRight: 5 
    },
    productItemInnerCantainer: {
        height: 130,
        // width: 135,
        width: width / 2.6,
        marginLeft: 5,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        marginTop: 5,
        borderRadius: 5,
        // shadowOpacity: 1,
        // shadowRadius: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    productTxt: {
        fontFamily: FONT_FAMILY_REGULAR
    },
    priceContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 2
    },
    priceTxt: {
        fontSize: 12,
        paddingLeft: 5,
        color: '#a9a9a9',
        textDecorationLine: "line-through",
    },
    buyBtnContainer: {
        borderWidth: 1.5,
        height: 30,
        borderColor: PINK_COLOR_CODE,
        marginTop: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6
    },
    btnTxt: {
        fontSize: 15,
        fontFamily: FONT_FAMILY_REGULAR,
        color: PINK_COLOR_CODE
    },
    emptyContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTXT: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 20,
        color: PINK_COLOR_CODE,
        paddingTop: 15
    },
    namePriceCon: {
        paddingTop: 5,
        marginLeft: 10,
        width: width / 2.6,
    },
    namePriceCotegory: {
        paddingTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
    inputspinnersty: {
        marginRight: 6,
        marginLeft: 2,
        paddingTop: 5
    },

})
export default styles;