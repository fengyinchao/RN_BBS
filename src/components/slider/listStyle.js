/**
 * Created by zi on 2016/7/26.
 */
import {StyleSheet,Dimensions} from 'react-native';

module.exports = StyleSheet.create({
    container:{
        backgroundColor:"#fafafa"
    },
    group:{
        // paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:"#d9d9d9",
        paddingBottom:20,
        paddingTop:20

    },
     activeTouch:{
        backgroundColor:"#fafafa"
    },
    cell:{
        flexDirection:"row",
        alignItems:'center',
        height:45,
        paddingLeft:40,
       // backgroundColor:'red'
    },
    icon:{
        width:25,
        height:25,
    },

   
    activeText:{
        marginLeft:30,
        marginTop:2,
        color:"#4197DB"
    },
    actIcon:{
        width:25,
        height:25,
        tintColor:"#4197DB"
    }
});