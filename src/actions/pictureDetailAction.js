

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let picture = (tag, offest, limit, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
     if (limit) URL += limit;
    offest ? URL += '&max=' + offest : URL += '&max=';
    tag ? URL += '&tag=' + encode_utf8(tag) : URL += '&tag='
    return dispatch => {
        dispatch(feachPictureList(isLoadMore, isRefreshing, isLoading));
        return Util.get(URL, (response) => {
            dispatch(receivePictureList(response.pins))
        }, (error) => {
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
export let resetPictureList = () => {
    return {
        type: types.RESET_PICTUREDETAIL_LIST,
        pictureDetailList: [],
    }
}
