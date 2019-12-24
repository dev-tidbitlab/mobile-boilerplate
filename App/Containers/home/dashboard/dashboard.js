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
        ScreenWidth: Dimensions.get('window').width
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
        console.log(Dimensions.get('window').width)
        // ScreenWidth = Dimensions.get('window').width
        this.setState({ ScreenWidth: Dimensions.get('window').width })
    }
    render() {
        let ScreenWidth = this.state.ScreenWidth
        return (
            <ScrollView
                // contentContainerStyle={{ flex: 1, height: '100%' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={false}
            >
                <View style={{ margin: 10 }}>
                    <View style={{ marginLeft: 10, fontSize: 18, color: '#000', fontWeight: '800' }}>
                        <Text>My Courses</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: ScreenWidth / 2 }}>
                        <View style={{ flex: 1, marginLeft: 10, marginTop: 10, marginBottom: 10, marginRight: 10, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text>Total Courses</Text>
                            <Text>100</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: 10, marginRight: 10, marginBottom: 10, marginLeft: 10, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text>Completed Courses</Text>
                            <Text>100</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, fontSize: 18, color: '#000', fontWeight: '800' }}>
                        <Text>My recently course</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, flex: 1 }}>
                        <View style={{ flex: 1, width: (ScreenWidth / 2) - 30, marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, overflow: 'hidden' }}>
                            <Image style={{ width: (ScreenWidth / 2) - 30, height: ScreenWidth / 2 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                            <Ionicons
                                name={Platform.OS === 'android' ? "md-play-circle" : "ios-play-circle"}
                                color='#FFF'
                                size={42}
                                style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', position: 'absolute' }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 16, color: '#000', paddingBottom: 15, paddingTop: 5, fontWeight: '800' }}>This is my Course name for the computer science project.</Text>
                            <ProgressBar style={{ backgroundColor: '#AAA', marginBottom: 10 }} progress={0.5} color={'blue'} />
                            <Text style={{ fontSize: 14, color: '#AAA' }}>total videos</Text>
                        </View>
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
