

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let picture = (tag, offest, limit, isLoadMore, isRefreshing, isLoading) => {
    // let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
    let URL='http://api.huaban.com/fm/wallpaper/tags';
    
    return dispatch => {
        dispatch(feachPictureList(isLoadMore, isRefreshing, isLoading));
        return Util.get(URL, (response) => {
            //  console.log(response)
             // debugger
            dispatch(receivePictureList(response))
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
        type: types.FETCH_PICTURE_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receivePictureList = (pictureList) => {
    return {
        type: types.RECEIVE_PICTURE_LIST,
        pictureList: pictureList,
    }
}
