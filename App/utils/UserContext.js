import React, { useState } from 'react';
import constants from './constants';

export const AuthContext = React.createContext();

export const UserContext = React.createContext(getUserDetails());

export async function getUserDetails() {
  return {
    // token: await getLocalData(constants.ACCESS_TOKEN),
    // userId: await getLocalData(constants.USER_ID),
    // userName: await getLocalData(constants.USER_NAME),
  };
}




export const UserDataContext = React.createContext();
export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState()
  return (
    <UserDataContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserDataContext.Provider>
  )
}

export const CartContext = React.createContext();
export const CartProvider = (props) => {
  const [cartVal, setCartVal] = useState([])
  return (
    <CartContext.Provider value={[cartVal, setCartVal]}>
      {props.children}
    </CartContext.Provider>
  )
}
