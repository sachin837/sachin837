import React, { useRef,useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions
} from "react-native";
import Video from 'react-native-video';

//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

const App = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();



    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}
                    style={styles.scrollViewStyle}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ])}
                    scrollEventThrottle={1}
                >
                    {images.map((image, imageIndex) => {
                        return (
                            <View
                                style={{ width: windowWidth, height: 250 }}
                                key={imageIndex}
                            >
                                <Video
                                    onEnd={onEnd}
                                    onLoad={onLoad}
                                    onLoadStart={onLoadStart}
                                    onProgress={onProgress}
                                    paused={paused}
                                    ref={videoPlayer}
                                    resizeMode={screenType}
                                    onFullScreen={isFullScreen}
                                    source={{
                                        uri:
                                            'https://www.youtube.com/watch?v=9xwazD5SyVg',
                                    }}
                                    style={styles.mediaPlayer}
                                    volume={10}
                                />
                                <MediaControls
                                    duration={duration}
                                    isLoading={isLoading}
                                    mainColor="#333"
                                    onFullScreen={onFullScreen}
                                    onPaused={onPaused}
                                    onReplay={onReplay}
                                    onSeek={onSeek}
                                    onSeeking={onSeeking}
                                    playerState={playerState}
                                    progress={currentTime}
                                    toolbar={renderToolbar()}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
                {/* <View style={styles.indicatorContainer}>
                    {images.map((image, imageIndex) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1)
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: "clamp"
                        });
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, { width }]}
                            />
                        );
                    })}
                </View> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
      toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
      },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5
    },
    infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default App;