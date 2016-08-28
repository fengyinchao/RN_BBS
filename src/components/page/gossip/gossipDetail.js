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
  WebView
} from 'react-native';
import Const from '../../common/const';

import HeaderView from '../../common/HeaderView';
import {
  gossip,
} from '../../../actions/gossipAction';

class gossipDetail extends Component{
  back(){
    this.props.navigator.pop();
  }
  render(){
    let name='八卦详情'
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
                      <WebView style={styles.webview_style} 
                        url={rowDate.url}
                        startInLoadingState={true}
                        domStorageEnabled={true}
                        javaScriptEnabled={true}
                        />
              </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
container:{
  // marginTop:40,
  // paddingLeft:20,
  // paddingRight:20,
  height:Const.window.height,
  width:Const.window.width,
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
  },
  webview_style:{  
       // backgroundColor:'#00ff00',   
    }

});
export default gossipDetail;