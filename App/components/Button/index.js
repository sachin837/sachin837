import React, { Fragment } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import {
    FONT_FAMILY_MEDIUM,
    COMMON_BUTTON_COLOR,
} from '../../utils/constants';
const Button = (props) => {
    const {
        buttonText, style, buttonLabelStyle, onPress, LeftBtnImage, RightBtnImage
    } = props;
    const {
        button, buttonLabel
    } = styles;
    return (
        <Fragment>
            <TouchableOpacity
                onPress={onPress}
                style={[button, style, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                {/* <ImageBackground source={require('../../Assets/Path110.png')} style={{ width: '100%', height: 38, justifyContent: 'center', alignItems: 'center' }} borderRadius={20}> */}
                <Image
                    source={LeftBtnImage}
                />
                <Text style={[buttonLabel, buttonLabelStyle]}>
                    {buttonText}
                </Text>
                <Image
                    source={RightBtnImage}
                />
                {/* </ImageBackground> */}
            </TouchableOpacity>
        </Fragment>
    );
}
Button.Button = {
    buttonText: "Submit",
};
const styles = StyleSheet.create({
    button: {
        height: 40,
        borderRadius: 25,

        // marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: COMMON_BUTTON_COLOR
        // backgroundColor: 'red',
    },
    buttonLabel: {
        color: COMMON_BUTTON_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontSize: 15
    },
})
export default Button;