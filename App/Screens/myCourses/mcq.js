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
class MCQs extends Component {
    state = {
        ScreenWidth: Dimensions.get('window').width,
        CourseArray: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
    GoBack() {
        this.props.navigation.goBack();
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>MCQ Test</Text>
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
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>MCQ Question will display here</Text>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
export default withNavigationFocus(MCQs);

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
