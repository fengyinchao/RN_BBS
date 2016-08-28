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
import PictureDetail from './pictureDetail';
import {
  picture,
} from '../../../actions/pictureAction';
let page = 1;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class Picture extends Component {

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
      dispatch(picture(page, isLoadMore, isRefreshing, isLoading));
    })
  }

  render() {
   const { Picture,rowDate } = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let pictureList = Picture.PictureList;
    // console.log('picturelist='+JSON.stringify(pictureList))
    let titleName = '最新';
    return (
      <View>
        {Picture.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(pictureList) }
            renderRow={this._renderRow}
            contentContainerStyle={styles.list}
            enableEmptySections={true}
            initialListSize= {13}
            onScroll={this._onScroll}
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
    const {Picture} = this.props;
    if (Picture.isLoadMore) {
      return <LoadMoreFooter />
    }
  }

  _onScroll() {
    if (!isLoadMore) isLoadMore = true;
  }

  // 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {dispatch, Picture} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(picture('', isLoadMore, isRefreshing, isLoading));
    }
  }

  // 上拉加载
  _onEndReach() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, Picture} = this.props;
      let pictureList = Picture.PictureList;
      isLoadMore = true;
      isLoading = false;
      offest = pictureList[pictureList.length - 1].seq
      dispatch(picture(page, isLoadMore, isRefreshing, isLoading));
    })
  }

  _renderRow(rowDate) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this._onPressFeedItem.bind(this,rowDate) }
          >
          <Text style={styles.text}>{rowDate.tag_name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

    _onPressFeedItem(rowDate) {
        InteractionManager.runAfterInteractions(() => {
              this.props.navigator.push({
                  name: 'PictureDetail',
                  component: PictureDetail,
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
    width: Const.window.width/3 ,
    height: Const.window.height/6 ,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:10,
    borderWidth:1,
    borderColor:'white',
    overflow:'hidden'
  },
  listView: {
    backgroundColor: 'lightblue',
    height: Const.window.height - 44 - 60 - 20,
    borderRadius:20
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
    borderRadius:20

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
    const { Picture } = state;
    return {
        Picture
    }
})(Picture);