import {StyleSheet} from 'react-native';

let style=StyleSheet.create({
	wrap:{
		height:180,
		paddingLeft:10,
		paddingRight:10,
		backgroundColor:'white',
		marginBottom:10
	},
	head:{
		height:80,
		flexDirection:'row',
		// backgroundColor:'red',
		// alignItem:'center',
		// justifyContent:'center',
		// paddingTop:0,
		borderBottomWidth:1,
		borderBottomColor:'lightgray'
	},
	content:{
		height:100,
		// backgroundColor:'gold'
	},
	image:{
		width:60,
		height:60,
		borderRadius:30,
		backgroundColor:'lightgreen',
		// alignItem:'center'
		top:12
	},
	text:{
		// marginTop:30,
		marginLeft:30,
		top:27,
		fontSize:16,
		height:80,
		// textAlign:'center'
	}
})

module.exports=style;