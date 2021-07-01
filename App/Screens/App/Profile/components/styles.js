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
    },
    userDataCon: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    userDataTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 15,
        color: PINK_COLOR_CODE
    },
    textSty: {
        color: '#a9a9a9',
        fontFamily: FONT_FAMILY_MEDIUM
    },
    languageCon: {
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
        //  borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
    },
    langInner: {
        height: 80,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        marginRight: 10,
        marginLeft: 10,
        borderBottomColor: '#eaeaea',
        borderLeftColor: '#eaeaea',
        borderRightColor: '#eaeaea',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    engBoxCon: {
        borderBottomWidth: 2,
        height: 40,
        paddingLeft: 12,
        borderBottomColor: '#eaeaea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    gerCon: {
        height: 40,
        paddingLeft: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 12
    },
    langTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#a9a9a9'
    },
})
export default styles;