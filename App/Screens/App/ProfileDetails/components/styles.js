import { Dimensions, StyleSheet, Platform } from 'react-native';
import {
    PINK_COLOR_CODE,
    FONT_FAMILY_MEDIUM,
    FONT_FAMILY_REGULAR,
    COMMON_BUTTON_COLOR

} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    profileTab: {
        height: 43,
        marginTop: 8,
        paddingLeft: 12,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,

        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
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
        // marginRight:15
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
    profileDetCon: {
        flexDirection: "row",
        paddingTop: 10
    },
    profileDetailTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
    },
    inputCon: {
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR,
        width: '95%'
    },
    addreassCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    addressTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#000'
    },
    editCon: {
        paddingLeft: 3,
        color: COMMON_BUTTON_COLOR,
        fontSize: 20
    },
    btnCon: {
        position: 'absolute',
        bottom: 5,
        width: "100%"
    },
    linerCon: {
        flexDirection: "row",
        height: 50
    },
    innerCon: {
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
        alignItems: 'center'
    },
})
export default styles;