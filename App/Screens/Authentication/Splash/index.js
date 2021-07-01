import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
import Language from '../../../components/Language'
import {
    COMMON_COLOR_CODE, BLACK_COLOR_CODE,
    FONT_FAMILY_REGULAR,
    WHITE_COLOR_CODE,
    GREY_COLOR_CODE,
    THEME_COLOR_CODE,
    THEME_COLOR_CODE_DARK,
    THEME_COLOR_CODE_LIGHT,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_MEDIUM,
    PINK_COLOR_CODE
} from '../../../utils/constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //[...]
});



export default class App extends React.Component {
    state = {
        slides: [
            {
                key: 1,
                title: Language.firstTitle,
                text: Language.firstDescripation,
                image: require('../../../Assets/116033624_grocery_shopping_concept_foods_with_shopping_bag.png'),
                backgroundColor: '#59b2ab',
            },
            {
                key: 2,
                title: Language.SecondTitle,
                text: Language.secondDescripation,
                image: require('../../../Assets/116033624_grocery_shopping_concept_foods_with_shopping_bag.png'),
                backgroundColor: '#febe29',
            },
            {
                key: 3,
                title: Language.thirdTitle,
                text: Language.thirdDescripation,
                image: require('../../../Assets/116033624_grocery_shopping_concept_foods_with_shopping_bag.png'),
                backgroundColor: '#22bcb5',
            }
        ]
    }
    constructor(props) {
        super(props);
    }


    _renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ height: 170,marginTop:40, paddingLeft: 25, justifyContent: 'center',padding:10 }}>
                    <Text style={{
                        marginTop: 15,
                        marginBottom: 18,
                        color: '#000',
                        fontSize: 18,
                        fontFamily: FONT_FAMILY_SEMIBOLD
                    }}>
                        {item.title}
                    </Text>
                    <Text style={{
                        color: '#000',
                        fontSize: 15,
                        // textAlign: 'center',
                        fontFamily: FONT_FAMILY_MEDIUM,
                        // marginHorizontal:10,
                    }}>
                        {item.text}
                    </Text>
                </View>
                <View style={{ position: 'absolute', bottom: 0, height: windowHeight / 1.6 }}>
                    <ImageBackground source={item.image} resizeMode='center'
                        style={{ width: windowWidth, height: windowHeight / 1.5 }}
                    >
                    </ImageBackground>
                </View>
            </View>
        );
    }
    _renderNextButton = () => {
        return (

            <View style={{ justifyContent: 'center', marginLeft: '40%', marginRight: '40%', alignItems: 'center', height: 40 }}>
                <View style={{ height: 32, borderColor: PINK_COLOR_CODE, borderWidth: 1, width: 95, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} >
                    <Text style={{ color: PINK_COLOR_CODE, fontFamily: FONT_FAMILY_REGULAR, fontSize: 15 }}>Next</Text>
                </View>
            </View>


        );
    };

    navtoLogin = () => {
        this.props.navigation.navigate('Login')
    }

    _renderDoneButton = () => {
        return (
            <View style={{ justifyContent: 'center', marginLeft: '37%', marginRight: '37%', alignItems: 'center', height: 40 }}>
                <TouchableOpacity onPress={() => this.navtoLogin()} style={{ height: 32, borderColor: PINK_COLOR_CODE, borderWidth: 1, width: 95, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} >
                    <Text style={{ color: PINK_COLOR_CODE, fontFamily: FONT_FAMILY_REGULAR, fontSize: 15 }}>Start</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <AppIntroSlider
                data={this.state.slides}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
                renderItem={this._renderItem}
                bottomButton={true}
                dotStyle={{ backgroundColor: '#fff' }}
                activeDotStyle={{ backgroundColor: PINK_COLOR_CODE, width: 20,height:8 }}
            />
        );
    }
}