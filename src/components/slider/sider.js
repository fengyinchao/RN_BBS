/**
 * Created by zi on 2016/7/25.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import style from './style';
import List from './siderList'

class sider extends Component{
    constructor(props){
        super(props);
        this.state = {colorSet:"blue",bilibili:true};
    }
    _switchTheme(){
        console.log(this.state.colorSet);
        if(this.state.colorSet != "dark"){
            this.setState({colorSet:"dark"});
        }else{
            this.setState({colorSet:"blue"});
        }
    }
    _changeBili(){
        this.setState({bilibili:false});
    }
    _changeBackBili(){
        this.setState({bilibili:true});
    }
    render(){
        return (
            <ScrollView style={style.container} showsVerticalScrollIndicator={true}>
                <View style={this.state.colorSet == "blue"?style.top:{backgroundColor:"#aaaaaa",height:165 }}>
                    <View  style={style.left}>
                        <TouchableWithoutFeedback style={style.faceTouch}>
                            <View style={style.faceBorder}>
                                <Image resizeMode={'cover'} source={require('./img/cat.jpg')} style={{borderRadius:35,width:70,height:70}}/>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <View style={style.user}>
                            <Text style={{color:"#ffffff",fontSize:14}}>BBS</Text>
                            <View style={style.status}>
                               <Text style={{color:"#2196F3",fontSize:12,}}>正式会员</Text>
                            </View>
                            <Text style={{color:"#A6D5FA",fontSize:14}}>白云币 : 420</Text>
                       </View>
                       
                    </View>
                </View>

                 <View style={style.body}>
                    <List navi={this.props.navi}/>
                </View>
            </ScrollView>
        );
    }
}

module.exports = sider;