import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid,
  View,Text
} from 'react-native';
import main from './main/main';
import splash from './splash/splash';

var _navigator = null;

class bbs extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Navigator
                initialRoute={{name:"splash",component:splash}}
                renderScene={
                    (route,navigator) =>{
                        _navigator = navigator;
                        let Component = route.component;
                        console.log(route)
                        return <Component {...route.params} navigator={navigator} />
                    }
                }
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            />
        );
    }
}

BackAndroid.addEventListener("hardwareBackPress",()=>{
    if(_navigator && _navigator.getCurrentRoutes().length > 1){
        _navigator.pop();
        return true;
    }
    return false;
});

export default bbs;