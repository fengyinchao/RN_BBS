/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ListView,
  TouchableOpacity,
  View,
  InteractionManager,
  RefreshControl,
  Navigator,
} from 'react-native';

import {connect} from 'react-redux'
import Const from '../../common/const';
import Loading from '../../common/Loading';
import LoadMoreFooter from '../../common/LoadMoreFooter';
import HeaderView from '../../common/HeaderView';
// import WeatherDetail from './weatherDetail';
import {
  weather,
} from '../../../actions/weatherAction';
let city = '武汉';
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class Weather extends Component {

  constructor(props) {
    super(props); //这一句不能省略，照抄即可
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch} = this.props;
      dispatch(weather(city, isLoadMore, isRefreshing, isLoading));
    })
  }

  render() {
   const { Weather} = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let rowDate = Weather.WeatherList[0];
    // console.log('weatherlist='+JSON.stringify(weatherList))
    return (
      <View>
        {Weather.isLoading ? <Loading /> :
         <View style={styles.container}>
              <View style={styles.head}>
                  <Text style={styles.title}>当前城市：{rowDate.basic.city}</Text>
                  <Text style={styles.time}>更新于：{rowDate.basic.update.loc}</Text>
              </View>
              <View style={styles.secondcontainer}>
                  <View style={[styles.common,styles.body]}>
                        <Text style={styles.title}>天气：{rowDate.now.cond.txt}</Text>
                        <Text style={styles.title}>温度：{rowDate.now.tmp}</Text>
                        <Text style={styles.title}>风向：{rowDate.now.wind.dir}</Text>
                         <Text style={styles.title}>风速：{rowDate.now.wind.sc}</Text>
                  </View>
                  <View style={[styles.common,styles.daily]}>
                        <View>
                                <Text>实时天气</Text>
                                <Text style={styles.title}>天气：{rowDate.now.cond.txt}</Text>
                                <Text style={styles.title}>温度：{rowDate.now.tmp}</Text>
                                <Text style={styles.title}>风向：{rowDate.now.wind.dir}</Text>
                                <Text style={styles.title}>风速：{rowDate.now.wind.sc}</Text>
                        </View>
                  </View>
                  <View style={[styles.common,styles.weekly]}>
                        <View>
                                <Text>本周天气</Text>
                                <Text style={styles.title}>天气：{rowDate.now.cond.txt}</Text>
                                <Text style={styles.title}>温度：{rowDate.now.tmp}</Text>
                                <Text style={styles.title}>风向：{rowDate.now.wind.dir}</Text>
                                <Text style={styles.title}>风速：{rowDate.now.wind.sc}</Text>
                        </View>
                  </View>
              </View>
              
          </View>
        }
      </View>
    );
  }
  // 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {dispatch, Weather} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(weather('', isLoadMore, isRefreshing, isLoading));
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:Const.window.height,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    flex:1,
  },
  secondcontainer:{
    flex:1,
  },
  head:{
    flexDirection:'row',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:2,
    borderBottomColor:'lightgray'
  },
  common:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#E9DFEA'
  },
  body:{
    // backgroundColor:'blue'
  },
  daily:{
    // backgroundColor:'lightblue'
  },
  weekly:{
    // backgroundColor:'darkblue'
  },
  othercity:{
    backgroundColor:'red',
    height:140,
     alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize:16,
  },
  time: {
   fontSize:14,
   marginLeft:40
  },
  text: {
    marginTop:20,
    fontSize:14,
    height:40,
    overflow:'hidden'
  },
});

export default connect((state) => {
    const { Weather } = state;
    return {
        Weather
    }
})(Weather);