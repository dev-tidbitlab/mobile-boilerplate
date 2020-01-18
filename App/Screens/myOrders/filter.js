import React, { Component } from "react";
import {
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    ScrollView,
    StatusBar,
    Dimensions,
    TextInput
} from "react-native";
import { BottomSheet } from 'react-native-btr';
import { Avatar, ProgressBar, Colors } from 'react-native-paper';
import { Container, Card, CardItem, Header, DatePicker, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
const ScreenWidth = Dimensions.get('window').width
import { CheckBox } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
class MyOrderFilters extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            MCQList: [],
            Rating: 0,
            CourseRating: 0,
            ActiveArray: [false, false, false]
        };
    }

    onFilterValueChange() {

    }
    _toggleBottomNavigationView() {
        console.log('22')
        let app = this
        if (app.props.toggleBottomNavigationView(false)) {
            app.props.toggleBottomNavigationView(false)
        }
    }
    ratingCompleted(rating) {
        let app = this
        console.log("Rating is: " + rating)
        // app.setState({ Rating: rating })
    }
    setDate(newDate) {
        // this.setState({ chosenDate: newDate });
    }
    onChangeSort(index) {
        let ActiveArray = this.state.ActiveArray
        for (let i = 0; i < ActiveArray.length; i++) {
            ActiveArray[i] = false
        }
        ActiveArray[index] = true
        console.log(ActiveArray, 'fffff')
        this.setState({ ActiveArray: ActiveArray })
    }
    render() {
        let ActiveArray = this.state.ActiveArray
        return (
            <BottomSheet
                visible={this.props.FilterModal}
                onBackButtonPress={() => this._toggleBottomNavigationView()}
                onBackdropPress={() => this._toggleBottomNavigationView()}
            >
                <View style={styles.bottomNavigationView}>
                    <View
                        style={{
                            width: '100%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#AAA'
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>
                            Filter By
                    </Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ padding: 5 }}>
                            <DatePicker
                                defaultDate={new Date()}
                                locale={"en"}
                                format="DD-MM-YYYY"
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Start Date"
                                textStyle={{ color: "#55A2F3" }}
                                placeHolderTextStyle={{ color: "#55A2F3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />

                        </View>
                        <View style={{ padding: 5 }}>
                            <DatePicker
                                defaultDate={new Date()}
                                locale={"en"}
                                format="DD-MM-YYYY"
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="End Date"
                                textStyle={{ color: "#55A2F3" }}
                                placeHolderTextStyle={{ color: "#55A2F3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#AAA'
                        }}>

                        <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>
                            Sort By
                    </Text>
                    </View>
                    <View style={{ width: '100%', paddingRight: 10, paddingLeft:10 }}>
                        <TouchableOpacity onPress={() => this.onChangeSort(0)} style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Course Price</Text>
                            <Ionicons size={28} name={Platform.OS == 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle'} color={ActiveArray[0] ? '#22c1c3' : '#DDD'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onChangeSort(1)} style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>A-Z</Text>
                            <Ionicons size={28} name={Platform.OS == 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle'} color={ActiveArray[1] ? '#22c1c3' : '#DDD'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onChangeSort(2)} style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Z-A</Text>
                            <Ionicons size={28} name={Platform.OS == 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle'} color={ActiveArray[2] ? '#22c1c3' : '#DDD'} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this._toggleBottomNavigationView()} style={{ height: 50, bottom: 0, left: 0, right: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: '#22c1c3' }}>
                        <Text style={{ color: '#FFF', fontSize: 16 }}>APPLY</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        );
    }
}
export default withNavigationFocus(MyOrderFilters);

const styles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 350,
        // justifyContent: 'center',
        // alignItems: 'center',
    },


});
