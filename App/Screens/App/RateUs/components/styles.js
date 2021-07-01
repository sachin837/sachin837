import { Dimensions, StyleSheet } from 'react-native';
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
        // backgroundColor:'#fff'

    },
    Suggest: {
        marginTop: 10,
        width: '95%',
        height: 120,
        backgroundColor: '#e8e8e8',
        elevation: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 15,
    },
    starImageStyle: {
        width: 30,
        height: 30,
        margin: 5
    },
    headerCon: {
        flexDirection: "row",
        paddingTop: 10
    },
    hearderTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
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
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        shadowRadius: 10,
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
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        shadowRadius: 10,
        backgroundColor: '#fff',
        // marginRight:15
    },
    aboutAppTxt: {
        fontFamily: FONT_FAMILY_REGULAR
    },
    rateHeading: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    reteHeadTxt: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: '#7a23f8',
        fontSize: 16
    },
    inputCOn: {
        justifyContent: 'center', 
        alignItems: 'center',
         width: '100%'
    },
    inputSty: {
        color: '#000',
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 13,
        paddingLeft: 10
    },
    btnCon: {
        height: 60,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
})
export default styles;