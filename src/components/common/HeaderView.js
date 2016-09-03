/**
 * Created by ljunb on 16/5/8.
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Const from './const';

export default class Header extends React.Component {

    render() {

        let NavigationBar = [];

        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={[styles.leftIcon,this.props.leftIconStyle?this.props.leftIconStyle:'']}
                    onPress={this.props.leftIconAction}
                    >
                    <Icon color="white" size={20} name={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <Text key={'title'} style={[styles.title,this.props.titleStyle?this.props.titleStyle:'']}>{this.props.title}</Text>
            )
         }

        // 右边图片按钮
        if (this.props.rightIcon != undefined) {
            let arr=this.props.rightIcon;
            let arr_template=[];
            arr.map((item,index)=>{
                // alert(item)
                    arr_template.push(
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.leftIcon}
                            onPress={this.props.leftIconAction}
                            >
                            <Icon color="white" size={20} name={item}/>
                        </TouchableOpacity>
                    )
            })
            NavigationBar.push(
                <View style={styles.rightIcon}>
                    {arr_template}
                </View>
            )
        }

        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingLeft:20,
        paddingRight:20
    },
    title: {
       fontSize:20,
        color:'white'
    },
    leftIcon:{
        width:40
    },
    rightIcon:{
        flexDirection:'row',
        position:'absolute',
        top:20,
        right:0
    }
})