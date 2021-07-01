import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LIGHT_GREY_COLOR_CODE, WHITE_COLOR_CODE, WHITE_GREY_COLOR_CODE, PINK_COLOR_CODE } from '../utils/constants';
function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={{
      flexDirection: 'row', backgroundColor: PINK_COLOR_CODE,
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <View key={index} style={{
            flex: 1,
            height: 50,

            height: 60,
          }}>
            <TouchableOpacity

              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {
                label === 'Home' ?
                  isFocused ?
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={require('../Assets/home1.png')} />
                    :
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={require('../Assets/home.png')}
                    />

                  : label === 'Category' ?
                    isFocused ?
                      <Image
                        resizeMode='contain'
                        style={{ height: 26, width: 29 }}
                        source={require('../Assets/list1.png')} />
                      :
                      <Image
                        style={{ height: 26, width: 29, }}
                        resizeMode='contain'
                        source={require('../Assets/list.png')} />

                    : label === 'Search' ?
                      isFocused ?
                        <Image
                          style={{ height: 24, width: 24 }}
                          source={require('../Assets/search1.png')} />
                        :
                        <Image
                          style={{ height: 24, width: 24 }}
                          source={require('../Assets/search.png')} />



                      : label === 'OrderList' ?
                        isFocused ?
                          <Image
                            style={{ height: 26, width: 24, tintColor: '#7a23f8' }}
                            source={require('../Assets/Group_162.png')} />
                          :
                          <Image
                            style={{ height: 26, width: 24 }} tintColor='#fff'
                            source={require('../Assets/Group_162.png')} />


                        : label === 'Cart' ?
                          isFocused ?
                            <Image
                              style={{ height: 27, width: 29 }}
                              source={require('../Assets/cart1.png')} />
                            :
                            <Image
                              style={{ height: 27, width: 29 }}
                              source={require('../Assets/cart.png')} />
                          : null
              }
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
export default MyTabBar;