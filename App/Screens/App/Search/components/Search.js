import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language'
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const Search = (props) => {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    return (
        <View style={styles.container}>
            <Header />
            <View style={[styles.topContainer, props.isLoading ? null : { elevation: Platform.OS === 'ios' ? 1 : 2, }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View>
                        {props.recommendedProduct ?
                            <View style={styles.linnerCon}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                    colors={['#fad7ef', '#d8c6ed']}
                                    style={{
                                        flexDirection: "row", height: 200, borderRadius: 5
                                    }}>
                                    <View style={{}}>
                                        <View style={styles.RecommandationCo}>
                                            <Text style={[styles.recTxt, { paddingLeft: 10, paddingTop: 5 }]}>{Language.Recommandation}</Text>
                                        </View>
                                        <View style={styles.recommFlatCon}>
                                            {props.recommendedProduct ?
                                                <FlatList
                                                    data={props.recommendedProduct}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    horizontal
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <TouchableOpacity onPress={() => props.onProductDetails(item)} activeOpacity={0.5} style={styles.flatCon} key={index}>
                                                                <View style={styles.flatInnerCo}>
                                                                    <ImageBackground
                                                                        style={{ width: 120, height: 120 }} resizeMode='center' borderRadius={8}
                                                                        source={{ uri: item.product_image_url + item.product_image_list[0].image }}
                                                                    >
                                                                        {/* <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                                        <Image source={require('../../../../Assets/bookmark11.png')} />
                                                                    </TouchableOpacity> */}
                                                                    </ImageBackground>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    }}
                                                />
                                                :
                                                null}
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                            :
                            <View style={{ height: windowHeight - 150, width: windowWidth, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={[styles.emptyContainer]}>
                                    <View>
                                        <Image source={require('../../../../Assets/coming-soon.png')} style={{ width: 100, height: 100 }} />
                                    </View>
                                    {/* <View>
                                        <Text style={[styles.emptyTXT, { textAlign: 'center' }]}>{Language.recommendedMsg}</Text>
                                    </View> */}
                                    <TouchableOpacity onPress={() => props.getNotification()} style={{justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: PINK_COLOR_CODE, height: 55, borderRadius: 50, marginTop: 30, paddingLeft:15,paddingRight:15}}>
                                        <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE, fontSize: 12 }}>{Language.getNotified}</Text>
                                        <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE, fontSize: 13 }}>{Language.eranMoney}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {!props.recommendedProduct ?
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.PreviouslyCon}>{Language.PreviouslySearched}</Text>
                                <FlatList
                                    data={props.recommendedProduct}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => props.onProductDetails(item)} key={index} style={[styles.PreviouslyFlat, { borderTopWidth: index == 0 ? 0 : 0.5, }]}>
                                                <Image source={require('../../../../Assets/arrow_repeat.png')} />
                                                <Text style={styles.previTxt}>{item.product_name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />

                            </View>
                            :
                            null}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};
export default Search;