import { Dimensions, StyleSheet, Platform } from 'react-native';
import {
    COMMON_COLOR_CODE, BLACK_COLOR_CODE,
    FONT_FAMILY_REGULAR,
    WHITE_COLOR_CODE,
    GREY_COLOR_CODE,
    THEME_COLOR_CODE,
    COMMON_BUTTON_COLOR,
    THEME_COLOR_CODE_LIGHT,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#fff'
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
        marginTop: 45,
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
    headerCon: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    headerTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
    },
    addAddBtn: {
        paddingLeft: 3,
        color: COMMON_BUTTON_COLOR,
        fontSize: 25
    },
    flatCon: {
        // height: 95,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,


        backgroundColor: '#fff',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 7,
        marginBottom: 5
    },
    textCon: {
        padding: 12,
        flexDirection: 'row'
    },
    txtSty: {
        fontFamily: FONT_FAMILY_REGULAR
    },
    btnCon: {
        paddingRight: 10,
        flexDirection: "row"
    },
    iconTxt: {
        paddingLeft: 3,
        color: COMMON_BUTTON_COLOR,
        fontSize: 20
    },
    emtyCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptXT: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 20,
        color: PINK_COLOR_CODE,
        paddingTop: 15
    },
    linerCon: {
        flexDirection: "row",
        height: 110
    },


















})
export default styles;