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
class ViewCourseDetails extends Component {
    state = {
        index: 0,
    };
    GoBack() {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#22c1c3' }}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.GoBack()} >
                            <Ionicons name='md-arrow-back' size={24} color='#FFF' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>Course Detail</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView
                    // contentContainerStyle={{ flex: 1, height: '100%' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                >
                    <View style={{ margin: 10 }}>
                        <View>
                            <Text>About this course</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: ScreenWidth / 2, marginTop: 10, backgroundColor: '#EEE', borderRadius: 5, overflow: 'hidden' }}>
                            <View style={{ marginRight: 5 }}>
                                <Image style={{ width: (ScreenWidth / 2) - 30, height: ScreenWidth / 2 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Text>Course name</Text>
                                <ProgressBar style={{ backgroundColor: '#FFF' }} progress={0.5} color={'blue'} />
                                <Text>Assigned Date: 12-09-2019</Text>
                                <Text>Completion Date: 12-09-2019</Text>
                                <Text>Expiration Date: 12-09-2019</Text>
                                <TouchableOpacity style={{ position: 'absolute', bottom: 5, padding: 10, backgroundColor: '#22c1c3', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Text>Start Course</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
export default withNavigationFocus(ViewCourseDetails);

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
