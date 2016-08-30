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
  ScrollView,
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
                leftIcon={ 'arrow-left'}
                leftIconStyle={styles.leftIconStyle}
                leftIconAction={this.back.bind(this)}
                titleStyle={styles.titleStyle}
                rightIcon={['heart','reply','share-alt']}
                />
                <View style={styles.container}>
                         <ScrollView>
                             <View style={styles.row}>
                                <Text style={styles.title}>{rowDate.title}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.text}>{rowDate.text}</Text>
                            </View>
                        </ScrollView>
                </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
container:{
  height:500
},
  title: {
    color: 'white',
    fontSize:22,

  },
  titleStyle:{
    fontSize:20,
    color:'white'
  },
  time: {
   fontSize:18,
   marginLeft:40,
     color:'white'
  },
 content:{
    marginTop:20,
    paddingLeft:20,
    paddingRight:20,
  },
  text: {
    fontSize:16,
    // overflow:'hidden',
    lineHeight:26,
    color:'black'
  },
  row:{
    backgroundColor:'#2196F3',
    height:100,
   justifyContent:'center',
    paddingLeft:20
  }

});
export default jokeDetail;