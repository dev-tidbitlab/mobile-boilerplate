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
import { Avatar, ProgressBar, Colors } from 'react-native-paper';
import { Container, Card, CardItem, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
const ScreenWidth = Dimensions.get('window').width
class MyCourses extends Component {
    state = {
        ScreenWidth: Dimensions.get('window').width,
        CourseArray: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
    GoBack() {
        this.props.navigation.navigate('UserListScreen');
    }
    ViewCourseDetails() {
        this.props.navigation.navigate('ViewCourseDetails');
    }
    componentDidMount() {
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }
    getOrientation() {
        this.setState({ ScreenWidth: Dimensions.get('window').width })
    }
    render() {
        let ScreenWidth = this.state.ScreenWidth
        return (
            <Container style={{ backgroundColor: '#F4F4F6' }}>
                <Header style={{ backgroundColor: '#22c1c3' }}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.GoBack()} >
                            <Ionicons name='md-arrow-back' size={24} color='#FFF' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>My Courses</Text>
                    </Body>
                    <Right>
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
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>My Courses List</Text>
                        </View>
                        <View>
                            {this.state.CourseArray.map((v, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => this.ViewCourseDetails()} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                                        <View style={{marginLeft: 5, marginTop: 5}}>
                                            <Image style={{ width: 100, height: 100, borderRadius: 5 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                                            <TouchableOpacity style={{ marginTop: 15, bottom: 5, padding: 6, backgroundColor: '#22c1c3', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                <Text style={{fontSize: 12, color: '#FFF'}}>Start Course</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>This is my Course name for the computer science project.</Text>
                                            <Text style={{ fontSize: 12, color: '#000', fontWeight: '500', paddingBottom: 5 }}>Author name</Text>
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5 }}>Assigned Date: 01-Jan-2019</Text>
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5 }}>Completion Date: 20-Oct-2019</Text>
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 5 }}>Expiration Date: 31-Dec-2019</Text>
                                            <ProgressBar style={{ backgroundColor: '#CCC', marginBottom: 5 }} progress={0.5} color={'#0AC4BA'} />
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingBottom: 10 }}>50% complete</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
export default withNavigationFocus(MyCourses);

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
