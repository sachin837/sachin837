import React from 'react';
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {APP_THEME, TINT_GRAY} from '../utils/colors';
import {TINT_DARK_GRAY, TINT_LOAD_GRAY, WHITE,PINK_COLOR_CODE} from '../utils/colors';

export default function LoadingComponent() {
  return (
    <TouchableOpacity
      disabled={true}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: TINT_DARK_GRAY,
        opacity: 0.7,
        position: 'absolute',
        zIndex: 3000,
      }}>
      <ActivityIndicator
        size={'large'}
        color={PINK_COLOR_CODE}
        style={{justifyContent: 'center', alignSelf: 'center'}}
      />
    </TouchableOpacity>
  );
}
