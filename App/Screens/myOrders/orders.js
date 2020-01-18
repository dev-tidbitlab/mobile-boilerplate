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
    ActivityIndicator
} from "react-native";
import { Avatar, ProgressBar, Colors } from 'react-native-paper';
import { Container, Card, CardItem, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { StudentOrdersList } from '../../Reducers/actions'
import { connect } from 'react-redux';
const ScreenWidth = Dimensions.get('window').width
class MyOrders extends Component {
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
        this.props.StudentOrderList(this.props)
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>My Orders</Text>
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
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '600' }}>My Orders List</Text>
                        </View>
                        {this.props.loading ? <View style={{ marginTop: 20 }}>
                            <ActivityIndicator size="small" color="#22c1c3" />
                        </View> : null}
                        {this.props.StudentOrdersList.length > 0 ? <View>
                            {this.props.StudentOrdersList.map((v, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{ flexDirection: 'row', borderRadius: 5, marginRight: 10, marginLeft: 10, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                                        <View>
                                            <View style={{ width: 50, height: 50, marginLeft: 5, marginTop: 5, backgroundColor: '#0AC4BA', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                                <MaterialIcons name="payment" size={32} color="#FFF" />
                                            </View>
                                            <Text style={{ fontSize: 12, color: '#AAA', paddingTop: 5, paddingLeft: 5, paddingBottom: 5 }}>05-Nov-2020</Text>
                                        </View>
                                        <View style={{ flex: 1, marginRight: 10, marginLeft: 5 }}>
                                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                                <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>This is my Course name</Text>
                                                <View style={{ position: 'absolute', flexDirection: 'row', right: 5, top: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                    <FontAwesome name="rupee" size={16} color="#AAA" />
                                                    <Text style={{ fontSize: 14, color: '#AAA' }}>1,500</Text>
                                                </View>
                                            </View>
                                            <Text style={{ fontSize: 12, color: '#AAA' }}>Transaction No. TRSC4b^4fd</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, color: '#AAA', position: 'absolute', bottom: 5, right: 20 }}>Payment mode: Online</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : null}
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state, 'state StudentOrdersList')
    return {
        loading: state.authReducer.loading,
        StudentOrdersList: state.authReducer.StudentOrdersList
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        StudentOrderList: (payload) => dispatch(StudentOrdersList(payload)),
    };
};
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MyOrders));

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
