/**
 * Created by zi on 2016/7/26.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import style from './listStyle';

import DownManager from '../downManager/downManager';
import Icon from 'react-native-vector-icons/FontAwesome';

//之前用的闭包计数器，但是不一定准确，所以放弃使用
var Counter=(function(){
    var count = 0;
    return function(){
        return ++ count;
    }
})();

class icon {
    constructor(){
        this.sources = [
            <Icon color="black" size={20} name={'home'} style={style.icon} />,
            <Icon color="black" size={20} name={'th'} style={style.icon} />,
            <Icon color="black" size={20} name={'comment'} style={style.icon} />,
            <Icon color="black" size={20} name={'envelope'} style={style.icon} />,
            <Icon color="black" size={20} name={'map'} style={style.icon} />,
            <Icon color="black" size={20} name={'user'} style={style.icon} />,
            <Icon color="black" size={20} name={'gear'} style={style.icon} />,
        ];
    }
    getImage(index){
        return this.sources[index];
    }
}

class Cell extends Component{

    constructor(props){
        super(props);
        this.state = {selected:0};
    }
    componentDidMount(){
        this.index = this.props.index;

    }
    _press(){
        RCTDeviceEventEmitter.emit("closeDrawer");
        let _navi = {};
        switch (this.index){
            case 1:_navi = {
                name: 'download',
                component: DownManager
            };break;
            case 7:_navi = {
                name: 'theme',
                component: Common
            };break;
            case 8:_navi = {
                name: 'setting',
                component: Common
            };break;
        }
        this.props.navi.push(_navi);
    }
    render(){
        let active = false;
        //TODO:感觉可能会内存泄漏，但是我不会写静态方法
        let temp = new icon;
        if(this.state.selected === this.index){
            active = true;
        }
        return(
            <TouchableHighlight underlayColor={"#e0e0e0"} style={active?style.activeTouch:''}
            onPress={this._press.bind(this)}>
                <View style={style.cell}>
                    {temp.getImage(this.index)}
                    <Text style={{color:"#343434",marginLeft:30}}>{this.props.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

class list extends Component{
    render(){
        //TODO: 以后这里还是改成用Listview吧，现在只是觉得这几个项目没必要费工夫
        return (
            <View style={style.container}>
                <View style={style.group}>
                    <Cell name={"首页"} index={0}/>
                    <Cell name={"全部版面"} index={1} navi={this.props.navi}/>
                </View>
                <View style={style.group}>
                    <Cell name={"我的动态"} index={2} navi={this.props.navi}/>
                    <Cell name={"我的信件"} index={3} navi={this.props.navi}/>
                    <Cell name={"我的文章"} index={4} navi={this.props.navi}/>
                    <Cell name={"我的好友"} index={5} navi={this.props.navi}/>
                </View>
                <View style={style.group}>
                    <Cell name={"设置"} index={6} navi={this.props.navi}/>
                </View>
            </View>
        );
    }
}

module.exports = list;