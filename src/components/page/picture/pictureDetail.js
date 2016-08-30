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
// import PictureDetail from './pictureDetail';
import {
  picture,
} from '../../../actions/pictureDetailAction';
let tag = 1;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
class PictureDetail extends Component {

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
      const {dispatch,rowDate} = this.props;
      dispatch(picture(rowDate.tag_name,isLoadMore, isRefreshing, isLoading));
    })
  }
   
  render() {
   const { PictureDetail } = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let pictureDetailList = PictureDetail.PictureDetailList;
   // alert('picturelist='+JSON.stringify(pictureDetailList))
    let titleName = '最新';
    return (
      <View>
        <HeaderView title={titleName}
        leftIcon={'arrow-left'}
        leftIconAction={() => this.props.navigator.pop() }
        rightIcon={['heart','reply','share-alt']}
        />
        {PictureDetail.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(pictureDetailList) }
            renderRow={this._renderRow.bind(this)}
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
    const {PictureDetail} = this.props;
    if (PictureDetail.isLoadMore) {
      return <LoadMoreFooter />
    }
  }

  _onScroll() {
    if (!isLoadMore) isLoadMore = true;
  }

  // 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {dispatch, PictureDetail} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(picture('', isLoadMore, isRefreshing, isLoading));
    }
  }
  back(){
    this.props.navigator.pop();
  }
  // 上拉加载
  _onEndReach() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, PictureDetail} = this.props;
      let pictureDetailList = PictureDetail.PictureDetailList;
      isLoadMore = true;
      isLoading = false;
      offest = pictureDetailList[pictureDetailList.length - 1].seq
      dispatch(picture(tag, isLoadMore, isRefreshing, isLoading));
    })
  }

  _renderRow(rowDate) {
    // alert(rowDate.file.key)
    return (
        <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  >
                  <Image
                    source={{ uri: 'http://img.hb.aicdn.com/' + rowDate.file.key + '_fw236' }}
                    style={styles.thumbnail}
                    />
                </TouchableOpacity>
          </View>
        );
  }


}

const styles = StyleSheet.create({
container: {
    width: Const.window.width / 3,
    height: Const.window.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  listView: {
    backgroundColor: '#F5FCFF',
    height: Const.window.height - 44 - 20,
  },
  thumbnail: {
    width: Const.window.width ,
    height: Const.window.width ,

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
  },
  title: {
    color: 'black',
  },
});

export default connect((state) => {
    // alert('state='+JSON.stringify(state))
    // debugger;
    const { PictureDetail } = state;
    return {
        PictureDetail
    }
})(PictureDetail);