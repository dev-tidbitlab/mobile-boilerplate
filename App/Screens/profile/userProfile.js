import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions
} from "react-native";
import { withNavigation, withNavigationFocus } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Container, Thumbnail, Header, Picker, Left, Body, Right, Button, Title } from 'native-base';
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker'
import { UploadUserPicAction } from '../../Reducers/actions'
const width = Dimensions.get('window').width

class UserProfile extends Component {
    state = {
        EditProfile: false
    }
    GoBack() {
        this.props.navigation.navigate('UserListScreen');
    }
    LoadImage() {
        return 0;
        // if (!this.state.EditProfile) {
        //     return;
        // }
        // const options = {
        //     noData: true,
        // }
        // ImagePicker.launchImageLibrary(options, response => {
        //     console.log(options, response, 'ffd')
        //     if (response.didCancel == undefined) {
        //         var media = {
        //             uri: response.uri,
        //             type: response.type,
        //             name: response.fileName,
        //         };
        //         var formData1 = new FormData();
        //         formData1.append('file', {
        //             uri: response.uri,
        //             name: response.fileName,
        //             type: response.type
        //         })
        //         this.props.UploadUserPicAction(formData1)
        //         console.log('hh==>>', formData1)
        //     }
        // })
    }

    ToggleEditProfile() {
        console.log('dwdw')
        this.props.navigation.navigate('EditUserProfile', {
            UserInfo: this.props.UserInfo
        });
        // this.setState({ EditProfile: !this.state.EditProfile })
    }
    render() {
        let EditProfile = this.state.EditProfile
        const { email, firstName, lastName, state, city, country, phoneNumber } = this.props.UserInfo
        return (
            <Container>
                <Header style={{ backgroundColor: '#1A5566' }}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.GoBack()} >
                            <Icon name='md-arrow-back' size={24} color='#FFF' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>Profile</Text>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.ToggleEditProfile()} >
                            <FontAwesome name='edit' size={24} color='#FFF' />
                        </Button>
                    </Right>
                </Header>
                <StatusBar backgroundColor="#1A5566" barStyle="light-content" />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                >
                    <View style={styles.container}>
                        <Button style={{ position: 'absolute', left: 20, top: 15 }} transparent onPress={() => this.GoBack()} >
                            <Icon name={Platform.OS == 'android' ? 'md-arrow-back' : 'ios-arrow-back'} size={24} color="#fff" />
                        </Button>
                        <View style={{ marginTop: 50 }}>
                            <TouchableOpacity onPress={() => this.LoadImage()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar.Image style={{backgroundColor:'#EEE'}} size={110} source={{ uri: this.props.UserInfo.success ? (this.props.UserInfo.profileImage ? this.props.UserInfo.profileImage : null) : null }} />
                                {/* <Avatar.Image size={110} source={require('../../Images/33.png')} /> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingLeft: 20, paddingRight: 20, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 30, marginLeft: 20, marginRight: 20 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }} >Name</Text>
                                <Text style={{ fontSize: 16, lineHeight: 16, fontWeight: 'bold', lineHeight: 16, marginTop: 0, }}>{firstName ? firstName + ' ' + lastName : null}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>Email</Text>
                                <Text style={{ fontSize: 16, lineHeight: 16, fontWeight: '500', color: '#000', }}>{email ? email : null}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>Phone Number</Text>
                                <Text style={{ fontSize: 16, lineHeight: 20, color: '#000', fontWeight: '500' }}>{phoneNumber ? phoneNumber : null}</Text>
                            </View>

                            {/* <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>Street Address</Text>
                                <Text style={{ fontSize: 16, lineHeight: 20, color: '#000', fontWeight: '500' }}>407 iscon plaza Opp. start bazaar iscon road scon plaza Opp. start bazaar iscon road</Text>
                            </View> */}

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>City</Text>
                                <Text style={{ fontSize: 16, lineHeight: 20, color: '#000', fontWeight: '500' }}>{city ? city : null}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>State</Text>
                                <Text style={{ fontSize: 16, lineHeight: 20, color: '#000', fontWeight: '500' }}>{state ? state : null}</Text>
                            </View>

                            {/* <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>Pascode</Text>
                                <Text style={{ fontSize: 16, lineHeight: 20, color: '#000', fontWeight: '500' }}>380015</Text>
                            </View> */}

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 10, color: '#888', }}>Country</Text>
                                <Text style={{ fontSize: 16, lineHeight: 20, color: '#000', fontWeight: '500' }}>{country ? country : null}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state, 'state profile==>>')
    return {
        loading: state.authReducer.loading,
        ErrorToaster: state.authReducer.ErrorToaster,
        UserInfo: state.authReducer.UserInfo
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        UploadUserPicAction: (payload) => dispatch(UploadUserPicAction(payload)),
    };
};
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(UserProfile))

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
