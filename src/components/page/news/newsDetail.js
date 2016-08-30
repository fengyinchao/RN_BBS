import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  InteractionManager,
  RefreshControl,
  Navigator,
  ScrollView
} from 'react-native';
import Const from '../../common/const';

import HeaderView from '../../common/HeaderView';
import {
  news,
} from '../../../actions/newsAction';

class newsDetail extends Component{
  back(){
    this.props.navigator.pop();
  }
  render(){
    let name='新闻详情'
    // alert(JSON.stringify(this.props.rowDate));
    let rowDate=this.props.rowDate;
    return(
      <View>
               <HeaderView
                title= {name}
                leftIcon={ 'arrow-left'}
                leftIconStyle={styles.leftIconStyle}
                leftIconAction={this.back.bind(this)}
                rightIcon={['heart','reply','share-alt']}
                />
                <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.row}>
                                <Text style={styles.title}>{rowDate.title}</Text>
                            </View>
                            <View style={styles.content}>
                                  <Text style={styles.text}>{rowDate.abstract}</Text>
                            </View>
                        </ScrollView>
                </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
container:{
  height:200
},
row:{
    backgroundColor:'#2196F3',
    height:100,
    // flexDirection:'row',
    // alignItems:'center',
    justifyContent:'center',
    paddingLeft:20,
    flexWrap:'wrap'
  },
  title: {
    color: 'white',
    fontSize:22,
  },
  content:{
    marginTop:20,
    paddingLeft:20,
    paddingRight:20,
  },
  text: {
    fontSize:16,
    lineHeight:26,
    color:'black'
  },
  

});
export default newsDetail;