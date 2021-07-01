import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProfileScreen from './components/Profile'
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
import { UserDataContext } from '../../../utils/UserContext';
import Footer from '../../../components/Footer'
const Profile = ({ navigation }) => {
    const [userData, setUserData] = useContext(UserDataContext);
    const [profileData, setProfileData] = useState({
        name: "",
        mobile: "",
        email: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    useFocusEffect(
        React.useCallback(() => {
            getProfileFun()
        }, [])
    );


    async function getProfileFun() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_PROFILE);
            console.log('data: ', data);
            if (data.status === 200) {
                setProfileData(data.data)
                setUserData(data.data)
                setIsLoading(false)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            console.log('Error', e)
        }
    }

    function validationForm() {
        if (profileData.name == '') {
            setAlertMessage(Language.enterName);
            AnimatedAlert.showAlert()
            return false;
        }
        if (profileData.email == '') {
            setAlertMessage(Language.enterEmail);
            AnimatedAlert.showAlert()
            return false;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(profileData.email) === false) {
            AnimatedAlert.showAlert()
            setAlertMessage(Language.enterCorrectEmail);
            return false;
        }
        return true;
    };

    async function updateProfileFun() {
        const valid = await validationForm()
        if (valid === true) {
            try {
                setIsLoading(true)
                const params = {
                    'name': profileData.name,
                    'email': profileData.email,
                    'mobile': profileData.mobile,
                    'country_code': profileData.country_code,
                }
                const { data } = await apiCall('POST', ENDPOINTS.GET_UPDATE_PROFILE, params);
                if (data.status === 200) {
                    setUserData(data.data[0])
                    setProfileData({
                        name: data.data[0].name,
                        mobile: data.data[0].mobile,
                        email: data.data[0].email,
                    })
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setIsLoading(false)
                } else if (data.status === 201) {
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setIsLoading(false)
                }
            } catch (e) {
                setIsLoading(false)
                console.log('Error', e)
            }
        }
    }


    const goback = () => {
        navigation.goBack(null)
    }
    const editMobileNo = () => {
        navigation.navigate('EditMobileNo', { profileData })
    }




    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <View style={{ flex: 1 }}>
                <ProfileScreen
                    goback={goback}
                    setProfileData={setProfileData}
                    profileData={profileData}
                    updateProfileFun={updateProfileFun}
                    editMobileNo={editMobileNo}
                />
            </View>
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
export default Profile;