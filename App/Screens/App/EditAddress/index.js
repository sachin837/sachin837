import React, { useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EditAddressScreen from './components/EditAddress'
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
import Footer from '../../../components/Footer'
const EditAddress = ({ navigation, route }) => {
    const { item } = route.params
    console.log("item ", item);
    const [addressData, setAddressData] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [addressAuto, setAddressAuto] = useState(item);
    const [isLoading, setIsLoading] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true)
            setTimeout(function () {
                setAddressData({
                    houseNo: item.house_no,
                    landMark: item.landmark,
                    city: '',
                    pin_code: '',
                    address: item.address,
                    latitude: item.latitude,
                    longitude: item.longitude,
                })
                setIsLoading(false)
            }, 1000)
        }, [item])
    );

    const goback = () => {
        navigation.goBack(null)
    }


    function validationForm() {
        if (addressData.houseNo == '') {
            setAlertMessage(Language.houseNo);
            AnimatedAlert.showAlert()
            return false;
        }
        if (addressData.address == '') {
            setAlertMessage(Language.addAddress);
            AnimatedAlert.showAlert()
            return false;
        }
        // if (addressData.landMark == '') {
        //     setAlertMessage(Language.landMark);
        //     AnimatedAlert.showAlert()
        //     return false;
        // }
        if (addressAuto?.city ? addressAuto.city == '' : addressData.city == '') {
            setAlertMessage(Language.city);
            AnimatedAlert.showAlert()
            return false;
        }
        if (addressAuto?.pin_code ? addressAuto.pin_code == '' : addressData.pin_code == '') {
            setAlertMessage(Language.pinCode);
            AnimatedAlert.showAlert()
            return false;
        }
        return true;
    };


    async function onAddAddress() {
        const valid = await validationForm()
        if (valid === true) {
            try {
                setIsLoading(true)
                const params = {
                    "address_id": item.address_id,
                    "address_type": 1,
                    "house_no": addressData.houseNo,
                    "address": addressData.address,
                    "landmark": addressData.landMark,
                    "city": addressAuto.city ? addressAuto.city : addressData.city,
                    "pin_code": addressAuto.pin_code ? addressAuto.pin_code : addressData.pin_code,
                    "latitude": addressData.latitude,
                    "longitude": addressData.longitude
                }

                console.log('params', params)
                const { data } = await apiCall('POST', ENDPOINTS.GET_ADD_EDIT_ADDRESS, params);
                console.log('data: ', data.data);
                if (data.status === 200) {
                    AnimatedAlert.showAlert()
                    setAlertMessage(data.message);
                    navigation.goBack(null)
                    setIsLoading(false)
                } else if (data.status === 201) {
                    // AnimatedAlert.showAlert()
                    // setAlertMessage("Please Enter Valid Credentials");
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
            }
        }
    };

    function getAddressObject(address_components) {
        var ShouldBeComponent = {
            home: ["street_number"],
            pin_code: ["postal_code"],
            street: ["street_address", "route"],
            region: [
                "administrative_area_level_1",
                "administrative_area_level_2",
                "administrative_area_level_3",
                "administrative_area_level_4",
                "administrative_area_level_5"
            ],
            city: [
                "locality",
                "sublocality",
                "sublocality_level_1",
                "sublocality_level_2",
                "sublocality_level_3",
                "sublocality_level_4"
            ],
            country: ["country"]
        };

        var address = {
            home: "",
            pin_code: "",
            street: "",
            region: "",
            city: "",
            country: ""
        };
        address_components.forEach(component => {
            for (var shouldBe in ShouldBeComponent) {
                if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                    address[shouldBe] = component.long_name;
                }
            }
        });
        setAddressAuto(address)
        return address;
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
           {isLoading && 
            <View style={{position:'absolute'}}>
            <Loader state={isLoading} />
            </View>}
            <EditAddressScreen
                goback={goback}
                setAddressData={setAddressData}
                addressData={addressData}
                onAddAddress={onAddAddress}
                getAddressObject={getAddressObject}
                addressAuto={addressAuto}
            />
            <Footer />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={WARNING_COLOR_CODE}
                alertIconVisible={false}
                alertMessageStyle={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR }}
            />
        </View>
    )
};
export default EditAddress;