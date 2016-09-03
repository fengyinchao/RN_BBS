

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let joke = (page, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://apis.baidu.com/showapi_open_bus/showapi_joke/joke_text?number=10&page=';
    if (page) URL += page;
    
    console.log(URL)
    
    return dispatch => {
        dispatch(feachJokeList(isLoadMore, isRefreshing, isLoading));
        return Util.gets(URL, (response) => {
             console.log(response.showapi_res_body.contentlist)
             // let res=response.showapi_res_body.contentlist;
             // res.forEach(function(item){
             //    let text=item.text;
             //    // console.log(text)
             //    let reg=/<p>/g;
             //    text.replace(reg,'');
             //    item.text=text;
             //     // console.log(text)
             //    return item;
             // })
             // console.log(res)
            dispatch(receiveJokeList(response.showapi_res_body.contentlist))
        }, (error) => {
            dispatch(receiveJokeList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

let feachJokeList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_JOKE_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveJokeList = (jokeList) => {
    return {
        type: types.RECEIVE_JOKE_LIST,
        jokeList: jokeList,
    }
}
