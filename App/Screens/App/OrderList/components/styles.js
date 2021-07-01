import { Dimensions, StyleSheet ,Platform} from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    WHITE_COLOR_CODE,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerCon: {
        flexDirection: "row",
        paddingTop: 5
    },
    headerTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
    },
    cartContainer: {
        position: 'absolute',
        height: '95%',
        width: '100%',
        marginLeft: 10,
        marginTop: 50,
        paddingBottom: 10
    },
    flatCon: {
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios'?0.3:1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        padding: 10,
        backgroundColor: WHITE_COLOR_CODE,
        marginVertical: 4,
        marginLeft:3,
        marginRight:5,
        borderRadius: 10,
        width: '98%'
    },
    txtStyl: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: '#000'
    },
    totalBillSty: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartInnerCon: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 15
    },
    currentOrderTxt: {
        padding: 5,
        paddingLeft: 10,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 18
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