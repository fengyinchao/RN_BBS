/**
 * Created by zi on 2016/7/23.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ViewPagerAndroid,
    DrawerLayoutAndroid,
    ScrollView,
    RefreshControl,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import style from './style';

import Hot from '../page/hot/hot';
import Sider from '../slider/sider';
import Common from '../common/common';
import Picture from '../page/picture/picture';
import Joke from '../page/joke/joke';
import News from '../page/news/news';
import Weather from '../page/weather/weather';
import Gossip from '../page/gossip/gossip';
import DownManager from '../downManager/downManager';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

class Tab extends Component{
    constructor(props){
        super(props);
        this.state={value:0};
    }
    componentDidMount(){
        this.listener = RCTDeviceEventEmitter.addListener('changeTab',(value)=>{
            this.setState({value});
        });
    }
    componentWillUnmount(){
        //TODO:卸载事件绑定
        this.listener.remove();
    }
    render(){
        return(
            <View style={(()=>{
                    if(this.state.value == this.props.index){
                        return style.selectTabActive;
                    }else{
                        return style.selectTab;
                    }
                })()}
            >
                <Text
                    style={style.selectText}
                    onPress={()=>{
                        RCTDeviceEventEmitter.emit("clickTab",this.props.index);
                    }}
                >{this.props.text}</Text>
            </View>
        );
    }
}

class Selector extends Component{
    render(){
        let arr = ["八卦","美图","笑话","新闻","更多"];
        return(
            <View style={style.selector}>
                {arr.map((name,index)=><Tab text={name} index={index}/>)}
            </View>
        );
    }
}

class ViewPager extends Component{
    componentDidMount(){
        this.listener = RCTDeviceEventEmitter.addListener('clickTab',(value)=>{
            RCTDeviceEventEmitter.emit("changeTab",value);
            this.viewPager.setPage(value);
        });
    }
    render(){
        return(
            <ViewPagerAndroid
                initialPage={0}
                style={{flex:1}}
                ref={viewPager => { this.viewPager = viewPager; }}
                onPageSelected={(event)=>{
                                let page = event.nativeEvent.position;
                                RCTDeviceEventEmitter.emit("changeTab",page);
                            }}>
                <View>
                    <Gossip navigator={this.props.navigator}/>
                </View>
                <View>
                    <Picture navigator={this.props.navigator}/>
                </View>
                <View>
                    <Joke navigator={this.props.navigator}/>
                </View>
                <View>
                    <News navigator={this.props.navigator}/>
                </View>
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                    <View><Text style={{fontSize:30,color:'black'}}>敬请期待!!</Text></View>
                </View>
            </ViewPagerAndroid>
        );
    }
}

//这里实在是迫不得已，在navigationView里面的this指针都会转向Drawer
var __navigator = null;

class main extends Component{
    constructor(props){
        super(props);
        this.state={value:1,drawer:"close",dy:0};
        __navigator = this.props.navigator;
    }
    componentDidMount(){
        this.listener = RCTDeviceEventEmitter.addListener('closeDrawer',()=>{
            this._closeDrawer();
        });
        this.listener2 = RCTDeviceEventEmitter.addListener('scroll',(dy)=>{
            console.log(dy);
            this.setState({offsetY:dy});
        });
    }
    navigationView(){
        return(
            <Sider navi={__navigator}/>
        );
    }
    componentWillUnmount(){
        //TODO:卸载事件绑定
    }
    _goDownload(){
        this.props.navigator.push({
            name:"download",
            component:DownManager
        });
    }
    _openDrawer(){
        this._drawer.openDrawer();
        this.state.drawer = "open";
    }
    _closeDrawer(){
        this._drawer.closeDrawer();
        this.state.drawer = "close";
    }
    render(){
        //TODO:需要改成向上拉就能折叠的抽提效果，但是调用频率实在太低了不能做成连贯的动画
        return(
            <DrawerLayoutAndroid
                ref={(drawer)=>this._drawer = drawer}
                drawerWidth={260}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={(()=>{return this.navigationView})()}
                >
                <View style={{flex:1}}>
                    <View style={style.header}>
                            <View style={style.headerLeft}>
                                <TouchableWithoutFeedback onPress={this._openDrawer.bind(this)}>
                                    <View style={{flexDirection:"row",alignItems:'center'}}>
                                        <Image source={require('./img/ic_navigation_drawer.png')} style={style.icon} resizeMode={"contain"}/>
                                        <View style={{flexDirection:"row",width:200}}>
                                            <Text style={style.username}>首页</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Selector/>
                    </View>
                    <View style={{flex:1,}}>
                        <ViewPager navigator={this.props.navigator}/>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

module.exports = main;