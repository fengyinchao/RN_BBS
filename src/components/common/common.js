import React,{Component} from 'react';
import {View,Text} from 'react-native';
import style from './style';

class Common extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<View style={style.wrap}>
				<View style={style.head}>
					<View style={style.image}></View>
					<Text style={style.text}>感慨</Text>
				</View>
				<View style={style.content}>
					<Text style={[style.text,{fontSize:14}]}>何去何从呢？</Text>
				</View>
			</View>
		)
	}
}
module.exports= Common;