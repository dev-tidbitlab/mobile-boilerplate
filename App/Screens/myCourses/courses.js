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
    Dimensions,
    ActivityIndicator,
    TextInput,
    Picker,
} from "react-native";
import { BottomSheet } from 'react-native-btr';
import { Avatar, ProgressBar, Colors } from 'react-native-paper';
import { Container, Card, CardItem, Header, Icon, Form, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const ScreenWidth = Dimensions.get('window').width
import { connect } from 'react-redux';
import { StudentCoursesList } from '../../Reducers/actions'
import moment from 'moment'
class MyCourses extends Component {
    state = {
        ScreenWidth: Dimensions.get('window').width,
        CourseArray: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        selected: "",
        visible: false
    };
    GoBack() {
        this.props.navigation.navigate('UserListScreen');
    }
    ViewCourseDetails(v) {
        this.props.navigation.navigate('ViewCourseDetails',
            { course_id: v.course._id });
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
    DatedFormatting(date) {
        return moment(date).format("DD") + '-' + moment(date).format("MMM") + '-' + moment(date).format("YYYY")
    }
    onValueChange() {

    }
    _toggleBottomNavigationView = () => {
        this.setState({ visible: !this.state.visible });
    }
    DisplayFilter() {
        this.setState({ visible: true });
    }
    onFilterValueChange() {
        this.setState({ visible: false });
    }
    render() {
        console.log('mooo===>>>', moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), moment().format("MMM, ddd do YYYY, h:mm:ss a"), moment().format("MMM"), moment().format("DD"), moment().format("YYYY"))
        let ScreenWidth = this.state.ScreenWidth
        return (
            <Container style={{ backgroundColor: '#F4F4F6' }}>
                <Header style={{ backgroundColor: '#22c1c3' }}>
                    <Left style={{ flex: 0.5 }}>
                        <Button transparent onPress={() => this.GoBack()} >
                            <Ionicons name='md-arrow-back' size={24} color='#FFF' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput placeholder="Search by name"
                            style={{
                                color: '#22c1c3', 
                                placeholderTextColor: "#F00",
                                padding: Platform.OS == "ios" ? 5 : 2,
                                paddingLeft: 10, 
                                paddingRight: 10,
                                underlineColorAndroid: 'transparent',
                                borderRadius: 10, 
                                borderWidth: 1,
                                borderColor: '#EEE', 
                                width: '100%',
                                backgroundColor:'#FFF'
                            }} />
                    </Body>
                    <Right style={{ flex: 0.5 }}>
                        <TouchableOpacity onPress={() => this.DisplayFilter()}>
                            <AntDesign name="filter" style={{ color: "#FFF", fontSize: 25 }} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <StatusBar backgroundColor="#22c1c3" barStyle="light-content" />
                <ScrollView
                    contentContainerStyle={{ backgroundColor: '#F4F4F6' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                >
                    <View style={{ margin: 10 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '600' }}>My Courses</Text>
                        </View>
                        {this.props.loading ? <View style={{ marginTop: 20 }}>
                            <ActivityIndicator size="small" color="#22c1c3" />
                        </View> : null}
                        {this.props.StudentCourseList.length > 0 ? <View>
                            {this.props.StudentCourseList.map((v, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => this.ViewCourseDetails(v)} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                                        <View style={{ marginLeft: 5, marginTop: 5 }}>
                                            <Image style={{ width: 100, height: 100, borderRadius: 5 }} source={{ uri: v.course.courseImage }} />
                                            <TouchableOpacity onPress={() => this.ViewCourseDetails(v)} style={{ marginTop: 15, bottom: 5, padding: 6, backgroundColor: '#22c1c3', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                <Text style={{ fontSize: 12, color: '#FFF' }}>Start Course</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '400' }}>{v.course.courseName}</Text>
                                            <Text style={{ fontSize: 12, color: '#000', paddingBottom: 5 }}>{v.course.description.slice(0, 60)} {v.course.description.length>60?'...':null}</Text>
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5 }}>Assigned Date: {this.DatedFormatting(v.coursePurchasedTimeStamp)}</Text>
                                            {/* <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5 }}>Completion Date: </Text> */}
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5 }}>Expiration Date: {this.DatedFormatting(v.courseExpiryTimeStamp)}</Text>
                                            <ProgressBar style={{ backgroundColor: '#CCC', marginBottom: 5 }} progress={0.5} color={'#0AC4BA'} />
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 10 }}>50% complete</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : null}
                    </View>
                </ScrollView>
                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this._toggleBottomNavigationView}
                    onBackdropPress={this._toggleBottomNavigationView}
                >
                    <View style={styles.bottomNavigationView}>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: '#AAA'
                            }}>

                            <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>
                                Select Course Filter
                            </Text>
                        </View>
                        <View style={{ flex: 1, width: '100%' }}>
                            <TouchableOpacity onPress={() => this.onFilterValueChange()} style={{
                                padding: 15, borderBottomWidth: 1,
                                borderBottomColor: '#EEE'
                            }}>
                                <Text style={{ textAlign: 'center' }}>Not Started</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onFilterValueChange()} style={{
                                padding: 15, borderBottomWidth: 1,
                                borderBottomColor: '#EEE'
                            }}>
                                <Text style={{ textAlign: 'center' }}>In Progress</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onFilterValueChange()} style={{
                                padding: 15
                            }}>
                                <Text style={{ textAlign: 'center' }}>Completed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheet>
            </Container>
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
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(MyCourses));

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
    MainContainer: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#E0F7FA',
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
