import React, { Component } from "react";
import {
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    StatusBar,
    Dimensions
} from "react-native";
import { Avatar, ProgressBar } from 'react-native-paper';
import { Container, Card, CardItem, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { StudentCoursesList } from '../../../Reducers/actions'
// var ScreenWidth = Dimensions.get('window').width
class Dashboard extends Component {
    state = {
        ScreenWidth: Dimensions.get('window').width,
        CourseArray: [{}, {}, {}]
    };
    GoBack() {
        this.props.navigation.goBack();
    }
    componentDidMount() {
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
        this.props.StudentCoursesList(this.props)
    }
    getOrientation() {
        this.setState({ ScreenWidth: Dimensions.get('window').width })
    }
    ViewCourseDetails(v) {
        this.props.navigation.navigate('ViewCourseDetails',
            { course_id: v.course._id });
    }
    render() {
        let ScreenWidth = this.state.ScreenWidth
        console.log('fefwfwf', this.props.StudentCourseList)
        return (
            <ScrollView
                contentContainerStyle={{ backgroundColor: '#F4F4F6' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={false}
            >
                <View style={{ margin: 10 }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>My Courses</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: ScreenWidth / 2 }}>
                        <View style={{ flex: 1, backgroundColor: '#FFF', marginLeft: 10, marginTop: 10, marginBottom: 10, marginRight: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <Text>Total Courses</Text>
                            <Text>{this.props.StudentCourseList.length}</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#FFF', marginTop: 10, marginRight: 10, marginBottom: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <Text>Certifications</Text>
                            <Text>100</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>My recently course</Text>
                    </View>
                    {this.props.StudentCourseList.length > 0 ? <View>
                        {this.props.StudentCourseList.map((v, i) => {
                            return (
                                <TouchableOpacity onPress={() => this.ViewCourseDetails(v)} key={i} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                                    <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
                                        <Image style={{ width: 100, height: 100, borderRadius: 5 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                                    </View>
                                    <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                        <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>{v.course.courseName}</Text>
                                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500', paddingBottom: 5 }}>{v.course.description}</Text>
                                        <ProgressBar style={{ backgroundColor: '#CCC', marginBottom: 5 }} progress={0.5} color={'#0AC4BA'} />
                                        <Text style={{ fontSize: 12, color: '#AAA' }}>50% complete</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View> : null}
                </View>
            </ScrollView >
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state, 'state dash', state.authReducer.StudentCourseList)
    return {
        loading: state.authReducer.loading,
        StudentCourseList: state.authReducer.StudentCourseList
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        StudentCoursesList: (payload) => dispatch(StudentCoursesList(payload)),
    };
};
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    BackBottonBG: {
        height: 150,
        backgroundColor: '#ddd',
        // overflow: 'hidden',
    },
    BackBotton: {
        position: 'absolute',
        left: 20, top: 15
    },
    scene: {
        flex: 1,
    },

});
