import React, { useEffect, useContext, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  ScrollView,
  View,
  useWindowDimensions,
  Platform, StyleSheet,
  TouchableOpacity, StatusBar, Image, Alert
} from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import {navigationRef } from "../../RootNavigation";

import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext, UserDataContext, CartContext } from '../utils/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './myTabBar'

import LoadingComponent from "../components/LoadingComponent";
import CustomDrawerContent from './MyDrawer';
import Text from '../components/_Text'
import { getUserLoginState, userDetails } from "../utils/helperFunctions";

import { APP_THEME, BLACK, GRAY, GREEN, WHITE } from '../utils/colors';
import LoginScreen from '../Screens/Authentication/Login';
import SingUpScreen from '../Screens/Authentication/SingUp';
import VerificationScreen from '../Screens/Authentication/Verification';
import AllMostThereScreen from '../Screens/Authentication/AllMostThere';
import SliderScreen from '../Screens/Authentication/Splash'
import LanguageChangeScreen from '../Screens/Authentication/LanguageChange'

import OrderListScreen from '../Screens/App/OrderList';
import DashBoardScreen from '../Screens/App/DashBoard'
import CategoryScreen from '../Screens/App/Category'
import CategoryListScreen from '../Screens/App/CategoryList'
import WhishListScreen from '../Screens/App/WhishList'
import SearchScreen from '../Screens/App/Search'
import ProductDetailsScreen from '../Screens/App/ProductDetails'
import CartScreen from '../Screens/App/Cart'
import SelelctAddressScreen from '../Screens/App/SelelctAddress'
import SelelctPaymentMethodScreen from '../Screens/App/SelelctPaymentMethod'
import OrderPlacedScreen from '../Screens/App/OrderPlaced'
import OrderDetailsScreen from '../Screens/App/OrderDetails'
import ProfileScreen from '../Screens/App/Profile'
import ProfileDetailsScreen from '../Screens/App/ProfileDetails'
import AddAddressScreen from '../Screens/App/AddAddress'
import EditAddressScreen from '../Screens/App/EditAddress'
import PaymentHistoryScreen from '../Screens/App/PaymentHistory'
import NotificationScreen from '../Screens/App/Notification'
import AddressListScreen from '../Screens/App/AddressList'
import AboutUsScreen from '../Screens/App/AboutUs'
import RateUsScreen from '../Screens/App/RateUs'
import SupportScreen from '../Screens/App/Support'
import DeliveryScreen from '../Screens/App/Delivery'
import EditMobileNoScreen from '../Screens/App/EditMobileNo'
import SeeAllProductScreen from '../Screens/App/SeeAllProduct'
import FilterScreen from '../Screens/App/Filter'
import FilterListScreen from '../Screens/App/FilterList'
import SubCategoryListScreen from '../Screens/App/SubCategoryList'
import PaymentMethodScreen from '../Screens/App/PaymentMethod'
import TermsAndConditonScreen from '../Screens/App/TermsAndConditon'

import Language from '../components/Language'


import { apiCall, setDefaultHeader } from '../utils/httpClient';
import ENDPOINTS from '../utils/apiEndPoints';

import { useFocusEffect } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="DashBoard">
      <Drawer.Screen
        name="DashBoard"
        component={DashBoardScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"OrderList"}
        component={OrderListScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Category"}
        component={CategoryScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"CategoryList"}
        component={CategoryListScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"WhishList"}
        component={WhishListScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Search"}
        component={SearchScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"ProductDetails"}
        component={ProductDetailsScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Cart"}
        component={CartScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"SelelctAddress"}
        component={SelelctAddressScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"SelelctPaymentMethod"}
        component={SelelctPaymentMethodScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"OrderPlaced"}
        component={OrderPlacedScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"OrderDetails"}
        component={OrderDetailsScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={ProfileScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"ProfileDetails"}
        component={ProfileDetailsScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"AddAddress"}
        component={AddAddressScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"EditAddress"}
        component={EditAddressScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"PaymentHistory"}
        component={PaymentHistoryScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Notification"}
        component={NotificationScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"AddressList"}
        component={AddressListScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"AboutUs"}
        component={AboutUsScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"RateUs"}
        component={RateUsScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Support"}
        component={SupportScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Delivery"}
        component={DeliveryScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"EditMobileNo"}
        component={EditMobileNoScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"SeeAllProduct"}
        component={SeeAllProductScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"Filter"}
        component={FilterScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={"FilterList"}
        component={FilterListScreen}
      />
       <Drawer.Screen
        options={{ headerShown: false }}
        name={"SubCategoryList"}
        component={SubCategoryListScreen}
      />
       <Drawer.Screen
        options={{ headerShown: false }}
        name={"PaymentMethod"}
        component={PaymentMethodScreen}
      />
        <Drawer.Screen
        options={{ headerShown: false }}
        name={"TermsAndConditon"}
        component={TermsAndConditonScreen}
      />





    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();
function AuthLoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Login"}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"SingUp"}
        component={SingUpScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Verification"}
        component={VerificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"AllMostThere"}
        component={AllMostThereScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={"AppS"}
        component={AppStack}
      /> */}
    </Stack.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"LanguageChange"}
        component={LanguageChangeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Slider"}
        component={SliderScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Login"}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"SingUp"}
        component={SingUpScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Verification"}
        component={VerificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"AllMostThere"}
        component={AllMostThereScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={"AppS"}
        component={AppStack}
      /> */}
    </Stack.Navigator>
  );
}
const App = createStackNavigator();
function SearchStack() {
  return (
    <App.Navigator screenOptions={{ headerShown: false, }}>
      <App.Screen
        options={{ headerShown: false }}
        name={"Search"}
        component={SearchScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"DashBoard"}
        component={DrawerStack}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderList"}
        component={OrderListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Category"}
        component={CategoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"CategoryList"}
        component={CategoryListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"WhishList"}
        component={WhishListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProductDetails"}
        component={ProductDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Cart"}
        component={CartScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctAddress"}
        component={SelelctAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctPaymentMethod"}
        component={SelelctPaymentMethodScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderPlaced"}
        component={OrderPlacedScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderDetails"}
        component={OrderDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={ProfileScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProfileDetails"}
        component={ProfileDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddAddress"}
        component={AddAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditAddress"}
        component={EditAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"PaymentHistory"}
        component={PaymentHistoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Notification"}
        component={NotificationScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddressList"}
        component={AddressListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AboutUs"}
        component={AboutUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"RateUs"}
        component={RateUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditMobileNo"}
        component={EditMobileNoScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SeeAllProduct"}
        component={SeeAllProductScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Filter"}
        component={FilterScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"FilterList"}
        component={FilterListScreen}
      />
        <App.Screen
        options={{ headerShown: false }}
        name={"SubCategoryList"}
        component={SubCategoryListScreen}
      />

    </App.Navigator>
  );
}

function CartStck() {
  return (
    <App.Navigator screenOptions={{ headerShown: false, }}>
      <App.Screen
        options={{ headerShown: false }}
        name={"Cart"}
        component={CartScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderList"}
        component={OrderListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Category"}
        component={CategoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"CategoryList"}
        component={CategoryListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"WhishList"}
        component={WhishListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Search"}
        component={SearchScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProductDetails"}
        component={ProductDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctAddress"}
        component={SelelctAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctPaymentMethod"}
        component={SelelctPaymentMethodScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderPlaced"}
        component={OrderPlacedScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderDetails"}
        component={OrderDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={ProfileScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProfileDetails"}
        component={ProfileDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddAddress"}
        component={AddAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditAddress"}
        component={EditAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"PaymentHistory"}
        component={PaymentHistoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Notification"}
        component={NotificationScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddressList"}
        component={AddressListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AboutUs"}
        component={AboutUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"RateUs"}
        component={RateUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditMobileNo"}
        component={EditMobileNoScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SeeAllProduct"}
        component={SeeAllProductScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Filter"}
        component={FilterScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"FilterList"}
        component={FilterListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SubCategoryList"}
        component={SubCategoryListScreen}
      />
    </App.Navigator>
  );
}

function OrderStck() {
  return (
    <App.Navigator screenOptions={{ headerShown: false, }}>
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderList"}
        component={OrderListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Category"}
        component={CategoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"CategoryList"}
        component={CategoryListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"WhishList"}
        component={WhishListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Search"}
        component={SearchScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProductDetails"}
        component={ProductDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Cart"}
        component={CartScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctAddress"}
        component={SelelctAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctPaymentMethod"}
        component={SelelctPaymentMethodScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderPlaced"}
        component={OrderPlacedScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderDetails"}
        component={OrderDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={ProfileScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProfileDetails"}
        component={ProfileDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddAddress"}
        component={AddAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditAddress"}
        component={EditAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"PaymentHistory"}
        component={PaymentHistoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Notification"}
        component={NotificationScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddressList"}
        component={AddressListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AboutUs"}
        component={AboutUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"RateUs"}
        component={RateUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditMobileNo"}
        component={EditMobileNoScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SeeAllProduct"}
        component={SeeAllProductScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Filter"}
        component={FilterScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"FilterList"}
        component={FilterListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SubCategoryList"}
        component={SubCategoryListScreen}
      />
    </App.Navigator>
  );
}
function DashbordStck() {
  return (
    <App.Navigator screenOptions={{ headerShown: false, }}>
      <App.Screen
        options={{ headerShown: false }}
        name={"DashBoard"}
        component={DrawerStack}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderList"}
        component={OrderListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Category"}
        component={CategoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"CategoryList"}
        component={CategoryListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"WhishList"}
        component={WhishListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Search"}
        component={SearchScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProductDetails"}
        component={ProductDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Cart"}
        component={CartScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctAddress"}
        component={SelelctAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctPaymentMethod"}
        component={SelelctPaymentMethodScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderPlaced"}
        component={OrderPlacedScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderDetails"}
        component={OrderDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={ProfileScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProfileDetails"}
        component={ProfileDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddAddress"}
        component={AddAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditAddress"}
        component={EditAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"PaymentHistory"}
        component={PaymentHistoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Notification"}
        component={NotificationScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddressList"}
        component={AddressListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AboutUs"}
        component={AboutUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"RateUs"}
        component={RateUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditMobileNo"}
        component={EditMobileNoScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SeeAllProduct"}
        component={SeeAllProductScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Filter"}
        component={FilterScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"FilterList"}
        component={FilterListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SubCategoryList"}
        component={SubCategoryListScreen}
      />

    </App.Navigator>
  );
}
function CategoryStck() {
  return (
    <App.Navigator screenOptions={{ headerShown: false, }}>
      <App.Screen
        options={{ headerShown: false }}
        name={"Category"}
        component={CategoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderList"}
        component={OrderListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"CategoryList"}
        component={CategoryListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"WhishList"}
        component={WhishListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Search"}
        component={SearchScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProductDetails"}
        component={ProductDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Cart"}
        component={CartScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctAddress"}
        component={SelelctAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SelelctPaymentMethod"}
        component={SelelctPaymentMethodScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderPlaced"}
        component={OrderPlacedScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"OrderDetails"}
        component={OrderDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Profile"}
        component={ProfileScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"ProfileDetails"}
        component={ProfileDetailsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddAddress"}
        component={AddAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditAddress"}
        component={EditAddressScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"PaymentHistory"}
        component={PaymentHistoryScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Notification"}
        component={NotificationScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AddressList"}
        component={AddressListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"AboutUs"}
        component={AboutUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"RateUs"}
        component={RateUsScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"EditMobileNo"}
        component={EditMobileNoScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SeeAllProduct"}
        component={SeeAllProductScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"Filter"}
        component={FilterScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"FilterList"}
        component={FilterListScreen}
      />
      <App.Screen
        options={{ headerShown: false }}
        name={"SubCategoryList"}
        component={SubCategoryListScreen}
      />
    </App.Navigator>
  );
}


function TabNavigation() {
  return (
    <Tab.Navigator
      // initialRouteName='DashBoard'
      lazy={true}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={DashbordStck} />
      <Tab.Screen name="Category" component={CategoryStck} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="OrderList" component={OrderStck} />
      <Tab.Screen name="Cart" component={CartStck} />
    </Tab.Navigator>
  )
}

function AuthLoading({ navigation }) {
  const dimensions = useWindowDimensions();
  const [isLoaded, setIsloaded] = React.useState()
  const [sliderShow, setSliderShow] = React.useState()
  const [cartVal, setCartVal] = useContext(CartContext);

  useFocusEffect(
    React.useCallback(() => {
      console.log('sachin', cartVal)
      language()
    }, [])
  );

  const language = async () => {
    const lang = await AsyncStorage.getItem('lang');
    Language.setLanguage(lang);
  }

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    signIn: async (data) => {
      const userToken = data.token
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: "userName", token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('lang');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('cartData');

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
    },

  }), []);
  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      let cartData;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        sliders = await AsyncStorage.getItem('sliderShow');
        cartData = await AsyncStorage.getItem('cartData');
        // await AsyncStorage.setItem('cartData', JSON.stringify(cartVal));
        setCartVal(cartData ? JSON.parse(cartData) : [])
        setSliderShow(sliders)

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);

  }, []);
  if (loginState.isLoading) {
    return (
      <View style={Styles.container}>
        <AnimatedSplash
          translucent={false}
          isLoaded={isLoaded}
          logoImage={require("../Assets/Splash-2.png")}
          backgroundColor={"#fff"}
          logoHeight={dimensions.height}
          logoWidth={dimensions.width}
        >
        </AnimatedSplash>
        <LoadingComponent />
      </View>
    );
  };
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        {loginState.userToken == null ? (
          sliderShow == '01' ?
            <Stack.Screen name="Auth" component={AuthLoginStack} />
            :
            <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={DrawerStack} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
function Route() {
  useEffect(() => {
    // setUserData(registrationData)
    getToken()
  }, [])

  const [userData, setUserData] = useContext(UserDataContext);
  async function getToken() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const deviceToken = await AsyncStorage.getItem("fcmToken")
      if (userToken === null) {
        const params = {
          'device_token': deviceToken
        }
        const { data } = await apiCall('POST', ENDPOINTS.GENERATE_TOKEN, params);
        if (data.status === 200) {
          console.log('generatedata: ', data.token);
          setDefaultHeader('token', data.token)
          // CheckCallStatus()
        } else if (data.status === 201) {
          console.log('data.message: ', data.message);
        } else if (data.status === 401) {
          console.log('data.message: ', data.message);
        }
      } else {
        await setDefaultHeader('token', userToken);
        const { data } = await apiCall('POST', ENDPOINTS.GET_PROFILE);
        if (data.status === 200) {
          setUserData(data.data)
          // CheckCallStatus()
        } else if (data.status === 201) {
          console.log('data.message: ', data.message);
        } else if (data.status === 401) {
          console.log('data.message: ', data.message);
        }
        console.log('AuthToken', userToken)
      }
    } catch (error) {
      // alert(error)
    }
  }


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Route;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  box: {
    width: "100%",
    height: "100%"
  }

})