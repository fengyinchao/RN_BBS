

import * as types from './actionTypes';
import Util from '../components/common/utils';

export let news = (page, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://apis.baidu.com/songshuxiansheng/news/news?page=';
    if (page) URL += page;
    
    console.log(URL)
    
    return dispatch => {
        dispatch(feachNewsList(isLoadMore, isRefreshing, isLoading));
        return Util.gets(URL, (response) => {
             // console.log(response.showapi_res_body.contentlist)
             // let res=response.retData;
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
            dispatch(receiveNewsList(response.retData))
        }, (error) => {
            dispatch(receiveNewsList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

let feachNewsList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_NEWS_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveNewsList = (newsList) => {
    return {
        type: types.RECEIVE_NEWS_LIST,
        newsList: newsList,
    }
}
