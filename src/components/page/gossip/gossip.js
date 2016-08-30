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
import GossipDetail from './gossipDetail';
import {
  gossip,
} from '../../../actions/gossipAction';
let page = 1;
let num=5;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class Gossip extends Component {

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
      dispatch(gossip(page, num, isLoadMore, isRefreshing, isLoading));
    })
  }

  



  _renderFooter() {
    const {Gossip} = this.props;
    if (Gossip.isLoadMore) {
      return <LoadMoreFooter />
    }
  }

  _onScroll() {
    
    if (!isLoadMore) isLoadMore = true;
  }

  // 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {dispatch, Gossip} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(gossip('', isLoadMore, isRefreshing, isLoading));
    }
  }

  // 上拉加载
  _onEndReach() {
    // alert('onendreach')
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, Gossip} = this.props;
      let gossipList = Gossip.GossipList;
      isLoadMore = true;
      isLoading = false;
      // offest = gossipList[gossipList.length - 1].seq
      dispatch(gossip(page, isLoadMore, isRefreshing, isLoading));
    })
  }

render() {
   const { Gossip,rowDate } = this.props;
    let gossipList = Gossip.GossipList;

    return (
      <View>
        {Gossip.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(gossipList) }
            renderRow={this._renderRow}
            enableEmptySections={true}
            initialListSize= {5}
            onScroll={this._onScroll}
            onEndReached={this._onEndReach.bind(this) }
            onEndReachedThreshold={(Const.window.height-105)/4}
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
  _renderRow(rowDate) {
    return ( 
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.container}
          onPress={this._onPressFeedItem.bind(this,rowDate) }
          >
          <View style={styles.left}>
              <Image source={{uri:rowDate.picUrl}} resizeMode={'cover'} style={{height:100,width:100,}}/> 
          </View>
           <View style={styles.right}>
              <Text style={styles.title}>{rowDate.title}</Text>
              <Text style={styles.ctime}>{rowDate.ctime.substring(0,16)}</Text>
          </View>
        </TouchableOpacity>
    );
  }

    _onPressFeedItem(rowDate) {
        // console.log(this.props.navigator)
          InteractionManager.runAfterInteractions(() => {
              this.props.navigator.push({
                  name: 'GossipDetial',
                  component: GossipDetail,
                  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                  params: {
                        rowDate: rowDate
                  }
              })
        });
      }
}

const styles = StyleSheet.create({
  listView: {
    height:Const.window.height-120,
  },
  container: {
    width: Const.window.width ,
    height: (Const.window.height-120)/4 ,
    alignItems: 'center',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#FAFAFA',
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
    overflow:'hidden',
     flexDirection:'row',
  },
  left:{
    flex:1,
  },
  right:{
    marginLeft:20,
    flex:2,
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
    const { Gossip } = state;
    return {
        Gossip
    }
})(Gossip);