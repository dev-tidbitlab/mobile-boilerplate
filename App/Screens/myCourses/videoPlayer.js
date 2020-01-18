import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, StatusBar, View, ScrollView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Thumbnail, Header, Picker, Left, Body, Right, Button, Title } from 'native-base';
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';

var RotateStatus = 0
class VideoPlayer extends Component {
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
            ScreenHeight: 200,
            CurrentVideo: {}
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
        });
        Orientation.addOrientationListener(this._orientationDidChange);
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
    GoBack() {
        this.props.navigation.goBack();
    }
    renderToolbar = () => (
        <View>
            <Button transparent onPress={() => this.GoBack()} >
                <Icon name='md-arrow-back' size={24} color='#FFF' />
            </Button>
        </View>
    );
   
    onSeeking = currentTime => this.setState({ currentTime });
    shouldComponentUpdate(nextState, nextProps) {
        console.log(nextProps.currentVideo, this.props.currentVideo, 'fffwfw')
        if (nextProps.currentVideo != undefined) {
            if (nextProps.currentVideo != this.props.currentVideo) {
                return true
            }
        }
        return false
    }
    render() {
        console.log('StudentCourseDetails==>>', this.props.StudentCourseDetails, this.props.currentVideo)
        let ScreenHeight = this.state.ScreenHeight
        return (
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
                    source={{ uri: this.props.currentVideo }}
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
        );
    }
}

export default withNavigation(VideoPlayer)
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
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
});