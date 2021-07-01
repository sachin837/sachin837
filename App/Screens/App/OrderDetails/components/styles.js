import { Dimensions, StyleSheet, Platform } from 'react-native';
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
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headCon: {
        flexDirection: "row", paddingTop: 2
    },
    headerTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
    },
    billDetailsCon: {
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        borderRadius: 5,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    billDetailsTxt: {
        paddingTop: 10,
        paddingLeft: 8,
        paddingBottom: 5,
        color: '#8a3ff8',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    billInnerCon: {
        justifyContent: 'space-between'
    },
    bilTxt: {
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR
    },
    deliverImg: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'flex-end',
        paddingRight: 10,
        alignItems: 'flex-end'
    },
    billDetialTxt: {
        paddingLeft: 8,
        paddingTop: 5,
        color: '#8a3ff8',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    headingCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        alignItems: 'center'
    },
    productCon: {
        width: '50%'
    },
    productTxt: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: '#a9a9a9'
    },
    QuantityCon: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceCon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    },
    flatCon: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    flatTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#000'
    },
    quantitytxt: {
        width: '30%',
        alignItems: 'center'
    },
    pricetxt: {
        width: '20%',
        alignItems: "center",
        paddingLeft: 15
    },
    totalAmoutCon: {
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        marginRight: 20,
        marginLeft: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end', paddingTop: 10
    },
    txtHead: {
        fontFamily: FONT_FAMILY_REGULAR,
        paddingRight: 15
    },
    addSingTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: 'green'
    },
    taxSty: {
        fontFamily: FONT_FAMILY_REGULAR,
        paddingRight: 25
    },
    totalAmoutTxt: {
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
    flexDirec: {
        flexDirection: 'row'
    },
    linearGra: {
        paddingVertical: 5,
        // margin: 8,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8
    },
    boxCon: {
        height: '100%',
        marginBottom: 10
    },



    timeModelCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 0.9,
      },
      timeInnderCon: {
        width: '80%',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        shadowOffset: {
          width: 0,
          height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 25,
      },
      timeDataMsgCon: {
        alignItems: 'center',
        // height: 70,
        justifyContent: 'center',
        padding: 5
      },
      timeDataMsgTxt: {
        fontSize: 18,
        textAlign: 'center'
      },
      timeDateBtnCon: {
        height: 50,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },

})
export default styles;