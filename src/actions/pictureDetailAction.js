

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let picture = (tag, offest, limit, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
    // let URL='http://api.huaban.com/fm/wallpaper/tags';
     if (limit) URL += limit;
    offest ? URL += '&max=' + offest : URL += '&max=';
    tag ? URL += '&tag=' + encode_utf8(tag) : URL += '&tag='
    // alert(URL)
    return dispatch => {
        dispatch(feachPictureList(isLoadMore, isRefreshing, isLoading));
        return Util.get(URL, (response) => {
             // alert(JSON.stringify(response.pins))
             // debugger
            dispatch(receivePictureList(response.pins))
        }, (error) => {
            // console.log('加载首页数据error==>' + error);
            // // debugger
            dispatch(receivePictureList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

let feachPictureList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_PICTUREDETAIL_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receivePictureList = (pictureDetailList) => {
    return {
        type: types.RECEIVE_PICTUREDETAIL_LIST,
        pictureDetailList: pictureDetailList,
    }
}
