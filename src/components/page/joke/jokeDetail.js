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
} from 'react-native';
import Const from '../../common/const';

import HeaderView from '../../common/HeaderView';
import {
  joke,
} from '../../../actions/jokeAction';

class jokeDetail extends Component{
  back(){
    this.props.navigator.pop();
  }
  render(){
    let name='笑话详情'
    // alert(JSON.stringify(this.props.rowDate));
    let rowDate=this.props.rowDate;
    return(
      <View>
               <HeaderView
                title= {name}
                leftIcon={ 'angle-left'}
                leftIconStyle={styles.leftIconStyle}
                leftIconAction={this.back.bind(this)}
                titleStyle={styles.titleStyle}
                />
                <View style={styles.container}>
                   <View style={styles.row}>
                      <Text style={styles.title}>{rowDate.title}</Text>
                      <Text style={styles.time}>{rowDate.ct.substring(0,16)}</Text>
                  </View>
                  <Text style={styles.text}>{rowDate.text}</Text>
                </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
container:{
  marginTop:40,
  paddingLeft:30,
  paddingRight:30
},
  title: {
    color: 'black',
    fontSize:18,
  },
  titleStyle:{
    fontSize:20,
    color:'white'
  },
  time: {
   fontSize:16,
   marginLeft:40
  },
  text: {
    marginTop:20,
    fontSize:16,
    overflow:'hidden',
    lineHeight:30,
    textIndent:10
  },
  row:{
    flexDirection:'row',
    borderBottomWidth:2,
    borderBottomColor:'lightgray'
  }

});
export default jokeDetail;