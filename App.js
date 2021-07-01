import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, Platform, useWindowDimensions, LogBox, Alert, Modal } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator from './App/navigator/AppNavigator';
import { ThemeManager } from './App/utils/themeManager';
import { GREEN, APP_THEME } from './App/utils/colors';
import { CartProvider, UserDataProvider, } from './App/utils/UserContext';
import * as RootNavigation from "./RootNavigation";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import Button from './App/components/Button';
import Language from './App/components/Button';
import stripe from "tipsi-stripe";
LogBox.ignoreAllLogs();
GoogleSignin.configure({
  scopes: ['email'],
  webClientId:
    '698726724893-26f56upiqc6aqm1ickjfhifropcb3l6b.apps.googleusercontent.com',
  offlineAccess: true,
});

stripe.setOptions({
  publishableKey: 'pk_test_51HMoZvAeDgwdcEvqF0vt5zGYKpSXNJISMhOKJLPiZmJYfF4uuTJfT5DRrnNPxaz6nRi9kdTVcadMzlbjMcOkwUzw00oOAj6zyr',
  androidPayMode: 'test', // Android only
});
const App = () => {
  // Settings.initializeSDK();
  // GoogleSignin.configure();
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationData, setNotificationData] = useState('');
  useEffect(() => {
    requestUserPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotificationTitle(remoteMessage.notification.title)
      setNotificationData(remoteMessage.data)
      setModalVisible(!modalVisible)
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      RootNavigation.navigate('OrderDetails', { item: remoteMessage.data })
    });
    return () => {
      unsubscribe
    }
  }, []);

  const OrderDetailsFun = () => {
    setModalVisible(!modalVisible)
    RootNavigation.navigate('OrderDetails', { item: notificationData })
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    } else {

    }
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken: ', fcmToken);
      await AsyncStorage.setItem("fcmToken", fcmToken)
    } else {
      console.log("Failed", "No token received");
    }
  };
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <UserDataProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </UserDataProvider>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.timeModelCon}>
          <View style={styles.timeInnderCon} >
            <View style={styles.timeDataMsgCon}>
              <Text style={styles.timeDataMsgTxt}>{notificationTitle}</Text>
            </View>
            <View style={styles.timeDateBtnCon}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                style={{ width: '40%', height: 35 }}
                buttonText='Cancel' />
              <Button
                onPress={() => OrderDetailsFun()}
                style={{ width: '40%', marginLeft: 10, height: 35 }}
                buttonText='OK' />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  timeModelCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  timeInnderCon: {
    width: '80%',
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 0.5 : 7,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.3 : 1,
    shadowRadius: Platform.OS === 'ios' ? 3 : 10,
    elevation: Platform.OS === 'ios' ? 1 : 25,
  },
  timeDataMsgCon: {
    alignItems: 'center',
    // height: 70,
    justifyContent: 'center',
    padding: 5
  },
  timeDataMsgTxt: {
    fontSize: 18,
    textAlign: 'center'
  },
  timeDateBtnCon: {
    height: 50,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default App;