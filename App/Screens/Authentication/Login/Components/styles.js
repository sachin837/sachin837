import { Platform, StyleSheet } from 'react-native';
import {
    windowHeight,
    BLACK_COLOR_CODE,
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_BOLD,
    GREY_COLOR_CODE,
    THEME_COLOR_CODE,
    THEME_COLOR_CODE_DARK,
    COMMON_BUTTON_COLOR,
    FONT_FAMILY_MEDIUM,
    FONT_FAMILY_SEMIBOLD,
    THEME_COLOR_CODE_LIGHT,

} from '../../../../utils/constants';

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
    },
    topImgSty: {
        height: windowHeight / 2 - 180,
        justifyContent: "center",
        alignItems: "center"
    },
    loginContainer: {
        flex: 1,
        alignItems: "center"
    },
    countryCodeSty: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        paddingTop: 15
    },
    countryCodeTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: '#000',
        paddingLeft: 5,
        paddingRight: 3
    },
    dropImgSty: {
        width: 15,
        height: 15
    },
    inputSty: {
        width: '60%',
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR,
        paddingTop: Platform.OS === 'ios' ? 15 : 30,
        paddingLeft: 5
    },
    dontHaveAccount: {
        flexDirection: 'row',
        marginTop: 20
    },
    dontHaveAccountTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 14
    },
    registerTxt: {
        color: COMMON_BUTTON_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 14,
    },
    continueWithSty: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 14,
        opacity: 0.5
    },
    socialContianer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    bottomImgSty: {
        // height: 220,
        justifyContent: "center",
        alignItems: "center"
    },

    countyModelCon: {
        height: Platform.OS === 'ios' ? windowHeight - 10 : '100%',
        // height: '87%',
        backgroundColor: '#f5f2f2',
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingTop: 10
    },
    searchInputCon: {
        width: '82%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#a9a9a9',
        margin: 10,
        height: 38,
        justifyContent: 'center'
    },
    serchInput: {
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR,
        paddingBottom: 5,
        paddingLeft: 5
    },
    countryCodeSelect: {
        height: 35,
        flexDirection: "row",
        paddingLeft: 15,
        alignItems: "center",
        borderTopWidth: 0.4,
        borderTopColor: '#a9a9a9'
    },








    FirstContent: {
        flexDirection: 'row',
        width: '100%',
        height: '11%',
        justifyContent: 'space-between'
    },
    ChoiceOfYou: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'center'
    },
    Passenger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '45%'
    },
    Driver: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '45%'
    },
    Others: {
        minWidth: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'space-evenly',
    }
})
export default styles;