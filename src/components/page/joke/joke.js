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
import JokeDetail from './jokeDetail';
import {
  joke,
} from '../../../actions/jokeAction';
let page = 1;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class Joke extends Component {

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
    InteractionManager.runAfterInteractions(() => {
      const {dispatch} = this.props;
      dispatch(joke(page, isLoadMore, isRefreshing, isLoading));
    })
  }

  render() {
   const { Joke,rowDate } = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let jokeList = Joke.JokeList;
    // console.log('jokelist='+JSON.stringify(jokeList))
    let titleName = '最新';
    return (
      <View>
        {Joke.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(jokeList) }
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
                color="#ccc"
                />
            }
            />
        }
      </View>
    );
  }



  _renderFooter() {
    const {Joke} = this.props;
    if (Joke.isLoadMore) {
      return <LoadMoreFooter />
    }
  }

  _onScroll() {
    if (!isLoadMore) isLoadMore = true;
  }

  // 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {dispatch, Joke} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(joke('', isLoadMore, isRefreshing, isLoading));
    }
  }

  // 上拉加载
  _onEndReach() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, Joke} = this.props;
      let jokeList = Joke.JokeList;
      isLoadMore = true;
      isLoading = false;
      offest = jokeList[jokeList.length - 1].seq
      dispatch(joke(page, isLoadMore, isRefreshing, isLoading));
    })
  }

  _renderRow(rowDate) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this._onPressFeedItem.bind(this,rowDate) }
          >
          <View style={styles.row}>
              <Text style={styles.title}>{rowDate.title.length>14?(rowDate.title.substring(0,14)+'...'):rowDate.title}</Text>
              <Text style={styles.time}>{rowDate.ct.substring(0,16)}</Text>
          </View>
          <Text style={styles.text}>{rowDate.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

    _onPressFeedItem(rowDate) {
    InteractionManager.runAfterInteractions(() => {
          this.props.navigator.push({
              name: 'JokeDetial',
              component: JokeDetail,
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              params: {
                    rowDate: rowDate
              }
          })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: Const.window.width ,
    height: Const.window.width/3 ,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#FAFAFA',
    borderBottomWidth:1,
    borderBottomColor:'gray',
    overflow:'hidden'
  },
  listView: {
    backgroundColor: '#F5FCFF',
    height: Const.window.height - 44 - 60 - 20,
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
    const { Joke } = state;
    return {
        Joke
    }
})(Joke);