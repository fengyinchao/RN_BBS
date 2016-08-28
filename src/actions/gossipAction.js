

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let gossip = (page,num, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://apis.baidu.com/txapi/huabian/newtop?page=';
    if (page) URL += page;
    URL+='&num=';
    if(num) URL+=num;
    console.log(URL)
    
    return dispatch => {
        dispatch(feachGossipList(isLoadMore, isRefreshing, isLoading));
        return Util.gets(URL, (response) => {
            // debugger;
            dispatch(receiveGossipList(response.newslist))
        }, (error) => {
            dispatch(receiveGossipList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

let feachGossipList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_GOSSIP_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveGossipList = (gossipList) => {
    return {
        type: types.RECEIVE_GOSSIP_LIST,
        gossipList: gossipList,
    }
}
