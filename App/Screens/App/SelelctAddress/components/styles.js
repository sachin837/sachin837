import { Dimensions, StyleSheet, Platform } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    COMMON_BUTTON_COLOR,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    addressContainerSty: {
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
    },
    selectAddressTxt: {
        fontSize: 16,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: '#a9a9a9'
    },
    addListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatlistContainer: {
        // height: 95,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        shadowRadius: 10,
        backgroundColor: '#fff',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 7,
        marginBottom: 5
    },
    addTxt: {
        fontFamily: FONT_FAMILY_REGULAR
    },
    editBtnCon: {
        paddingRight: 10,
        flexDirection: "row"
    },
    editBtnTxt: {
        paddingLeft: 3,
        color: COMMON_BUTTON_COLOR,
        fontSize: 20
    },

    addressconTxt: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 8
    },
    circleView: {
        paddingLeft: 3,
        color: '#777777',
        fontSize: 20
    },
    btnContainer: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    flatInnerCon: {
        padding: 12,
        flexDirection: 'row'
    },
    timeModelCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        // opacity: 0.9,
    },
    timeInnderCon: {
        width: '80%',
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
        paddingTop:15
    },
    timeDataMsgCon: {
        alignItems: 'center',
        // height: 70,
        justifyContent: 'center',
        padding: 5
    },
    timeDataMsgTxt: {
        fontSize: 18,
        textAlign: 'center'
    },
    timeDateBtnCon: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5
    },
    anotherMsgCon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    anotherTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        textAlign: 'center',
        color: PINK_COLOR_CODE
    },
})
export default styles;