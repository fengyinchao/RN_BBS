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
  Platform
} from 'react-native';

import {connect} from 'react-redux'
import Const from '../../common/const';
import Loading from '../../common/Loading';
import LoadMoreFooter from '../../common/LoadMoreFooter';
import HeaderView from '../../common/HeaderView';
import NewsDetail from './newsDetail';
import {
  news,
} from '../../../actions/newsAction';
if (Platform.OS === 'android') {
  var RefreshLayoutConsts = require('UIManager').AndroidSwipeRefreshLayout.Constants;
} else {
  var RefreshLayoutConsts = {SIZE: {}};
}

let page = 1;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class News extends Component {

  constructor(props) {
    super(props); //这一句不能省略，照抄即可
    // debugger
    this._renderRow = this._renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
   
      const {news} = this.props;
      news(page, isLoadMore, isRefreshing, isLoading);
  }

  render() {
   const { News,rowDate } = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let newsList = News.NewsList;
    // console.log('newslist='+JSON.stringify(newsList))
    let titleName = '最新';
    return (
      <View>
        {News.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(newsList) }
            renderRow={this._renderRow}
            contentContainerStyle={styles.list}
            enableEmptySections={true}
            initialListSize= {10}
            onScroll={this._onScroll}
            onEndReached={this._onEndReach.bind(this) }
            onEndReachedThreshold={10}
            renderFooter={this._renderFooter.bind(this) }
            style={styles.listView}
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh.bind(this) }
                title="正在加载中……"
                refreshing={News.isRefreshing}
                colors={["#ff0000"]}
                size={RefreshLayoutConsts.SIZE.LARGE}
                />
            }
            />
        }
      </View>
    );
  }



  _renderFooter() {
    const {News} = this.props;
    if (News.isLoadMore) {
      return <LoadMoreFooter />
    }
  }

  _onScroll() {
    if (!isLoadMore) isLoadMore = true;
  }

  // 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {news, News} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      isLoading=false;
      news('', isLoadMore, isRefreshing, isLoading);
    }
  }

  // 上拉加载
  _onEndReach() {
    // alert('end')
      const {news, News} = this.props;
      let newsList = News.NewsList;
      isLoadMore = true;
      isLoading = false;
      news(++page, isLoadMore, isRefreshing, isLoading);
  }

  _renderRow(rowDate) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this._onPressFeedItem.bind(this,rowDate) }
          >
          <View style={styles.row}>
              <Text style={styles.title}>{rowDate.title.length>18?(rowDate.title.substring(0,18)+'...'):rowDate.title}</Text>
          </View>
          <Text style={styles.text}>{rowDate.abstract}</Text>
        </TouchableOpacity>
      </View>
    );
  }

    _onPressFeedItem(rowDate) {
          this.props.navigator.push({
              name: 'NewsDetial',
              component: NewsDetail,
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              params: {
                    rowDate: rowDate
              }
          })
    }
}

const styles = StyleSheet.create({
  container: {
    width: Const.window.width ,
    height: (Const.window.height-100)/4 ,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#FAFAFA',
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
    overflow:'hidden'
  },
  listView: {
    backgroundColor: '#F5FCFF',
    height: Const.window.height ,
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
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
  row:{
    flexDirection:'row',
    // borderBottomWidth:2,
    // borderBottomColor:'lightgray'
  },
  header: {
    marginTop: 20,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  }
});

export default connect((state) => {
    // alert('state='+JSON.stringify(state))
    // debugger;
    const { News } = state;
    return {
        News
    }
},{news:news})(News);