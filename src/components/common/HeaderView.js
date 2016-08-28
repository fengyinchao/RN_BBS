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
                    <Icon color="black" size={30} name={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <Text key={'title'} style={[styles.title,this.props.titleStyle?this.props.titleStyle:'']}>{this.props.title}</Text>
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
        // marginTop: 20,
        flexDirection: 'row',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    title: {
        fontSize: 15,
    },
    leftIcon: {
       left: -Const.window.width/2+90,
       width:40,
       height:40
    }
})