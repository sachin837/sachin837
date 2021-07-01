import { Dimensions, StyleSheet,Platform } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
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
    headerCon: {
        flexDirection: "row",
        paddingTop: 10
    },
    hearderTxt: {
        fontFamily: FONT_FAMILY_MEDIUM,
        color: PINK_COLOR_CODE,
        fontSize: 14
    },
    numberEmailCon: {
        height: 120,
        justifyContent: 'center'
    },
    numberView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: '#ed3aaf',
        fontSize: 15,
        paddingLeft: 8
    },
    emailCon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    imgSty:{
        height: 30,
         width: 30
    }
})
export default styles;