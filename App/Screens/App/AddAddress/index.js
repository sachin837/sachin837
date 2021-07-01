import React, { useState } from 'react';
import { View } from 'react-native';
import AddAddressScreen from './components/AddAddress'
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
const AddAddress = ({ navigation }) => {
    const [addressData, setAddressData] = useState({
        houseNo: '',
        landMark: '',
        city: '',
        postal_code: '',
        address: '',
        latitude: '',
        longitude: '',
    })
    const [alertMessage, setAlertMessage] = useState('');
    const [addressAuto, setAddressAuto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        if (addressAuto?.postal_code ? addressAuto.postal_code == '' : addressData.postal_code == '') {
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
                    "address_id": null,
                    "address_type": 1,
                    "house_no": addressData.houseNo,
                    "address": addressData.address,
                    "landmark": addressData.landMark,
                    "city": addressAuto.city ? addressAuto.city : addressData.city,
                    "pin_code": addressAuto.postal_code ? addressAuto.postal_code : addressData.pin_code,
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
            postal_code: ["postal_code"],
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
            postal_code: "",
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
        console.log("address ", address);
        return address;
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <Loader state={isLoading} />}
            <AddAddressScreen
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
export default AddAddress;