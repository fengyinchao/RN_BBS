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
        justifyContent:"space-between",
        // paddingTop:6,
        // paddingBottom:6
    },
    headerLeft:{
        flexDirection:"row",
        // backgroundColor:"red",
        height:60,
        alignItems:'center'
        // paddingTop:11
    },
    selector:{
        // backgroundColor:"red",
        flexDirection:"row",
        height:60,
        alignItems:'center'
    },
    icon:{
        width:20,
        left:20,
    },
    username:{
        fontSize:22,
        color:"#ffffff",
        left:20
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