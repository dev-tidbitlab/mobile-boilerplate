import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, ActivityIndicator, Text, StatusBar, View, ScrollView, Dimensions, PermissionsAndroid, Platform } from 'react-native';
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
import { SnackBar } from 'react-native-btr';

class ViewCourseDetails extends Component {
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
            course_id: '',
            CurrentVideo: {},
            StudentCourseDetails: [],
            isDownloaded: 0,
            CurrentVideoDetail: { videoName: '', description: '', attachedFiles: [] },
            collapsed: true
        };
    }
    getCourseDetailsVideo(course_id) {
        GET('studentdashboard/student/listVideo/' + course_id).then(response => {
            console.log('response==>>', response)
            if (response.success == true) {
                this.setState({ StudentCourseDetails: response.data })
                console.log('---', response.data, response.data[0])
                this.setState({ CurrentVideoDetail: response.data[0] })
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
        console.log('res=====>>>>>, res', config, fs)
        let DownloadDir = fs.dirs.DownloadDir // this is the pictures directory. You can check the available directories in the wiki.
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: DownloadDir + "/lms/" + Math.floor(new Date().getTime() + new Date().getSeconds() / 2), // this is the path where your downloaded file will live in
                description: 'Downloading image.'
            }
        }
        config(options).fetch('GET', file).then((res) => {
            console.log('res=====>>>>>222, res', res)
            app.setState({ isDownloaded: 2 })
            setTimeout(function () {
                app.setState({ isDownloaded: 0 })
            }, 5000);
            // do some magic here
        })
    }
    componentDidMount() {
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
        this.setState({ course_id: course_id })
        console.log('course_id', course_id)
        this.getCourseDetailsVideo(course_id)
    }

    GoBack() {
        this.props.navigation.goBack();
    }
    StartMCQ() {
        this.props.navigation.navigate('StudentMCQTest')
    }
    FilterCourseVideo(Videos) {
        this.setState({ CurrentVideoDetail: Videos })
    }
    render() {
        let CurrentVideoDetail = this.state.CurrentVideoDetail
        console.log('StudentCourseDetails==>>', CurrentVideoDetail, this.state.StudentCourseDetails)
        let VideoList = this.state.StudentCourseDetails
        const { isLoading } = this.state
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#22c1c3" barStyle="light-content" />
                <VideoPlayer currentVideo={VideoList.length > 0 ? VideoList[0].videoUrl : null} currentVideoDetail={CurrentVideoDetail} />
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5 }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>{CurrentVideoDetail ? CurrentVideoDetail.videoName : null}</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 2 }} onPress={() => this.toggleExpanded()}>
                            <MaterialIcons color="#AAA" name={!this.state.collapsed ? "arrow-drop-up" : 'arrow-drop-down'} size={36} />
                        </TouchableOpacity>
                        <Collapsible collapsed={this.state.collapsed} align="center">
                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5, fontWeight: '500' }}>{CurrentVideoDetail ? CurrentVideoDetail.description : null}</Text>
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
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '600' }}>Courses Videos</Text>
                        <TouchableOpacity onPress={() => this.StartMCQ()} style={{ position: 'absolute', right: 10, padding: 6, backgroundColor: '#22c1c3', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
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
                            <ActivityIndicator size="small" color="#22c1c3" />
                        </View> : null}
                        {this.state.StudentCourseDetails.length > 0 ? <View>
                            {this.state.StudentCourseDetails.map((v, i) => {
                                return (
                                    <TouchableOpacity onPress={() => this.FilterCourseVideo(v)} key={i} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 10, flex: 1, backgroundColor: '#FFF' }}>
                                        <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
                                            <Image style={{ width: 60, height: 60, borderRadius: 5 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                                        </View>
                                        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>{v.videoName}</Text>
                                            <Text style={{ fontSize: 12, color: '#AAA', fontWeight: '500', paddingBottom: 5 }}>{v.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : null}
                    </View>
                </ScrollView>
                {this.state.isDownloaded != 0 ? <SnackBar
                    duration={0}
                    actionText={''}
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