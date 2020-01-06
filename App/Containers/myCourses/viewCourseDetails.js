import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, StatusBar, View, ScrollView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Thumbnail, Header, Picker, Left, Body, Right, Button, Title } from 'native-base';
import Orientation from 'react-native-orientation';
var RotateStatus = 0
class ViewCourseDetails extends Component {
    videoPlayer;
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: true,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'contain',
            CourseArray: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
            ScreenHeight: 200

        };
    }
    _orientationDidChange = (orientation) => {
        console.log('orientation==>>', orientation)
        if (orientation === 'LANDSCAPE') {
            this.setState({ ScreenHeight: Dimensions.get('window').height })
            // do something with landscape layout
        } else {
            this.setState({ ScreenHeight: 200 })
            // do something with portrait layout
        }
    }
    componentDidMount() {
        Dimensions.addEventListener('change', () => {
            // this.getOrientation();
        });
        // Orientation.lockToPortrait();
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    getOrientation() {
        // if (RotateStatus == 0) {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ ScreenHeight: 200 })
        }
        else {
            this.setState({ ScreenHeight: Dimensions.get('window').height })
        }
        // } else {
        //     RotateStatus = 0
        // }
    }
    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = data => this.setState({ duration: data.duration, isLoading: false });

    onLoadStart = data => this.setState({ isLoading: true });

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    onError = () => alert('Oh! ', error);

    exitFullScreen = () => {
        alert('Exit full screen');
    };

    enterFullScreen = () => { };
    setVideoHeight() {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ ScreenHeight: 200 })
        }
        else {
            this.setState({ ScreenHeight: Dimensions.get('window').height })
        }
    }
    onFullScreen = () => {
        if (this.state.screenType == 'contain')
            this.setState({ screenType: 'contain' });
        else this.setState({ screenType: 'contain' });
        RotateStatus = 1
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ ScreenHeight: Dimensions.get('window').height })
            Orientation.lockToLandscape()
        }
        else {
            this.setState({ ScreenHeight: 200 })
            Orientation.lockToPortrait()
        }
    };
    renderToolbar = () => (
        <View>
            <Button transparent onPress={() => this.GoBack()} >
                <Icon name='md-arrow-back' size={24} color='#FFF' />
            </Button>
        </View>
    );
    GoBack() {
        this.props.navigation.goBack();
    }
    onSeeking = currentTime => this.setState({ currentTime });
    StartMCQ() {
        this.props.navigation.navigate('StudentMCQTest')
    }
    render() {
        let ScreenHeight = this.state.ScreenHeight
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#22c1c3" barStyle="light-content" />
                <View style={{ width: '100%', height: ScreenHeight, justifyContent: 'center', alignItems: 'center', top: 0 }}>
                    <Video
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        paused={this.state.paused}
                        ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                        resizeMode={this.state.screenType}
                        onFullScreen={this.state.isFullScreen}
                        source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
                        style={styles.mediaPlayer}
                        volume={10}
                    />
                    <MediaControls
                        duration={this.state.duration}
                        isLoading={this.state.isLoading}
                        mainColor="#333"
                        onFullScreen={this.onFullScreen}
                        onPaused={this.onPaused}
                        onReplay={this.onReplay}
                        onSeek={this.onSeek}
                        onSeeking={this.onSeeking}
                        playerState={this.state.playerState}
                        progress={this.state.currentTime}
                        toolbar={this.renderToolbar()}
                    />
                </View>
                <View style={{ margin: 10 }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>This is my Course name for the computer science project.This is my Course name for the computer science project.</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>Courses Videos</Text>
                        <TouchableOpacity onPress={() => this.StartMCQ()} style={{ position: 'absolute', right: 10, padding: 6, backgroundColor: '#22c1c3', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ fontSize: 12, color: '#FFF' }}>Start MCQ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{ backgroundColor: '#F4F4F6' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                >
                    <View style={{ margin: 10 }}>
                        <View>
                            {this.state.CourseArray.map((v, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                                        <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
                                            <Image style={{ width: 60, height: 60, borderRadius: 5 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                                        </View>
                                        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>This is my Course name for the computer science project.</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        // width: Dimensions.get('window').height,
        // height: Dimensions.get('window').width
    },
});
export default ViewCourseDetails;