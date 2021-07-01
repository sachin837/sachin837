import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    Image,
    FlatList,
    TouchableOpacity, Modal, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Language from '../../../../components/Language';
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const RateUs = (props) => {
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(2);

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity activeOpacity={1}

                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={
                                    item <= defaultRating
                                        ? require('../../../../Assets/star-fillper.png')
                                        : require('../../../../Assets/star-fillbro.png')
                                }
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 8 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fad7ef', '#f1d5f4']}
                        style={{
                            flexDirection: "row", height: 50
                        }}>
                             <View style={styles.headerCon}>
                            <TouchableOpacity onPress={() => props.goback()} style={{ paddingLeft: 5 }}>
                                {/* <Image style={{ height: 20, width: 20 }} resizeMode='contain' source={require('../../../../Assets/arrow_left.png')} /> */}
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.hearderTxt}>{Language.RateUs}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.topContainer}>
                        <ScrollView>
                            <View style={{ padding: 8 }}>
                                <Text style={styles.aboutAppTxt}>
                                  {Language.rateUsTopTxt}
                               </Text>
                            </View>
                            <View style={styles.rateHeading}>
                                <Text style={styles.reteHeadTxt}>{Language.RateUs}</Text>
                            </View>
                            <CustomRatingBar />
                            <View style={{ paddingLeft: 10, marginTop: 15 }}>
                                <Text style={styles.aboutAppTxt}>{Language.rateValueTime}</Text>
                            </View>
                            <View style={styles.inputCOn}>
                                <View style={styles.Suggest}>
                                    <TextInput placeholder={Language.writeFeedback}
                                        placeholderTextColor='#a9a9a9'
                                        style={styles.inputSty}
                                        value={props.rateTxt}
                                        onChangeText={(val) => props.setRateTxt(val)}
                                    />
                                </View>
                            </View>
                            <View style={styles.btnCon}>
                                <Button
                                    onPress={() => props.RateUsFun(defaultRating)}
                                    style={{ width: '100%' }}
                                    buttonText={Language.SendFeedback} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    )
};
export default RateUs;