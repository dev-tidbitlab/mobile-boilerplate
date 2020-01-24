import React, { Component } from 'react';
import {
    TouchableOpacity, Slider, StyleSheet, TouchableNativeFeedback,
    TouchableWithoutFeedback,
    BackHandler,
    Image,
    ActivityIndicator, Text, StatusBar, View, ScrollView, Dimensions, PermissionsAndroid, Platform
} from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StudentCoursesDetails } from '../../Reducers/actions'
import { GET } from '../../service/index'
import RNFetchBlob from 'rn-fetch-blob'
import Collapsible from 'react-native-collapsible';
const { width, height } = Dimensions.get('window');
import SnackBar from '../../Components/snackBar/index'
import Icon from 'react-native-vector-icons/FontAwesome5'; // and this
const AppWidth = width > height ? height : width
const AppHieght = width > height ? width : height
class ViewCourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0.1,
            paused: false,
            overlay: false,
            fullscreen: false,
            Height: width * .6,
            VideoLoading: true,
            isLoading: true,
            CourseArray: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
            course_id: '',
            CurrentVideo: {},
            StudentCourseDetails: [],
            isDownloaded: 0,
            CurrentVideoDetail: { videoName: '', videoUrl: null, description: '', attachedFiles: [] },
            collapsed: true,
            CourseData: {},
            CurrentVideoIndex: 0,
            CurrentHieght: AppWidth * 0.6,
            CurrentWidth: AppWidth,
            isFullScreen: false
        };
        this.ScreenState = 0
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    UpdateLastPlayedVideo(course_id, video_id) {
        console.log(this.state.course_id, video_id)
        GET('coursejourney/student/' + course_id + '/' + video_id).then(response => {
            console.log('coursejourney==>>', response)
        }).catch(function (error) {
        })
    }
    getCourseDetailsVideo(course_id, CourseData) {
        GET('studentdashboard/student/listVideo/' + course_id).then(response => {
            console.log('response==>>', response, CourseData)
            if (response.success == true) {
                if (response.data.length > 0) {
                    this.setState({ StudentCourseDetails: response.data })
                    let data = response.data
                    console.log('1')
                    if (CourseData) {
                        console.log('2')
                        if (CourseData.lastVideoPlayed) {
                            console.log('3')
                            if (data.length > 0) {
                                console.log('4')
                                data.map((v, i) => {
                                    console.log('7==', v._id, CourseData.lastVideoPlayed, v._id == CourseData.lastVideoPlayed)
                                    if (v._id == CourseData.lastVideoPlayed) {
                                        console.log('5')
                                        this.setState({ CurrentVideoDetail: v, CurrentVideoIndex: i })
                                    }
                                })
                            }
                        } else {
                            console.log('6')
                            this.setState({ CurrentVideoDetail: response.data[0], CurrentVideoIndex: 0 })
                            this.UpdateLastPlayedVideo(course_id, response.data[0]._id)
                        }
                    }
                } else {
                    this.setState({ paused: true })
                }
            } else {
            }
            this.setState({ isLoading: false })
        }).catch(function (error) {
            this.setState({ isLoading: false })
        })
    }
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    DownloadResourses(file) {
        let app = this
        const { config, fs } = RNFetchBlob
        app.setState({ isDownloaded: 1 })
        console.log('res=====>>>>>, res', config, fs, file)
        let DownloadDir = fs.dirs.DownloadDir // this is the pictures directory. You can check the available directories in the wiki.
        let fileName = Math.floor(new Date().getTime() + new Date().getSeconds())
        if (file.includes('.pdf') || file.includes('.PDF')) {
            fileName = JSON.stringify(fileName) + '.pdf'
        } else {
            if (file.includes('.png') || file.includes('.PNG')) {
                fileName = JSON.stringify(fileName) + '.png'
            } else {
                if (file.includes('.jpg') || file.includes('.JPG')) {
                    fileName = JSON.stringify(fileName) + '.jpg'
                } else {
                    if (file.includes('.jpeg') || file.includes('.JPEG')) {
                        fileName = JSON.stringify(fileName) + '.jpeg'
                    } else {
                        if (file.includes('.zip') || file.includes('.ZIP')) {
                            fileName = JSON.stringify(fileName) + '.zip'
                        }
                    }
                }
            }
        }
        RNFetchBlob
            .config({
                addAndroidDownloads: {
                    useDownloadManager: true, // <-- this is the only thing required
                    notification: false,
                    path: DownloadDir + "/lms/" + 'lms_' + fileName,
                    description: 'Resourse File',
                    mediaScannable: true,
                    notification: true,
                    title: 'lms_' + fileName
                }
            })
            .fetch('GET', file)
            .then((resp) => {
                resp.path()
                app.setState({ isDownloaded: 2 })
            })
    }
    _orientationDidChange = (orientation) => {
        console.log(orientation, 'orientation')

        if (orientation === 'LANDSCAPE') {
            this.setState({ CurrentHieght: AppWidth, CurrentWidth: AppHieght, isFullScreen: true })
        } else {
            this.setState({ CurrentHieght: AppWidth * 0.6, CurrentWidth: AppWidth, isFullScreen: false })
        }
        this.setState({ overlay: true });
        this.overlayTimer = setTimeout(() => {
            this.ScreenState = 0
            this.setState({ overlay: false })
        }, 3000);
    }
    GetAndSetOrientation() {
        Orientation.getOrientation((err, orientation) => {
            console.log(err, orientation)
            if (orientation === 'PORTRAIT') {
                // this.setState({ CurrentHieght: width, CurrentWidth: height, isFullScreen: true })
            } else {
                this.ScreenState = 1
                // console.log('w - h', width, height)
                Orientation.unlockAllOrientations()
                this.setState({ CurrentHieght: AppWidth, CurrentWidth: AppHieght, isFullScreen: true })
                // this.setState({ CurrentHieght: width * 0.6, CurrentWidth: width, isFullScreen: false })
            }
            this.setState({ overlay: true });
            this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
        })
    }
    handleBackButtonClick() {
        Orientation.unlockAllOrientations()
        console.log(this.props)
        return false;
    }
    componentDidMount() {
        this.GetAndSetOrientation()
        Orientation.addOrientationListener(this._orientationDidChange);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        console.log('ffff===')
        if (Platform.OS == 'android') {
            let saveFile = async () => {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Permission granted");
                    } else {
                        console.log('Permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
            saveFile()
        }
        const { navigation } = this.props;
        const course_id = navigation.getParam('course_id', '');
        const CourseData = navigation.getParam('CourseData', '');
        this.setState({ course_id: course_id, CourseData: CourseData })
        console.log('course_id', course_id)
        this.getCourseDetailsVideo(course_id, CourseData)
    }

    GoBack() {
        Orientation.unlockAllOrientations()
        this.props.navigation.navigate('StudentCourses');
    }
    StartMCQ() {
        this.props.navigation.navigate('StudentMCQTest')
    }
    FilterCourseVideo(Videos, index) {
        clearTimeout(this.overlayTimer);
        this.setState({
            overlay: false,
            CurrentVideoDetail: Videos,
            currentTime: 0,
            duration: 0.1,
            VideoLoading: true,
            CurrentVideoIndex: index
        })
        this.UpdateLastPlayedVideo(this.state.course_id, Videos._id)
    }
    lastTap = null;
    handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            clearTimeout(this.timer);
            doubleTapCallback();
        } else {
            this.lastTap = now;
            this.timer = setTimeout(() => {
                singleTapCallback();
            }, DOUBLE_PRESS_DELAY);
        }
    }

    getTime = t => {
        const digit = n => n < 10 ? `0${n}` : `${n}`;
        const sec = digit(Math.floor(t % 60));
        const min = digit(Math.floor((t / 60) % 60));
        const hr = digit(Math.floor((t / 3600) % 60));
        return hr + ':' + min + ':' + sec; // this will convert sec to timer string
    }

    load = ({ duration }) => {
        console.log('load', duration)
        this.setState({ duration })
    }
    progress = ({ currentTime }) => this.setState({ currentTime }) // here the current time is upated

    backward = () => {
        const { CurrentVideoIndex, StudentCourseDetails } = this.state
        if (CurrentVideoIndex > 0) {
            this.FilterCourseVideo(StudentCourseDetails[CurrentVideoIndex - 1], CurrentVideoIndex - 1)
        } else {
            this.FilterCourseVideo(StudentCourseDetails[StudentCourseDetails.length - 1], StudentCourseDetails.length - 1)
        }
    }
    forward = () => {
        const { CurrentVideoIndex, StudentCourseDetails } = this.state
        if (CurrentVideoIndex < StudentCourseDetails.length - 1) {
            this.FilterCourseVideo(StudentCourseDetails[CurrentVideoIndex + 1], CurrentVideoIndex + 1)
        } else {
            this.FilterCourseVideo(StudentCourseDetails[0], 0)
        }
    }

    onslide = slide => {
        this.video.seek(slide * this.state.duration); // here the upation is maked for video seeking
        clearTimeout(this.overlayTimer);
        this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    }

    youtubeSeekLeft = () => {
        this.setState({ overlay: true });
        this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    }
    youtubeSeekRight = () => {
        const { currentTime } = this.state;
        this.handleDoubleTap(() => { // this fn is used to detect the double tap first callback
            this.video.seek(currentTime + 5);
        }, () => {
            this.setState({ overlay: true });
            this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
        })
    }
    onEndVideo() {
        this.setState({ paused: true, overlay: true })
    }
    FullScreenMethod = () => {
        const { fullscreen } = this.state;
        Orientation.getOrientation((err, orientation) => {
            console.log(err, orientation)
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscape();
                this.setState({ CurrentHieght: AppWidth, CurrentWidth: AppHieght, isFullScreen: true })
            } else {
                Orientation.lockToPortrait();
                // Orientation.unlockAllOrientations()
                this.setState({ CurrentHieght: AppWidth * 0.6, CurrentWidth: AppWidth, isFullScreen: false })
            }
            this.setState({ overlay: true });
            this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
        })
    }

    onLoadStart() {
        console.log('onLoadStart')
    }
    onEnd() {
        this.forward()
        // this.setState({ overlay: true, paused: true });
        console.log('onEnd')
    }
    onReadyForDisplay() {
        this.setState({ VideoLoading: false })
        console.log('onReadyForDisplay')
    }
    onError(error) {
        console.log(error, this.state.currentTime, this.state.duration, 'fnfwfjwefwfnj========')
    }
    render() {
        const { isFullScreen, CurrentWidth, CurrentHieght, currentTime, isLoading, duration, paused, overlay, fullscreen, CurrentVideoIndex, VideoLoading, CurrentVideoDetail } = this.state;
        console.log('CurrentWidth, CurrentHieght', CurrentWidth, CurrentHieght, AppWidth, AppHieght)
        return (
            <View style={{ flex: 1 }}>
                {/* <StatusBar hidden={true} /> */}
                <View style={[fullscreen ? style.fullscreenVideo : style.video, { width: CurrentWidth, height: CurrentHieght, }]}>
                    <Video
                        fullscreen={fullscreen}
                        paused={paused} // this will manage the pause and play
                        ref={ref => this.video = ref}
                        source={{ uri: CurrentVideoDetail.videoUrl }}
                        style={{ ...StyleSheet.absoluteFill }}
                        resizeMode='cover'
                        rate={1}
                        maxBitRate={200000}
                        minLoadRetryCount={3}
                        bufferConfig={{
                            minBufferMs: 5000,
                            maxBufferMs: 10000,
                            bufferForPlaybackMs: 2000,
                            bufferForPlaybackAfterRebufferMs: 5000
                        }}
                        onLoad={this.load}
                        onLoadStart={() => this.onLoadStart()}
                        onEnd={() => this.onEnd()}
                        onProgress={this.progress}
                        onReadyForDisplay={() => this.onReadyForDisplay()}
                        onVideoEnd={this.onEndVideo}
                    // onError={(error) => this.onError(error)}
                    />
                    {VideoLoading ? <View style={{ alignItems: 'center', justifyContent: 'center', width: CurrentWidth, height: CurrentHieght }}>
                        <ActivityIndicator size={64} color="yellow" />
                    </View> : null}
                    <View style={style.overlay}>
                        {overlay ? <View style={{ ...style.overlaySet, backgroundColor: '#0006' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => this.GoBack()} style={{ position: 'absolute', left: 5, top: 5 }}>
                                    <MaterialIcons onPress={() => this.GoBack()} style={{ padding: 10 }} name="arrow-back" size={24} color="#FFF" />
                                </TouchableOpacity>
                                <Icon name='backward' style={style.icon} onPress={() => this.backward()} />
                                <Icon name={paused ? 'play' : 'pause'} style={style.icon} onPress={() => this.setState({ paused: !paused })} />
                                <Icon name='forward' style={style.icon} onPress={() => this.forward()} />
                            </View>
                            <View style={[style.sliderCont, { bottom: isFullScreen ? 30 : 0 }]}>
                                <View style={style.timer}>
                                    <Text style={{ color: 'white' }}>{this.getTime(currentTime)}</Text>
                                    <Text style={{ color: 'white' }}>{this.getTime(duration)}   <Icon onPress={() => this.FullScreenMethod()} name={fullscreen ? 'compress' : 'expand'} style={{ fontSize: 15 }} /></Text>
                                </View>
                                <Slider
                                    maximumTrackTintColor='white'
                                    minimumTrackTintColor='white'
                                    thumbTintColor='white' // now the slider and the time will work
                                    value={currentTime / duration} // slier input is 0 - 1 only so we want to convert sec to 0 - 1
                                    onValueChange={this.onslide}
                                />
                            </View>
                        </View> : <View style={style.overlaySet}>
                                <TouchableWithoutFeedback onPress={() => this.youtubeSeekLeft()}><View style={{ flex: 1 }} /></TouchableWithoutFeedback>
                            </View>}
                    </View>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
                    <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => this.toggleExpanded()}>
                            <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, marginTop: 10, fontWeight: '600' }}>{CurrentVideoDetail ? CurrentVideoDetail.videoName : null}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', right: 2, paddingTop: 5 }} onPress={() => this.toggleExpanded()}>
                            <MaterialIcons color="#AAA" name={!this.state.collapsed ? "arrow-drop-up" : 'arrow-drop-down'} size={36} />
                        </TouchableOpacity>
                        <Collapsible collapsed={this.state.collapsed} align="center">
                            <Text style={{ fontSize: 12, color: '#222', paddingBottom: 5, fontWeight: '500' }}>{CurrentVideoDetail ? CurrentVideoDetail.description : null}</Text>
                            <View>
                                {CurrentVideoDetail.attachedFiles.length > 0 ?
                                    CurrentVideoDetail.attachedFiles.map((val, j) => {
                                        return (
                                            <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => this.DownloadResourses(val)}>
                                                <Text style={{ textDecorationLine: 'underline' }}>Download {j + 1}</Text>
                                            </TouchableOpacity>
                                        )
                                    }) : null}
                            </View>
                        </Collapsible>
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '600' }}>Course Videos</Text>
                        <TouchableOpacity onPress={() => this.StartMCQ()} style={{ position: 'absolute', right: 10, padding: 6, backgroundColor: '#1A5566', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ fontSize: 12, color: '#FFF' }}>Take MCQ Test</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{ backgroundColor: '#F4F4F6' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                >
                    <View style={{ marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 20 }}>
                        {isLoading ? <View style={{ marginTop: 10 }}>
                            <ActivityIndicator size="large" color="yellow" />
                        </View> : null}
                        {this.state.StudentCourseDetails.length > 0 ? <View>
                            {this.state.StudentCourseDetails.map((v, i) => {
                                return (
                                    <TouchableOpacity onPress={() => this.FilterCourseVideo(v, i)} key={i} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 10, flex: 1, backgroundColor: CurrentVideoIndex == i ? '#EEE' : '#FFF' }}>
                                        <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
                                            <Image style={{ width: 60, height: 60, borderRadius: 5 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                                        </View>
                                        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '600' }}>{v.videoName}</Text>
                                            <Text numberOfLines={2} style={{ fontSize: 12, color: '#AAA', fontWeight: '500', paddingBottom: 5 }}>{v.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : null}
                    </View>
                </ScrollView>
                {this.state.isDownloaded != 0 ? <SnackBar
                    style={{ backgroundColor: this.state.isDownloaded == 2 ? 'green' : '#222' }}
                    duration={0}
                    numberOfLines={2}
                    actionText={'OK'}
                    text={this.state.isDownloaded == 1 ? 'Download Started!' : 'Download Completed!'}
                /> : null}
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        StudentCoursesDetails: (payload) => dispatch(StudentCoursesDetails(payload)),
    };
};
export default withNavigation(connect(mapDispatchToProps)(ViewCourseDetails));
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // paddingBottom: 30,
        width: '100%',
        height: '100%'
    },
    overlaySet: {
        flex: 1,
        flexDirection: 'row',

    },
    icon: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25
    },
    sliderCont: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    timer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    video: { backgroundColor: 'black' },
    fullscreenVideo: {
        backgroundColor: 'black',
        ...StyleSheet.absoluteFill,
        elevation: 1
    }
});
