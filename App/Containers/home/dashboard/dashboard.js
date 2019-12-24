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
import { Avatar } from 'react-native-paper';
import { Container, Card, CardItem, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
const ScreenWidth = Dimensions.get('window').width
class Dashboard extends Component {
    state = {
        index: 0,
    };
    GoBack() {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1, height: '100%' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={false}
            >
                <View style={{ margin: 10 }}>
                    <View>
                        <Text>My Courses</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: ScreenWidth / 2 }}>
                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10, marginRight: 5, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Total Courses</Text>
                            <Text>100</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 5, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Completed Courses</Text>
                            <Text>100</Text>
                        </View>
                    </View>
                    <View>
                        <Text>My recently course</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: ScreenWidth / 2, marginTop: 10 }}>
                        <View style={{ flex: 1, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: (ScreenWidth / 2) - 15, height: ScreenWidth / 2 }} source={{ uri: 'https://image.tmdb.org/t/p/w342/zfE0R94v1E8cuKAerbskfD3VfUt.jpg' }} />
                            <Ionicons
                                name={Platform.OS === 'android' ? "md-play-circle" : "ios-play-circle"}
                                color='#FFF'
                                size={42}
                                style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', position: 'absolute' }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Text>Course name</Text>
                            <Text>Completion percentage</Text>
                            <Text>total videos</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
