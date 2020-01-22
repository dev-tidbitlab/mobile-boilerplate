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
        <Header style={{ backgroundColor: '#1A5566' }}>
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
        <StatusBar backgroundColor="#1A5566" barStyle="light-content" />
        <UserDashboard props={this} GoToUserInfo={(v) => this.GoToUserInfo(v)}></UserDashboard>
      </Container>
    );
  }
}

export default withNavigationFocus(HomeScreen)
