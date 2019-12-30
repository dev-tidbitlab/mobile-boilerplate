import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
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
      <Container>
        <Header style={{ backgroundColor: '#22c1c3' }}>
          <Left>
            <TouchableOpacity onPress={() => this.OpenDrawer()} style={{ width: 32, height: 32 }}>
            {/* this.props.UserInfo.success ? this.props.UserInfo.userPic : */}
              {/* <Avatar.Image onPress={() => this.OpenDrawer()} size={32} source={{ uri:  null }} /> */}
            </TouchableOpacity>
          </Left>
          <Body>
          </Body>
          <Right>
          </Right>
        </Header>
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
