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
class All extends Component{
	render(){
                     let name='全部版面';
		return(
			<View>
                                    <HeaderView
                                    title= {name}
                                    leftIcon={ 'arrow-left'}
                                    // leftIconStyle={styles.leftIconStyle}
                                    leftIconAction={this.back.bind(this)}
                                    rightIcon={['heart','reply','share-alt']}
                                    />
                                    <Text>全部版面</Text>
                                </View>
		)
	}
         back(){
                    this.props.navigator.pop();
          }
}
export default All;