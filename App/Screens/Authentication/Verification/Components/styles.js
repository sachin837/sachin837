import { StyleSheet } from 'react-native';
import {
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
    windowHeight
} from '../../../../utils/constants';

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
    },
    OTPMainStyle: {
        width: '85%',
        height: 80,
        marginLeft: 10
    },
    underlineStyleBase: {
        width: 40,
        height: 40,
        borderWidth: 1.5,
        borderBottomWidth: 1.5,
        color: COMMON_BUTTON_COLOR,
        // fontFamily: Fonts.type.black,
        // fontSize: Fonts.size.h6
    },
    underlineStyleHighLighted: {
        borderColor: COMMON_BUTTON_COLOR
    },
    OTPViewStyle: {
        alignItems: 'center',
    },
    topImgSty: {
        // height: 180,
        height: windowHeight / 2 - 180,
        justifyContent: "center",
        alignItems: "center"
    },
    verficationText: {
        flex: 1,
        alignItems: "center"
    },
    enterCodeTxt: {
        width: '85%',
        color: '#666666',
        paddingTop: 15
    },
    btnConatiner: {
        alignItems: 'center',
        width: '100%',
        paddingTop: 20
    },
    scoilConatainer: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    donthaveCode: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 14
    },
    resendTxt: {
        color: COMMON_BUTTON_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 14,
    },
    bottomImg: {
        // height: 220,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default styles;