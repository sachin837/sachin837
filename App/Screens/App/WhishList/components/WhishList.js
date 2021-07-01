import React, { useRef, useState } from 'react';
import {
    View, ScrollView,
    Animated, Text,
    useWindowDimensions,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Header from '../../../../components/Header';
import Language from '../../../../components/Language';
import styles from './styles'
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PINK_COLOR_CODE, WHITE_COLOR_CODE } from '../../../../utils/constants';
const WhishList = (props) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const images = new Array(3).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [showIndex, setShowIndex] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState(false);
    const openpicker = () => {
        setSelectedLanguage(true)
    }
    return (
        <View style={styles.container}>
             <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#fad7ef', '#f1d5f4']}
                    style={{
                        flexDirection: "row", height: 200, margin: 8
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 10
                    }}>
                        <Text style={{ color: '#ee47b3', fontFamily: FONT_FAMILY_SEMIBOLD }}>{Language.Wishlist}</Text>
                    </View>
                </LinearGradient>
                <View style={{ position: 'absolute', height: '100%', marginTop: 40, paddingBottom: 40 }}>
                    <FlatList
                        data={[
                            {
                                id: 1,
                                'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGCJCKjbF1p5PMln0KV_k7Muw1pmbmisvfK7dk4QLAgsn8LPFKobGKvnF1TkhNTqCy99E&usqp=CAU',
                                'name': 'Oreo'

                            },
                            {
                                id: 2,
                                'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxce8h9uRTq7lJ6BkXSkxDpD-hDVN-GFqCSg&usqp=CAU',
                                'name': 'Lipton  Green Tea'

                            },
                            {
                                id: 3,
                                'img': 'https://www.factoryrates.in/wp-content/uploads/2020/11/Mother-Dairy-Salted-Butter-100-SDL149671087-1-ca542.jpg',
                                'name': 'Mother Dary Butter'

                            },
                            {
                                id: 4,
                                'img': 'data:image/jpeg;base64,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',
                                'name': 'Fresh Lady Finger'

                            },
                            {
                                id: 5,
                                'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGCJCKjbF1p5PMln0KV_k7Muw1pmbmisvfK7dk4QLAgsn8LPFKobGKvnF1TkhNTqCy99E&usqp=CAU',
                                'name': 'Oreo'

                            },
                            {
                                id: 6,
                                'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxce8h9uRTq7lJ6BkXSkxDpD-hDVN-GFqCSg&usqp=CAU',
                                'name': 'Lipton  Green Tea'

                            },
                            {
                                id: 7,
                                'img': 'https://www.factoryrates.in/wp-content/uploads/2020/11/Mother-Dairy-Salted-Butter-100-SDL149671087-1-ca542.jpg',
                                'name': 'Mother Dary Butter'

                            },
                            {
                                id: 8,
                                'img': 'data:image/jpeg;base64,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',
                                'name': 'Fresh Lady Finger'

                            },
                            {
                                id: 9,
                                'img': 'https://www.factoryrates.in/wp-content/uploads/2020/11/Mother-Dairy-Salted-Butter-100-SDL149671087-1-ca542.jpg',
                                'name': 'Mother Dary Butter'

                            },
                            {
                                id: 10,
                                'img': 'data:image/jpeg;base64,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',
                                'name': 'Fresh Lady Finger'

                            },

                        ]}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    width: '46%',
                                    height: 260,
                                    borderRadius: 5,
                                    backgroundColor: '#fff',
                                    borderColor: '#a9a9a9',
                                    elevation: 5,
                                    borderRadius: 8,
                                    shadowColor: 'rgba(0,0,0, .2)',
                                    shadowOffset: { height: 0, width: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 7,
                                    // marginRight: 5

                                }} key={index}>
                                    <View>
                                        <View style={{
                                            height: 130,
                                            width: 135,
                                            backgroundColor: '#fff',
                                            borderColor: '#a9a9a9',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 7,
                                            },
                                            shadowOpacity: 1,
                                            shadowRadius: 10,
                                            marginTop: 5,
                                            borderRadius: 5,
                                            elevation: 14,
                                            // shadowOpacity: 1,
                                            // shadowRadius: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <ImageBackground
                                                style={{ width: 120, height: 120 }} resizeMode='center'
                                                source={{ uri: item.img }}
                                            >
                                                <TouchableOpacity style={{ padding: 5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                    <Image source={require('../../../../Assets/bookmark11.png')} />
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </View>
                                        <View style={{ paddingTop: 5 }}>
                                            <Text>
                                                {item.name}
                                            </Text>
                                            <TouchableOpacity onPress={() => openpicker()} style={{
                                                height: 20,
                                                backgroundColor: '#ebebeb',
                                                alignItems: 'center', marginRight: 10,
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                paddingRight: 5,
                                                paddingLeft: 5,
                                                borderRadius: 3,
                                                marginTop: 5
                                            }}>
                                                <Text style={{ fontSize: 12 }}>5 g</Text>
                                                <Image source={require('../../../../Assets/Polygon_6.png')} />
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 2 }}>
                                                <Text style={{ fontSize: 12, }}>{'\u20AC'} 20</Text>
                                                <Text style={{ fontSize: 12, paddingLeft: 5, color: '#a9a9a9', textDecorationLine: "line-through", }}> {'\u20AC'} 25</Text>
                                            </View>
                                            <TouchableOpacity style={{
                                                borderWidth: 1.5,
                                                height: 30,
                                                borderColor: PINK_COLOR_CODE,
                                                marginTop: 6,
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 15, fontFamily: FONT_FAMILY_REGULAR, color: PINK_COLOR_CODE }}>{Language.Buy}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
};
export default WhishList;