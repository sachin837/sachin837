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
    headerCon: {
        flexDirection: "row",
        paddingTop: 10
    },
    headerTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
    },
    inputCon: {
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR,
        width: '95%'
    },
    addressCon: {
        height: 50,
        justifyContent: 'center',
        width: '85%',
    },
    btnCon: {
        position: 'absolute',
        bottom: 10,
        width: "100%"
    },
    btnInner: {
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
        alignItems: 'center'
    },
})
export default styles;