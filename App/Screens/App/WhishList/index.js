import React from 'react';
import { View } from 'react-native';
import WhishListScreen from './components/WhishList';
import Footer from '../../../components/Footer'
const WhishList = () => {
    return (
        <View style={{ flex: 1 ,backgroundColor:'#fff'}}>
            <WhishListScreen
            />
            <Footer/>
        </View>
    )
};
export default WhishList;