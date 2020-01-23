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
    FlatList
} from "react-native";
import { Avatar, ProgressBar, Colors } from 'react-native-paper';
import { Container, Card, CardItem, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
const ScreenWidth = Dimensions.get('window').width
import { GET } from '../../service/index'
import { CheckBox } from 'react-native-elements';
import ReviewRatingModalComponent from '../reviewRating/rating'
class MCQs extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            MCQList: [],
            ReviewRatingModal: false
        };
    }

    GoBack() {
        this.props.navigation.goBack();
    }
    FilterMCQs(MCQ){
        let mcqFormatting = [{options:[]}]
        MCQ.forEach((element, i) => {
            console.log(element, i,'hey')
            mcqFormatting[i] = element
            mcqFormatting[i].options = []
            if(element.optiona){
                mcqFormatting[i].options.push(element.optiona) 
            }
            if(element.optionb){
                mcqFormatting[i].options.push(element.optionb) 
            }
            if(element.optionc){
                mcqFormatting[i].options.push(element.optionc) 
            }
            if(element.optiond){
                mcqFormatting[i].options.push(element.optiond) 
            }
            if(element.optione){
                mcqFormatting[i].options.push(element.optione) 
            }
        });
        console.log('mcqFormatting', mcqFormatting)
    }
    componentDidMount() {
        GET('studentdashboard/student/listMcq/5e0eef2c2dcd951abaa2d6ea').then(response => {
            console.log('response==>>', response)
            if (response.success) {
                // this.setState({ MCQList: response.data })
                if(response.data.length>0){
                    this.FilterMCQs(response.data)
                }
            } else {

            }
            this.setState({ loading: false })
        }).catch(function (error) {
            if (error) {
                console.log('error==>>', error)
                this.setState({ loading: false })
            }
        })
    }
    ReviewRatingModalView(){
        this.setState({ReviewRatingModal: true})
    }
    toggleBottomNavigationView(){
        this.setState({ReviewRatingModal: false})
    }
    RenderCheckBox(item) {
        return (
            <CheckBox
                containerStyle={{
                    backgroundColor: '#FFF',
                    borderWidth: 0
                }}
                checkedColor={'#1A5566'}
                title={'options'}
                size={24}
                checked={true}
            />
        )
    }
    RenderMCQ(item) {
        console.log('ite', item)
        return (
            <TouchableOpacity key={item.index} style={{ borderRadius: 5, marginTop: 15, flex: 1, backgroundColor: '#FFF' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 25, height: 25, marginLeft: 5, marginTop: 5, backgroundColor: '#0AC4BA', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFF' }}>1</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: '#000', paddingBottom: 5, paddingTop: 5, fontWeight: '800' }}>{item.item.question}</Text>
                </View>
                <View>

                    {item.item.optiona ? <View>
                        {this.RenderCheckBox(item.item)}
                    </View> : null}
                    {item.item.optionb ? <View>
                        {this.RenderCheckBox(item.item)}
                    </View> : null}
                    {item.item.optionc ? <View>
                        {this.RenderCheckBox(item.item)}
                    </View> : null}
                    {item.item.optiond ? <View>
                        {this.RenderCheckBox(item.item)}
                    </View> : null}
                    {item.item.optione ? <View>
                        {this.RenderCheckBox(item.item)}
                    </View> : null}

                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#F4F4F6' }}>
                <Header style={{ backgroundColor: '#1A5566' }}>
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
                <StatusBar backgroundColor="#1A5566" barStyle="light-content" />
                <ScrollView
                    contentContainerStyle={{ backgroundColor: '#F4F4F6' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                >
                    <View style={{ margin: 10 }}>
                        {this.state.loading ? <View style={{ marginTop: 10 }}>
                            <ActivityIndicator size="small" color="#1A5566" />
                        </View> : null}

                        <View>
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>MCQ Question will display here</Text>
                        </View>
                        <TouchableOpacity style={{marginTop: 30, backgroundColor:'#AAA', padding: 5}} onPress={()=>this.ReviewRatingModalView()}>
                            <Text>Review Rating</Text>
                        </TouchableOpacity>
                        <View>
                            <FlatList
                                data={this.state.MCQList}
                                renderItem={item => this.RenderMCQ(item)}
                                keyExtractor={item => item._id}
                            />
                        </View>

                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, backgroundColor:'#FFF' }}>
                    <View style={{flexDirection:'row', flex: 1, justifyContent:'space-around'}}>
                        <TouchableOpacity>
                            <Ionicons color="#1A5566" name="ios-arrow-dropleft-circle" size={48} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons color="#1A5566" name="ios-arrow-dropright-circle" size={48} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ReviewRatingModalComponent toggleBottomNavigationView={()=>this.toggleBottomNavigationView()}  ReviewRatingModal={this.state.ReviewRatingModal} />
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
