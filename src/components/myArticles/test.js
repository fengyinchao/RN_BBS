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
class Article extends Component{
	render(){
                     let name='我的文章';
		return(
			<View>
                                    <HeaderView
                                    title= {name}
                                    leftIcon={ 'arrow-left'}
                                    // leftIconStyle={styles.leftIconStyle}
                                    leftIconAction={this.back.bind(this)}
                                    rightIcon={['heart','reply','share-alt']}
                                    />
                                    <Text>文章</Text>
                                </View>
		)
	}
          back(){
                    this.props.navigator.pop();
          }
}
export default Article;