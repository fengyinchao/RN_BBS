import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import HeaderView from '../common/HeaderView';
class Dynamic extends Component{
	render(){
                     let name='我的动态';
		return(
			<View>
                                    <HeaderView
                                    title= {name}
                                    leftIcon={ 'arrow-left'}
                                    // leftIconStyle={styles.leftIconStyle}
                                    leftIconAction={this.back.bind(this)}
                                    rightIcon={['heart','reply','share-alt']}
                                    />
                                    <Text>动态</Text>
                                </View>
		)
	}
          back(){
                    this.props.navigator.pop();
          }
}
export default Dynamic;