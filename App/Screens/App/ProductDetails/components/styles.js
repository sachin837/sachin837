import { Dimensions, StyleSheet,Platform } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_SEMIBOLD,
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    RenderViewStyle: {
        height: 250,
        width: width,
        backgroundColor: '#fff'
    },
    inputspinnersty: {
        marginRight: 6,
        marginLeft: 2,
        paddingTop: 5
    },
    DeliveryImge: {
        width: width,
        height: 200,
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
    topContainer: {
        height: 220,
    },
    topSilderDot: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // right:0, 
        flexDirection: "row",
    },
    itemDetailCon: {
        marginLeft: 10,
        paddingTop: 8,
        backgroundColor: '#fff'
    },
    itemName: {
        color: '#000',
        fontFamily: FONT_FAMILY_SEMIBOLD,
        paddingLeft: 4
    },
    PriceSty: {
        flexDirection: 'row',
        paddingTop: 2,
        paddingLeft: 5
    },
    packSize: {
        fontFamily: FONT_FAMILY_REGULAR,
        paddingLeft: 4
    },
    packSize1: {
        fontFamily: FONT_FAMILY_REGULAR,
    },
    actulPrice: {
        fontSize: 12,
        paddingLeft: 5,
        color: '#a9a9a9',
        textDecorationLine: "line-through",
    },
    AboutProduct: {
        height: 40, justifyContent: 'center'
    },
    aboutProductHead: {
        paddingLeft: 5,
        paddingTop: 10,
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    aboutProductTxt: {
        paddingLeft: 5,
        fontFamily: FONT_FAMILY_REGULAR
    },
    btnContainer: {
        height: 90,
        borderBottomWidth: 0.5,
        borderBottomColor: '#a9a9a9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnInnerCont: {
        height: 45,
        width: '55%',
        borderRadius: 30,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: PINK_COLOR_CODE
    },
    btnTxt: {
        color: PINK_COLOR_CODE,
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    similarProductCona: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10, paddingTop: 4
    },
    similarTxt: {
        color: '#000',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    similarTopCon: {
        flexDirection: 'row',
        height: 260
    },
    similarItemConatiner:{
        width: 130,
        height: 240,
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
        elevation: Platform.OS === 'ios' ? 1 : 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    similarItemInnerConatiner:{
        height: 115,
        width: 110,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
        elevation: Platform.OS === 'ios' ? 1 : 5,
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
        elevation: Platform.OS === 'ios' ? 1 : 5,
        shadowRadius: 10,
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
    headerCon: {
        flexDirection: "row",
        paddingTop: 5
    },



})
export default styles;