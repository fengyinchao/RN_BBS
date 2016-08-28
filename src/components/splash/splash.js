/**
 * Created by zi on 2016/7/27.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';

import main from '../main/main';

class splash extends Component{
    constructor(props){
        super(props);
        this.state = {splash:true};
    }
    componentDidMount(){
        console.log(this.props)
        setTimeout(()=>{
             console.log('main')
            this.props.navigator.replace({
                name:"main",
                component:main
            });
        },3000);
    }
    render(){
        let {width,height} = Dimensions.get("window");
        return (
            <View style={{flex:1}}>
                <StatusBar hidden={true}/>
                <Image source={require('../../image/splash/income_2.jpg')} style={{width:width,height:height}}/>
            </View>
        );
    }
}

module.exports = splash;