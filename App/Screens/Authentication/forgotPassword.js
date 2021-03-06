import React, { Component } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    Image,
    ImageBackground
} from "react-native";
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Card, CardItem, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { Progress } from '../ProgressDialog/index'
import Ionicons from "react-native-vector-icons/Ionicons";
import ErrorToaster from '../../Components/alerts/error'
import { ForgotPasswordAction } from '../../Reducers/actions'
class ForgotPasswordScreen extends Component {
    state = {
        Email: '',
        EmailValidation: false
    }
    GoBackToHome() {
        this.props.navigation.goBack()
    }
    SubmitMethod() {
        const { Email } = this.state
        let EmailValidation = this.state.EmailValidation
        let status = false
        if (!Email) {
            status = true
            EmailValidation = true
        }
        this.setState({ EmailValidation: EmailValidation })
        if (status) {
            return 0;
        }
        this.props.ForgotPasswordAction({ email: Email })
    }
    render() {
        let EmailValidation = this.state.EmailValidation
        return (
            <ScrollView contentContainerStyle={{ flex: 1, height: '100%' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons
                        onPress={() => this.GoBackToHome()}
                        name={Platform.OS === 'android' ? "md-arrow-back" : "ios-arrow-round-back"}
                        color='#1A5566'
                        size={32}
                        style={{ backgroundColor: 'transparent', position: 'absolute', padding: 10, left: 10, top: 10 }}
                    />
                    {/* <Text style={styles.loginText}>Forgot Password</Text> */}
                    <View style={styles.MainView3}>
                        <TextInput
                            error={EmailValidation}
                            style={styles.TextInputAll}
                            onChangeText={(v) => this.setState({ Email: v })}
                            label="Email"
                            value={this.state.Email}
                            theme={{ colors: { background: 'white', placeholder: '#888', text: '#000', primary: '#1A5566', underlineColor: 'transparent' } }}
                        />
                        <View style={styles.LoginBtnView}>
                            <TouchableOpacity onPress={() => this.SubmitMethod()} style={styles.TouchableOpacityBtn}>
                                <Text style={styles.LoginBtn}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Progress DialogLoader={this.props.loading} title={'Please wait...'} />
                    {this.props.ErrorToaster.toast ? <ErrorToaster message={this.props.ErrorToaster.message} /> : null}

                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state, 'state')
    return {
        loading: state.authReducer.loading,
        ErrorToaster: state.authReducer.ErrorToaster,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        ForgotPasswordAction: (payload) => dispatch(ForgotPasswordAction(payload)),
    };
};
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen))

const styles = StyleSheet.create({
    loginText: {
        fontSize: 20, fontWeight: '700', textAlign: 'left', marginLeft: 20,
        color: '#1A5566'
    },
    ScrollView1: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    MainView2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAA',
        height: 233
    },
    MainView3: {
        width: '80%',
        margin: 20
    },
    TextInputAll: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginTop: 15,
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        paddingHorizontal: 0
    },
    LoginBtnView: {
        marginTop: 30
    },
    TouchableOpacityBtn: {

    },
    LoginBtn: {
        fontSize: 16,
        color: '#fff',
        borderRadius: 5,
        backgroundColor: '#1A5566',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    LoginBtnPSWD: {
        fontSize: 16,
        color: '#888',
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        marginTop: 30,
        textDecorationLine: 'underline',
    },

});
