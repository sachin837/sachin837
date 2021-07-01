import { Dimensions, StyleSheet, Platform } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    selectPaymentCon: {
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
        height: 250,
        marginTop: 15

    },
    paymentMethodcon: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 8
    },
    paymentMethodTxt: {
        fontSize: 15,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: '#a9a9a9'
    },
    amoutContainer: {
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    amoutTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#4c4c4c',
        paddingLeft: 10
    },
    paymentMethodCon: {
        flexDirection: 'row',
        width: '85%',
        marginTop: 15
    },
    imgCon: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    methodTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 15,
        color: '#4c4c4c'
    },
    btnContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 50,
    },
    btnInnerCon: {
        height: 80,
        marginLeft: 25,
        marginRight: 25,
        justifyContent: "center",
        alignItems: 'center'
    },
    onlineBtnCon: {
        flexDirection: 'row',
        width: '85%',
        marginTop: 10
    },
    txtCon: {
        justifyContent: 'center',
        paddingTop: 5

    },
    timeModelCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        // opacity: 0.9,
    },
    timeInnderCon: {
        width: '95%',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 25,
        paddingBottom:15,
        // paddingTop:15,
        // backgroundColor:'red'
    },
})
export default styles;