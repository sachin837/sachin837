import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import AddressListScreen from './components/AddressList'
import { useFocusEffect } from '@react-navigation/native';
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

const AddressList = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [addressData, setAddressData] = useState('');
    const goback = () => {
        navigation.goBack(null)
    }
    const editAddress = (item) => {
        navigation.navigate('EditAddress', { item })
    }
    const AddAddress = (item) => {
        navigation.navigate('AddAddress')
    }


    useFocusEffect(
        React.useCallback(() => {
            getAddressList()
        }, [])
    );


    async function getAddressList() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_LIST_ADDRESS);
            console.log('data:8888 ', data);
            if (data.status === 200) {
                setAddressData(data.data)
                setIsLoading(false)
            } else if (data.status === 201) {
                setAddressData('')
                setIsLoading(false)
            } else if (data.status === 401) {
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            console.log('Error', e)
        }
    }

    const deleteAddress = (item) =>
        Alert.alert(
            "",
            Language.deleteAddress,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteAdd(item) }
            ]
        );

    async function deleteAdd(item) {
        try {
            setIsLoading(true)
            const params = {
                "address_id": item.address_id,
            }
            console.log('params', params)
            const { data } = await apiCall('POST', ENDPOINTS.DELETE_ADDRESS, params);
            console.log('data: ', data.data);
            if (data.status === 200) {
                getAddressList()
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
    };

    return (
        <View style={{ flex: 1,}}>
            {isLoading && 
            <View style={{position:'absolute'}}>
            <Loader state={isLoading} />
            </View>}
            <AddressListScreen
                goback={goback}
                editAddress={editAddress}
                addressData={addressData}
                AddAddress={AddAddress}
                deleteAddress={deleteAddress}
            />
            <Footer />
        </View>
    )
};
export default AddressList;