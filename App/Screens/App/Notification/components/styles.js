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
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: 40

    },
    topCon: {
        height: '98%',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    flatListCon: {
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
    headingTxt: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontSize: 15
    },
    dateCon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dateTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        paddingRight: 5,
        fontSize: 13
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
        color: '#000',
        fontSize: 14
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
    },

})
export default styles;