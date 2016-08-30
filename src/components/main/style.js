/**
 * Created by zi on 2016/7/23.
 */
import {StyleSheet} from 'react-native';
import Const from '../common/const';

module.exports = StyleSheet.create({
    header:{
        backgroundColor:"#2196F3",
        width:Const.window.width,
        height:120,
    },
    headerLeft:{
        height:60,
        // alignItems:'center',
        justifyContent:'center',
    },
    selector:{
        // backgroundColor:"red",
        flexDirection:"row",
        height:60,
        alignItems:'center'
    },
    icon:{
        width:20,
        marginLeft:20,
    },
    username:{
        fontSize:22,
        color:"#ffffff",
        marginLeft:30
    },
    selectTab:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // marginHorizontal:15,
        // paddingBottom:30,
        // backgroundColor:'blue',
        height:60,
    },
    selectTabActive:{
        flex:1,
        borderBottomWidth:4,
        borderBottomColor:"darkblue",
        justifyContent:"center",
        alignItems:"center",
        height:60,
        paddingBottom:-4,
    },
    selectText:{
        textAlign:"center",
        color:"white",
        marginTop:10,
        fontSize:18,
    },
    container:{
        backgroundColor:"#00bfff",
        flex:1,
        position:"relative",
        top:95
    }
});