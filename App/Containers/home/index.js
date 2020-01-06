import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  StatusBar
} from "react-native";
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigationFocus } from 'react-navigation'
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';

import UserDashboard from './dashboard/dashboard'
class HomeScreen extends Component {
  GoToUserProfile() {
    this.props.navigation.openDrawer();
    console.log('user')
  }
  OpenDrawer() {
    this.props.navigation.openDrawer();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      console.log(prevProps, this.props, prevProps.isFocused, this.props.isFocused)
    }
  }
  Logout() {
    let app = this
  }
  GoToUserInfo(v) {
    console.log(v, 'v')
    this.props.navigation.navigate('UserInfoScreen')

  }
  render() {
    return (
      <Container style={{ backgroundColor: '#F4F4F6' }}>
        <Header style={{ backgroundColor: '#22c1c3' }}>
          <Left style={{ paddingLeft: 5, flex: 1 }}>
            <TouchableOpacity onPress={() => this.OpenDrawer()} style={{ width: 32, height: 32 }}>
              {/* this.props.UserInfo.success ? this.props.UserInfo.userPic : */}
              {/* <Avatar.Image onPress={() => this.OpenDrawer()} size={32} source={{ uri:  null }} /> */}
              <Avatar.Image onPress={() => this.OpenDrawer()} size={32} source={require('../../Images/33.png')} />
            </TouchableOpacity>
          </Left>
          <Body style={{ flex: 2, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>Dashboard</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <StatusBar backgroundColor="#22c1c3" barStyle="light-content" />
        <UserDashboard props={this} GoToUserInfo={(v) => this.GoToUserInfo(v)}></UserDashboard>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state, 'state sidebar')
  return {
    UserInfo: state.authReducer.UserInfo,
  };
};
export default withNavigationFocus(connect(mapStateToProps)(HomeScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
