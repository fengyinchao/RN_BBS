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
  picture,resetPictureList
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
  
      const {picture,rowDate} = this.props;
      picture(rowDate.tag_name,isLoadMore, isRefreshing, isLoading);
  }
   
  render() {
   const { PictureDetail ,rowDate} = this.props;
    // console.log(('this.props'+JSON.stringify(this.props)));
    // debugger
    let pictureDetailList = PictureDetail.PictureDetailList;
   // alert('picturelist='+JSON.stringify(pictureDetailList))
    let titleName = rowDate.tag_name;
    return (
      <View>
        <HeaderView title={titleName}
        leftIcon={'arrow-left'}
        leftIconAction={this.back.bind(this) }
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
      const {picture, PictureDetail} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      picture('', isLoadMore, isRefreshing, isLoading);
    }
  }
  back(){
    const {resetPictureList}=this.props;
    resetPictureList();
    this.props.navigator.pop();
  }
  // 上拉加载
  _onEndReach() {
    
      const {picture, PictureDetail} = this.props;
      let pictureDetailList = PictureDetail.PictureDetailList;
      isLoadMore = true;
      isLoading = false;
      isLoading=false;
      picture(tag, isLoadMore, isRefreshing, isLoading);
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
    width: Const.window.width / 2,
    height: (Const.window.height -100)/ 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listView: {
    // backgroundColor: '#F5FCFF',
    height: Const.window.height ,
  },
  thumbnail: {
    width: Const.window.width/2-10 ,
    height: (Const.window.height-100)/2-10,

  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
});

export default connect((state) => {
    // alert('state='+JSON.stringify(state))
    // debugger;
    const { PictureDetail } = state;
    return {
        PictureDetail
    }
},{picture:picture,resetPictureList:resetPictureList})(PictureDetail);