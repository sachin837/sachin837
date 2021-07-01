import { Dimensions, StyleSheet, Platform } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE,windowWidth
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    cartHeadingCon: {
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        borderRadius: 5,
        margin: 8,
        backgroundColor: '#fff',
    },
    headingInnerCon: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        alignItems: 'center'
    },
    headignTxt: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: '#a9a9a9'
    },
    QuantityCon: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PriceCon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatCont: {
        flexDirection: 'row',
        height: 40,
        // alignItems:'center'
    },
    productNameCon: {
        width: '45%',
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        paddingBottom: 10

    },
    productTxt: {
        fontFamily: FONT_FAMILY_REGULAR
    },
    InputSpinnerSty: {
        height: 30,
        width: '25%',
        marginLeft: 15,
        marginRight: 15,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    priceCon: {
        width: '20%',
        paddingLeft: 15
    },
    couponCodeCon: {
        marginRight: 20,
        marginLeft: 15,
        borderTopWidth: 1,
        justifyContent: 'center',
        height: 60,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
        borderTopColor: '#ebebeb'
    },
    couponCodeView: {
        height: 40,
        alignItems: 'center',
        backgroundColor: '#e4d3fe',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8
    },
    couponView: {
        paddingLeft: 10,
        width: '78%'
    },
    couponCodeTxt: {
        fontSize: 12,
        fontFamily: FONT_FAMILY_REGULAR
    },
    applyBtnTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#8333f8',
        fontSize: 12
    },
    totalAmountCon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 10
    },
    amoutInner: {
        flexDirection: 'row',
        paddingRight: 20
    },
    amoutHeadTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        paddingRight: 15
    },
    signicon: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: 'green'
    },
    totalAmountView: {
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
        paddingTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
        borderTopColor: '#ebebeb'
    },
    btnCon: {
        height: 140,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    continueTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#8333f8'
    },
    flexDirectionView: {
        flexDirection: 'row',
    },
    modelCon: {
        // backgroundColor: '#fff',
        // opacity: 0.9,
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelInnerCon: {
        width: '90%',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 24,
        backgroundColor: '#fff',
        borderRadius:8
    },
    closeBtnCon: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    couponTxt: {
        paddingLeft: 10,
        fontFamily: FONT_FAMILY_REGULAR
    },
    modelInput: {
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#edeaea',
        marginRight: 20,
        marginLeft: 10,
        borderRadius: 5,
    },
    inputCont: {
        width: '95%',
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR,
        height: 40,
        padding: 10, marginTop: 2
    },
    modelBtnCon: {
        height: 60,
        marginLeft: 10,
        marginRight: 20,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom:15
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '95%',
        marginLeft:5,
        marginTop: 10,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        // elevation: Platform.OS === 'ios' ? 1 : 2,
        shadowRadius: 10,
        backgroundColor: '#fff',
        width: windowWidth-10
    },
    emptyTXT: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 20,
        color: PINK_COLOR_CODE,
        paddingTop: 15
    },
    checkboxContainer: {
        flexDirection: "row",
        // marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
})
export default styles;