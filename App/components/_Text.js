import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LIGHT_GRAY, TEXT_SUBTITLE, TEXT_DESCRIPTION, TEXT_TITLE, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, FONT_FAMILY_MEDIUM } from '../utils/constants';

const _Text = ({
  style: propStyle,
  title,
  description,
  children,
  onLayout,
  onPress,
  numberOfLines,
}) => {
  const { titleStyle, subtitleStyle, descriptionStyle } = styles;
  let defaultStyle = subtitleStyle;
  if (title) defaultStyle = titleStyle;
  else if (description) defaultStyle = descriptionStyle;

  return (
    <Text
      onPress={onPress}
      onLayout={onLayout}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      style={[defaultStyle, propStyle ? propStyle : null]}>
      {children}
    </Text>
  );
};
export default _Text;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.408,
    color: TEXT_TITLE,
    // fontFamily:'Poppins-Regular'
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: 'bold'
  },
  subtitleStyle: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.24,
    color: TEXT_SUBTITLE,
    fontFamily: FONT_FAMILY_MEDIUM
  },
  descriptionStyle: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: -0.078,
    color: TEXT_DESCRIPTION,
    fontFamily: FONT_FAMILY_REGULAR
  },
});
