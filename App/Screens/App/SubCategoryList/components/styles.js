import { Dimensions, StyleSheet, Platform } from 'react-native';
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
    lenerHeadingTxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    topContainer: {
        position: 'absolute',
        width: '100%',
        height: '90%',
        marginTop: 40,
        borderRadius: 10,

        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        backgroundColor: '#fff',
    },
    lenerargradient: {
        // flexDirection: "row",
        height: 100,
        margin: 8
    },
    inputspinnersty: {
        marginRight: 6,
        marginLeft: 2,
        paddingTop: 5
    },
    headingTxt: {
        color: '#ee47b3',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    productListCantainer: {
        position: 'absolute',
        height: '100%',
        marginTop: 70,
        paddingBottom: 80
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
        margin: 8,

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
    productItemCantainerCateg: {
        // width:width/2.2,
        height: 40,
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
        marginLeft: 5,
        marginBottom: 10
        // marginRight: 5 
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
    bookmark: {
        padding: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
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
    }
})
export default styles;