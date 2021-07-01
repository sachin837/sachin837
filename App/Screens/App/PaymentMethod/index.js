import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
// import KlarnaPaymentView from 'react-native-klarna-inapp-sdk';
// import { NativeModules } from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

//  actionButtons = (paymentMethod) => {
//     return (
//       <View style={styles.buttonsContainer}>
//         <Button
//           onPress={() => {
//             this.refs[paymentMethod].initialize(authToken, 'returnUrl://')

//             //You can skip this line, it's for integration testing purposes by Klarna.
//             if (Platform.OS === 'android') {
//               NativeModules.DebugWebViewModule.enable()
//             }
//           }}
//           title="Init."
//           {...testProps('initButton_' + paymentMethod)}
//           style={styles.button} />
//         <Button
//           onPress={() => {
//             this.refs[paymentMethod].load()
//           }}
//           title="Load"
//           {...testProps('loadButton_' + paymentMethod)}
//           style={styles.button} />
//         <Button
//           onPress={() => {
//             this.refs[paymentMethod].authorize()
//           }}
//           title="Authorize"
//           {...testProps('authorizeButton_' + paymentMethod)}
//           style={styles.button} />
//         <Button
//           onPress={() => {
//             this.refs[paymentMethod].reauthorize()
//           }}
//           title="Reauthorize"
//           {...testProps('reauthorizeButton_' + paymentMethod)}
//           style={styles.button} />
//         <Button
//           onPress={() => {
//             this.refs[paymentMethod].finalize()
//           }}
//           title="Finalize"
//           {...testProps('finalizeButton_' + paymentMethod)}
//           style={styles.button} />
//       </View>
//     )
//   }

//   onEvent = (event, paymentMethod) => {
//     const newState = this.state;
//     newState[paymentMethod] = JSON.stringify(event.nativeEvent);
//     console.log('PaymentMethod',newState)
//     this.setState(newState)
//     window.console.warn(JSON.stringify(event.nativeEvent))
//   }

//   renderSetTokenInput(){
//     if(authToken==''){
//       return(
//           <TextInput
//               style={styles.tokenInput}
//               placeholder="Set token here..."
//               multiline={true}
//               blurOnSubmit={true}
//               {...testProps('setTokenInput')}
//               onChangeText={(text) => {authToken = text;}}
//           />
//       );
//     }
//   }

  render = () => {
    return (
        <View>
            <Text>sacjoinu</Text>
        </View>
    //   <View style={styles.outer}>
    //   <ScrollView vertical style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
    //     <Text style={styles.header}>☆Klarna Payments Test App</Text>
    //     {this.renderSetTokenInput()}
    //     {paymentMethods.map(paymentMethod => {
    //       return (
    //         <View style={styles.container} key={paymentMethod}>
    //           <Text style={styles.title}>{paymentMethod}</Text>
    //           <KlarnaPaymentView
    //             category={paymentMethod}
    //             ref={paymentMethod}
    //             style={styles.paymentView}
    //             onInitialized={(event) => {this.onEvent(event, paymentMethod)}}
    //             onLoaded={(event) => {this.onEvent(event, paymentMethod)}}
    //             onAuthorized={(event) => {this.onEvent(event, paymentMethod)}}
    //             onError={(event) => {this.onEvent(event, paymentMethod)}} />
    //           {this.actionButtons(paymentMethod)}
    //           <Text
    //             style={{ color: 'gray' }}
    //             {...testProps('state_' + paymentMethod)}>
    //             {this.state[paymentMethod]}
    //             </Text>
    //         </View>
    //       )
    //     })}
    //   </ScrollView>
    //   </View>
    );
  }
}

let authToken = ''; // set your token here

const paymentMethods = ['pay_now', 'pay_later', 'pay_over_time', 'pay_in_parts'];

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexGrow: 1
  },
  scrollView: {
    flex: 1,
    flexGrow: 1
    },
  scrollViewContentContainer: {
    justifyContent: 'space-between'
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: "100%"
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  paymentView: {
    width: "100%",
    flexGrow: 1
  },
  title: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10
  },
  tokenInput: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: 'gray',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  button: {
    height: 10
  },
});

export function testProps (id) {
  return Platform.OS === 'android'
    ? { testID: id, accessibilityLabel: id }
    : { testID: id }
}