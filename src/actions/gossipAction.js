

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let gossip = (page,isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://api.tianapi.com/huabian/?key=ad97b50c8552dbbacead1c7c4663058d&num=10&page=';
    if (page) URL += page;
    URL+='&num=';
    // if(num) URL+=num;
    // console.log(URL)
    
    return dispatch => {
        dispatch(feachGossipList(isLoadMore, isRefreshing, isLoading));
        return Util.gets(URL, (response) => {
            // debugger;
            console.log(response.newslist)
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
