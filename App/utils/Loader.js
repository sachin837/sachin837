import React from 'react';
import { View, ActivityIndicator } from 'react-native';
// import LottieView from 'lottie-react-native';
const Loader = (props) => {
  return (
    <View style={{
      backgroundColor: "#000",
      position: "absolute",
      zIndex: 1,
      justifyContent: "center",
      alignSelf: "center",
      width: "100%",
      opacity: 0.8,
      height: "100%"
    }}>
      <ActivityIndicator size="large" color="#ED3AAF" />
      {/* <LottieView
        visible={true}
        style={{
          backgroundColor: "transparent",
          alignSelf: "center",
          width: 150,
        }}
        source={require('../Assets/loader.json')}
        autoPlay loop /> */}
    </View>
  );
}

export default Loader;