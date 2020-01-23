import React, { Component } from 'react';
import {
    TouchableOpacity, Slider, StyleSheet, TouchableNativeFeedback,
    TouchableWithoutFeedback,
    BackHandler,
    Image,
    ActivityIndicator, Text, StatusBar, View, ScrollView, Dimensions, PermissionsAndroid, Platform
} from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Container, Thumbnail, Header, Picker, Left, Body, Right, Button, Title } from 'native-base';
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StudentCoursesDetails } from '../../Reducers/actions'
import VideoPlayer from './videoPlayer'
import { GET } from '../../service/index'
import RNFetchBlob from 'rn-fetch-blob'
import { Snackbar } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
// import { SnackBar } from 'react-native-btr';
const { width, height } = Dimensions.get('window');
import SnackBar from '../../Components/snackBar/index'
import Icon from 'react-native-vector-icons/FontAwesome5'; // and this
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
        };
    }
    UpdateLastPlayedVideo(course_id, video_id) {
        GET('coursejourney/student/' + course_id + '/' + video_id).then(response => {
            console.log('coursejourney==>>', response)
        }).catch(function (error) {
        })
    }
    getCourseDetailsVideo(course_id, CourseData) {
        GET('studentdashboard/student/listVideo/' + course_id).then(response => {
            console.log('response==>>', response, CourseData)
            if (response.success == true) {
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
            }
            this.setState({ isLoading: false })
        }).catch(function (error) {
            this.setState({ isLoading: false })
        })
    }
    toggleExpanded = () => {
        //Toggling the state of single Collapsible
        this.setState({ collapsed: !this.state.collapsed });
    };
    DownloadResourses(file) {
        let app = this
        const { config, fs } = RNFetchBlob
        app.setState({ isDownloaded: 1 })
        console.log('res=====>>>>>, res', config, fs, file)
        let DownloadDir = fs.dirs.DownloadDir // this is the pictures directory. You can check the available directories in the wiki.
        // let options = {
        //     fileCache: true,
        //     addAndroidDownloads: {
        //         useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        //         notification: false,
        //         path: DownloadDir + "/lms/" + Math.floor(new Date().getTime() + new Date().getSeconds() / 2), // this is the path where your downloaded file will live in
        //         description: 'Downloading image.'
        //     }
        // }
        // config(options).fetch('GET', file).then((res) => {
        //     console.log('res=====>>>>>222, res', res)
        //     app.setState({ isDownloaded: 2 })
        //     setTimeout(function () {
        //         app.setState({ isDownloaded: 0 })
        //     }, 5000);
        //     // do some magic here
        // })
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

        console.log(fileName, '')
        RNFetchBlob
            .config({
                addAndroidDownloads: {
                    useDownloadManager: true, // <-- this is the only thing required
                    // Optional, override notification setting (default to true)
                    notification: false,
                    path: DownloadDir + "/lms/" + Math.floor(new Date().getTime() + new Date().getSeconds() / 2),
                    // Optional, but recommended since android DownloadManager will fail when
                    // the url does not contains a file extension, by default the mime type will be text/plain
                    description: 'Resourse File',
                    mediaScannable: true,
                    notification: true,
                    title: 'lms_' + fileName
                }
            })
            .fetch('GET', file)
            .then((resp) => {
                // the path of downloaded file
                resp.path()
                app.setState({ isDownloaded: 2 })
            })
    }
    componentDidMount() {
        console.log('ffff===')
        if (Platform.OS == 'android') {
            let saveFile = async () => {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Permission granted");
                        // this.DownloadResourses()
                    } else {
                        console.log('Permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
            saveFile()
        } else {
            this.DownloadResourses()
        }
        const { navigation } = this.props;
        const course_id = navigation.getParam('course_id', '');
        const CourseData = navigation.getParam('CourseData', '');
        this.setState({ course_id: course_id, CourseData: CourseData })
        console.log('course_id', course_id)
        this.getCourseDetailsVideo(course_id, CourseData)
    }

    GoBack() {
        console.log('back')
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
    HandleBackButton() {
        console.log('back press==>>')
        Orientation.lockToPortrait();
        return true;
    }
    getTime = t => {
        const digit = n => n < 10 ? `0${n}` : `${n}`;
        // const t = Math.round(time);
        const sec = digit(Math.floor(t % 60));
        const min = digit(Math.floor((t / 60) % 60));
        const hr = digit(Math.floor((t / 3600) % 60));
        return hr + ':' + min + ':' + sec; // this will convert sec to timer string
        // 33 -> 00:00:33
        // this is done here
        // ok now the theme is good to look
    }

    load = ({ duration }) => {
        console.log('load', duration)
        this.setState({ duration })
    }
    // now here the duration is update on load video
    progress = ({ currentTime }) => this.setState({ currentTime }) // here the current time is upated

    backward = () => {
        const { CurrentVideoIndex, StudentCourseDetails } = this.state
        if (CurrentVideoIndex > 0) {
            this.FilterCourseVideo(StudentCourseDetails[CurrentVideoIndex - 1], CurrentVideoIndex - 1)
        } else {
            this.FilterCourseVideo(StudentCourseDetails[StudentCourseDetails.length - 1], StudentCourseDetails.length - 1)
        }
        // this.video.seek(this.state.currentTime - 5);
        // clearTimeout(this.overlayTimer);
        // this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    }
    forward = () => {
        const { CurrentVideoIndex, StudentCourseDetails } = this.state
        if (CurrentVideoIndex < StudentCourseDetails.length - 1) {
            this.FilterCourseVideo(StudentCourseDetails[CurrentVideoIndex + 1], CurrentVideoIndex + 1)
        } else {
            this.FilterCourseVideo(StudentCourseDetails[0], 0)
        }
        // this.video.seek(this.state.currentTime + 5); // here the video is seek to 5 sec forward
        // clearTimeout(this.overlayTimer);
        // this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    }

    onslide = slide => {
        this.video.seek(slide * this.state.duration); // here the upation is maked for video seeking
        clearTimeout(this.overlayTimer);
        this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    }

    youtubeSeekLeft = () => {
        const { currentTime } = this.state;
        console.log('ggggggg======??????')
        // this.handleDoubleTap(() => {
        //     this.video.seek(currentTime - 5);
        // }, () => {
        this.setState({ overlay: true });
        this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
        // })
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
    Fullscreen = () => {
        const { fullscreen } = this.state;
        if (fullscreen) {
            Orientation.lockToPortrait();
            // this.setState({ Height: width * .6 })
        } else {
            Orientation.lockToLandscape();
            // this.setState({ Height: width-20 })
        }
        this.setState({ overlay: true });
        this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
        this.setState({ fullscreen: !fullscreen });
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
    render() {
        const { currentTime, isLoading, duration, paused, overlay, fullscreen, CurrentVideoIndex, VideoLoading, CurrentVideoDetail } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {/* <StatusBar hidden={true} /> */}
                <View style={fullscreen ? style.fullscreenVideo : style.video}>
                    <Video
                        fullscreen={fullscreen}
                        paused={paused} // this will manage the pause and play
                        ref={ref => this.video = ref}
                        source={{ uri: CurrentVideoDetail.videoUrl }}
                        style={{ ...StyleSheet.absoluteFill }}
                        resizeMode='cover'
                        onLoad={this.load}
                        onLoadStart={() => this.onLoadStart()}
                        onEnd={() => this.onEnd()}
                        onProgress={this.progress}
                        onReadyForDisplay={() => this.onReadyForDisplay()}
                        onVideoEnd={this.onEndVideo}
                    />
                    {VideoLoading ? <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: width * 0.6 }}>
                        <ActivityIndicator size={64} color="yellow" />
                    </View> : null}
                    <View style={style.overlay}>
                        {overlay ? <View style={{ ...style.overlaySet, backgroundColor: '#0006' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => this.GoBack()} style={{ position: 'absolute', left: 5, top: 10 }}>
                                    <MaterialIcons onPress={() => this.GoBack()} style={{ padding: 10 }} name="arrow-back" size={32} color="#FFF" />
                                </TouchableOpacity>
                                <Icon name='backward' style={style.icon} onPress={() => this.backward()} />
                                <Icon name={paused ? 'play' : 'pause'} style={style.icon} onPress={() => this.setState({ paused: !paused })} />
                                <Icon name='forward' style={style.icon} onPress={() => this.forward()} />
                            </View>
                            <View style={style.sliderCont}>
                                <View style={style.timer}>
                                    <Text style={{ color: 'white' }}>{this.getTime(currentTime)}</Text>
                                    <Text style={{ color: 'white' }}>{this.getTime(duration)}   <Icon onPress={() => this.Fullscreen()} name={fullscreen ? 'compress' : 'expand'} style={{ fontSize: 15 }} /></Text>
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
        ...StyleSheet.absoluteFillObject
    },
    overlaySet: {
        flex: 1,
        flexDirection: 'row'
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
    video: { width, height: width * .6, backgroundColor: 'black' },
    fullscreenVideo: {
        backgroundColor: 'black',
        ...StyleSheet.absoluteFill,
        elevation: 1
    }
});
