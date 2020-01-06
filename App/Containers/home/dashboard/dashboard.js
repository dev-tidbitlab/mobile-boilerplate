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
import Ionicons from "react-native-vector-icons/Ionicons";
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
    }
    getOrientation() {
        this.setState({ ScreenWidth: Dimensions.get('window').width })
    }
    ViewCourseDetails() {
        this.props.navigation.navigate('ViewCourseDetails');
    }
    render() {
        let ScreenWidth = this.state.ScreenWidth
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
                            <Text>100</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#FFF', marginTop: 10, marginRight: 10, marginBottom: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <Text>Certifications</Text>
                            <Text>100</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>My recently course</Text>
                    </View>
                    <View>
                        {this.state.CourseArray.map((v, i) => {
                            return (
                                <TouchableOpacity onPress={() => this.ViewCourseDetails()} key={i} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                                    <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
                                        <Image style={{ width: 100, height: 100, borderRadius: 5 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                                    </View>
                                    <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                        <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>This is my Course name for the computer science project.</Text>
                                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500', paddingBottom: 5 }}>Author name</Text>
                                        <ProgressBar style={{ backgroundColor: '#CCC', marginBottom: 5 }} progress={0.5} color={'#0AC4BA'} />
                                        <Text style={{ fontSize: 12, color: '#AAA' }}>50% complete</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView >
        );
    }
}
export default withNavigationFocus(Dashboard);

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
