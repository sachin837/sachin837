import { Dimensions, StyleSheet, Platform } from 'react-native';
import {
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    FONT_FAMILY_REGULAR,
    PINK_COLOR_CODE
} from '../../../../utils/constants'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    RecommandationCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10, paddingTop: 4
    },
    recommFlatCon: {
        flexDirection: 'row',
        marginLeft: 5
    },
    flatCon: {
        width: 145,
        height: 145,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        shadowRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatInnerCon: {
        height: 125,
        width: 125,
        backgroundColor: '#fff',
        borderColor: '#a9a9a9',
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    PreviouslyCon: {
        color: '#979797',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    PreviouslyFlat: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginRight: 25,
        borderTopColor: '#979797'
    },
    previTxt: {
        color: '#a9a9a9',
        fontFamily: FONT_FAMILY_SEMIBOLD,
        paddingLeft: 8
    },
    recTxt: {
        color: '#ee47b3',
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontSize: 18
    },
    linnerCon: {
        height: 205,
        marginTop: 10,
        margin: 8
    },
    emptyContainer: {
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTXT: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 20,
        color: PINK_COLOR_CODE,
        paddingTop: 15
    },
    topContainer: {
        // position: 'absolute',
        width: '95%',
        margin: 10,
        height: '87%',
        marginTop: 10,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0.5 : 7,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
        shadowRadius: Platform.OS === 'ios' ? 3 : 10,
        // elevation: Platform.OS === 'ios' ? 1 : 2,
        shadowRadius: 10,
        backgroundColor: '#fff',
        // marginRight:15
    },
})
export default styles;