import React, { Component } from 'react';
import { NavigationActions, withNavigation } from 'react-navigation';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Platform, Share } from 'react-native';
import { Thumbnail } from 'native-base'
import { Avatar } from 'react-native-paper';
import { logoutUser } from '../../Reducers/actions'
import { connect } from 'react-redux';
import FIcon from 'react-native-vector-icons/Feather'
let colors = { PRIMARY: '#22c1c3' }
var OnClickCheck = 0
let SideBarRoutes = [
    {
        icon: "home",
        iconType: "Feather",
        name: "Dashboard",
        RouteName: 'UserListScreen'
    },
    {
        icon: "book",
        iconType: "Feather",
        name: "My Courses",
        RouteName: 'StudentCourses'
    },
    {
        icon: "shopping-cart",
        iconType: "Feather",
        name: "My Orders",
        RouteName: 'StudentOrders'
    },
    {
        icon: "user",
        iconType: "Feather",
        name: "My Profile",
        RouteName: 'StudentProfile'
    }
]
class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            toggle: true,
            ColorArray: [colors.PRIMARY, '#757575', '#757575', '#757575', '#757575', '#757575'],
            BorderColorsArray: [colors.PRIMARY, '#FFF', '#FFF', '#FFF', '#FFF', '#FFF'],
            UserInfo: {}
        }
    }
    NavigateDrawer(route, id) {
        let ColorArray = this.state.ColorArray
        let BorderColorsArray = this.state.BorderColorsArray
        if (OnClickCheck != id) {
            ColorArray[OnClickCheck] = '#757575'
            BorderColorsArray[OnClickCheck] = '#FFF'
            ColorArray[id] = colors.PRIMARY
            BorderColorsArray[id] = colors.PRIMARY
            OnClickCheck = id
        }
        console.log(route, id, ColorArray, BorderColorsArray)
        this.setState({ ColorArray: ColorArray, BorderColorsArray: BorderColorsArray })
        console.log(route, id)
        if (route == "Password") {
            this.props.navigation.navigate('ResetPassword')
        } if (route == 'Share') {
            this.props.navigation.closeDrawer();
            // this.onShare()
        } else {
            this.props.navigation.closeDrawer();
            this.props.navigation.navigate(route)
        }
    }
    FlatListItemSeparator = () => {
        return <View style={styles.line} />
    }
    GoToProfile() {
        // console.log('pro')
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('StudentProfile')
    }
    LogoutUser() {
        this.props.logoutUser({ API: 'logout', props: this.props })
    }
    RenderSideBar() {
        let ColorArray = this.state.ColorArray
        let BorderColorsArray = this.state.BorderColorsArray
        // if (this.props.UserInfo) {
        //     if (this.props.UserInfo.role) {
        //         if (this.props.UserInfo.role.mobileContainers) {
        //             this.props.UserInfo.role.mobileContainers.map((item, i) => {
        //                 if (i > 0) {
        //                     ColorArray[i] = '#757575'
        //                     BorderColorsArray[i] = '#FFF'
        //                 }
        //             })
        //         }
        //     }
        // }
        let sideRoutes = null
        // console.log('ffwf=====>>>', this.props.UserInfo)
        // if (this.props.UserInfo) {
        //     console.log('11')
        //     if (this.props.UserInfo.role) {
        //         console.log('22')
        //         if (this.props.UserInfo.role.mobileContainers) {
        //             console.log('33')
        //             sideRoutes = this.props.UserInfo.role.mobileContainers.map((item, i) => {
        //                 return (<TouchableOpacity key={i} onPress={() => this.NavigateDrawer(item.name, i)} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, borderLeftColor: BorderColorsArray[i], borderLeftWidth: 4 }}>
        //                     <FIcon name={item.icon} size={24} color={ColorArray[i]} />
        //                     <Text style={{ paddingLeft: 20, fontSize: 18, fontWeight: '400', color: ColorArray[i] }}>{item.name}</Text>
        //                 </TouchableOpacity>)
        //             })
        //         }
        //     }
        // }
        if (SideBarRoutes.length > 0) {
            sideRoutes = SideBarRoutes.map((item, i) => {
                return (<TouchableOpacity key={i} onPress={() => this.NavigateDrawer(item.RouteName, i)} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 20}}>
                    <FIcon name={item.icon} size={24} color={'#757575'} />
                    <Text style={{ paddingLeft: 20, fontSize: 18, fontWeight: '400', color: '#757575' }}>{item.name}</Text>
                </TouchableOpacity>)
            })
        }
        return sideRoutes;
    }
    render() {
        let ColorArray = this.state.ColorArray
        let BorderColorsArray = this.state.BorderColorsArray
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => this.GoToProfile()} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                        {/* <Avatar.Image size={80} source={{ uri: this.props.UserInfo.success ? this.props.UserInfo.userPic : null }} /> */}
                        <Avatar.Image size={80} source={require('../../Images/33.png')} />
                        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: '700' }}>Test Student</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400' }}>teststudent@gmail.com</Text>
                    </TouchableOpacity>
                    {this.FlatListItemSeparator()}
                    <View style={{ marginTop: 15, width: 300 }}>
                        {this.RenderSideBar()}
                        <TouchableOpacity onPress={() => this.LogoutUser()} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 24 }}>
                            <FIcon name="log-out" size={24} color='#757575' />
                            <Text style={{ paddingLeft: 20, fontSize: 18, fontWeight: '400', color: '#757575' }}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state, 'state sidebar11')
    return {
        UserInfo: state.authReducer.UserInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (payload) => dispatch(logoutUser(payload)),
    };
};
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SideMenu))
const styles = StyleSheet.create({
    line: {
        height: 0.5,
        width: 300,
        backgroundColor: "#BBB"
    }
});
