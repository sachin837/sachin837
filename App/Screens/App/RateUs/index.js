import React, { useState } from 'react';
import { View } from 'react-native';
import RateUsScreen from './components/RateUs'
import Loader from '../../../utils/Loader';
import {
    FONT_FAMILY_REGULAR,
    WARNING_COLOR_CODE,
    PINK_COLOR_CODE
} from '../../../utils/constants';
import AnimatedAlert from '../../../components/AnimatedAlert';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import ENDPOINTS from '../../../utils/apiEndPoints';
import Language from '../../../components/Language';
import { CartContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer'
const RateUs = ({ navigation }) => {

    const [alertMessage, setAlertMessage] = useState('');
    const [aboutData, setAboutData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rateTxt, setRateTxt] = useState('');

    // useFocusEffect(
    //     React.useCallback(() => {
    //         // AboutFun()
    //     }, [])
    // );

    function validationForm() {
        if (rateTxt == '') {
            setAlertMessage(Language.enterFeedBack);
            AnimatedAlert.showAlert()
            return false;
        }
        return true;
    };
    async function RateUsFun(defaultRating) {
        const valid = await validationForm()
        if (valid === true) {
            try {
                setIsLoading(true)
                const params = {
                    'rate': defaultRating,
                    'feedback_text': rateTxt
                }
                const { data } = await apiCall('POST', ENDPOINTS.RATE_US, params);
                console.log("data aboutData", data);
                if (data.status === 200) {
                    setIsLoading(false)
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setTimeout(() => {
                        navigation.goBack(null)
                    }, 1000);
                } else if (data.status === 201) {
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
            }
        }
    };

    const goback = () => {
        navigation.goBack(null)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            {isLoading && <Loader state={isLoading} />}
            <RateUsScreen
                goback={goback}
                rateTxt={rateTxt}
                setRateTxt={setRateTxt}
                RateUsFun={RateUsFun}
            />
            <Footer/>
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default RateUs;