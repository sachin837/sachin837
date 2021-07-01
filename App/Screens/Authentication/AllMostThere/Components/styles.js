import { StyleSheet,Platform } from 'react-native';
import {
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_SEMIBOLD,
    MAP_KEY,
    PINK_COLOR_CODE
} from '../../../../utils/constants';

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    topImg: {
        height: 180,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContianer: {
        flex: 1,
        alignItems: "center"
    },
    inputContianersss: {
        paddingTop: 10,
        width: '100%',
        alignItems: 'center'
    },
    inputSty: {
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        width: '85%',
        color: '#000',
        paddingLeft: 4,
        fontFamily: FONT_FAMILY_REGULAR,
        height:Platform.OS === 'ios' ? 55 :40
    },
    addressCont: {
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        height: 50,
        justifyContent: 'center',
        width: '85%',
    },
    addressTxt: {
        paddingLeft: 6,
        fontFamily: FONT_FAMILY_REGULAR,
    },
    cityCon: {
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        height: 50,
        justifyContent: 'center',
        width: '85%',
    }

})
export default styles;