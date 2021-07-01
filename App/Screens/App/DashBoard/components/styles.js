import { Dimensions, StyleSheet,Platform } from 'react-native';
import {
    COMMON_COLOR_CODE, BLACK_COLOR_CODE,
    FONT_FAMILY_REGULAR,
    WHITE_COLOR_CODE,
    GREY_COLOR_CODE,
    THEME_COLOR_CODE,
    THEME_COLOR_CODE_DARK,
    THEME_COLOR_CODE_LIGHT,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE,
    FONT_FAMILY_BOLD
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    saveUptoDot: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        flexDirection: "row"
    },
    linnerGradientSty: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        height:160
    },
    linnerGradientTxt: {
        fontSize:15,
        fontFamily: FONT_FAMILY_BOLD,
        color: PINK_COLOR_CODE
    },
    headingTxt: {
        color: PINK_COLOR_CODE,
        paddingHorizontal: 14,
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    itemContainer: {
        flexDirection: 'row',
        // height: 130,
        marginLeft: 3
    },
    shopCategoryContainer: {
        flexDirection: 'row',
        // height: 280,
        // marginLeft: 3
    },
    shopInnerContainer: {
        // height: 115,
        margin: 5,
        borderRadius: 5,
    },
    shopBox: {
        height: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 0,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 :5,

        justifyContent: 'center',
        alignItems: 'center',
    },
    shopCateCon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    shopCateTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        
    },
    itemInnerContainer: {
        // height: 115,
        margin: 5,
        borderRadius: 5,

    },
    itemCont: {
        height: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 0,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 :5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seeAllConat: {
        height: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 0,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 :5,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 80,
        marginLeft: 12
    },
    ShopseeAllConat: {
        height: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 0,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 :5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        // marginLeft: 12
    },
    seeAllText: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 12
    },
    itemContTxt: {
        fontFamily: FONT_FAMILY_REGULAR
    },
    itemContTxtCon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    popularTopCont: {
        flexDirection: 'row',
        height: 130,
        marginLeft: 3,
        marginBottom: 10
    },
    imgStyle: {
        width: 80,
        height: 80
    },
    imgStyles: {
        // width: 80,
        height: 90,
        borderRadius:8
    },
    imgStylesss: {
        // width: 70,
        height: 80,
        borderRadius:8
    },

    popularProductStyCon: {
        width: 110,
        height: 210,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 0,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 :5,
        paddingLeft: 10
    },
    popularProductStyInne: {
        height: 90,
        width: 90,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 0,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 :5,
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
    RenderViewStyle: {
        // height: height / 4,
        // width: width,
    },
    DeliveryImge: {
        // width: width,
        // height: height / 3.5,
        // justifyContent: "center",
        // alignItems: "center"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: PINK_COLOR_CODE,
        marginHorizontal: 4,
    },
    saveUpTxt: {
        fontFamily: FONT_FAMILY_BOLD,
        color: WHITE_COLOR_CODE,
        fontSize: 25,
        textAlign:'center'
    }
})
export default styles;